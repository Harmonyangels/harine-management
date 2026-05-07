// Server-only route — never import this file from client components.
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { QUESTIONS, getScoreBand, isHotLead, isPELead } from "@/app/score/scoring";

interface Lead {
  name: string;
  practice: string;
  email: string;
  phone: string;
}

interface RequestBody {
  lead: Lead;
  qualifiers: Record<string, string>;
  answers: Record<string, number>;
  score: number;
}

function getAnswerLabel(qid: string, points: number): string {
  const q = QUESTIONS.find((q) => q.id === qid);
  if (!q) return String(points);
  return q.options.find((o) => o.points === points)?.label ?? String(points);
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { lead, qualifiers, answers, score } = body;

    const band = getScoreBand(score);
    const hotLead = isHotLead(qualifiers, score);
    const peLead = isPELead(answers);

    // ── Step 1: Anthropic report ─────────────────────────────────────────────

    const answerList = QUESTIONS.map((q) => {
      const pts = answers[q.id] ?? 0;
      return `[${q.category}] ${q.question}\n  → ${getAnswerLabel(q.id, pts)} (${pts} pts)`;
    }).join("\n\n");

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const aiResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `You are a healthcare analytics consultant writing a personalized practice health report.

Practice: ${lead.practice}
EHR System: ${qualifiers.ehr}
Providers: ${qualifiers.providers}
Locations: ${qualifiers.locations}
Overall Score: ${score}/100 (${band.label})

Assessment answers:
${answerList}

Write a practice health report as a clean HTML fragment using these exact inline styles:
- All <p> text: style="color:#c8dde8;margin:0 0 16px;line-height:1.7;"
- All <h3> headings: style="color:#e8edf2;margin:24px 0 10px;font-size:17px;"
- Bold action titles inside recommendations: style="color:#23c6a0;"

Include exactly these sections in order:
1. A <p> with a 2-sentence overall assessment of this practice's financial and operational health based on their score and answers.
2. A <h3> labeled "Priority Recommendations" followed by exactly 3 <p> tags, each starting with a <strong style="color:#23c6a0;"> bold action title </strong> followed by the recommendation. Base each on the 3 weakest-scoring answers.
${peLead ? `3. A <h3> labeled "Transaction Readiness" followed by a <p> assessing their readiness for a PE partnership, sale, or hospital affiliation given their current metrics.` : ""}

Do not include a score summary or page title — those are rendered separately. Do not use <ul>, <li>, or markdown. Output only the HTML fragment with no code fences.`,
        },
      ],
    });

    const reportHtml =
      aiResponse.content[0].type === "text" ? aiResponse.content[0].text : "";

    // ── Step 2: Internal notification email ──────────────────────────────────

    const resend = new Resend(process.env.RESEND_API_KEY);

    const flags = [hotLead && "🔥 HOT LEAD", peLead && "💼 PE INTEREST"]
      .filter(Boolean)
      .join(" ");

    const notifSubject = flags
      ? `${flags} — New Lead: ${lead.practice} — ${score}/100`
      : `New Lead: ${lead.practice} — ${score}/100`;

    const answerRows = QUESTIONS.map((q) => {
      const pts = answers[q.id] ?? 0;
      const label = getAnswerLabel(q.id, pts);
      return `<tr>
        <td style="padding:8px 12px;color:#8aa8bb;font-size:13px;border-bottom:1px solid #1e3040;white-space:nowrap;">${q.category}</td>
        <td style="padding:8px 12px;color:#c8dde8;font-size:13px;border-bottom:1px solid #1e3040;">${q.question}</td>
        <td style="padding:8px 12px;color:#e8edf2;font-size:13px;border-bottom:1px solid #1e3040;font-weight:600;white-space:nowrap;">${label}</td>
      </tr>`;
    }).join("");

    const notifHtml = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0b1520;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:700px;margin:0 auto;padding:36px 24px;">

    <h2 style="color:#e8edf2;margin:0 0 4px;font-size:22px;">${flags ? flags + "<br>" : ""}New Practice Health Score Submission</h2>
    <p style="color:#8aa8bb;margin:0 0 32px;font-size:13px;">${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short", timeZone: "America/Chicago" })} CT</p>

    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:20px;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:15px;text-transform:uppercase;letter-spacing:1px;">Contact Details</h3>
      <table style="border-collapse:collapse;">
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 16px 5px 0;width:110px;">Name</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${lead.name}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 16px 5px 0;">Practice</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${lead.practice}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 16px 5px 0;">Email</td><td style="padding:5px 0;"><a href="mailto:${lead.email}" style="color:#23c6a0;font-size:14px;">${lead.email}</a></td></tr>
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 16px 5px 0;">Phone</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;">${lead.phone}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 16px 5px 0;">EHR</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;">${qualifiers.ehr === "Athena Health" ? "⭐ " : ""}${qualifiers.ehr}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 16px 5px 0;">Providers</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;">${qualifiers.providers}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 16px 5px 0;">Locations</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;">${qualifiers.locations}</td></tr>
      </table>
    </div>

    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:20px;text-align:center;">
      <p style="color:#8aa8bb;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Practice Health Score</p>
      <p style="font-size:72px;font-weight:800;color:${band.color};margin:0;line-height:1;">${score}</p>
      <p style="color:${band.color};font-size:17px;font-weight:700;margin:6px 0 0;">${band.label}</p>
    </div>

    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:28px;overflow-x:auto;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:15px;text-transform:uppercase;letter-spacing:1px;">Full Assessment Answers</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px 12px;color:#8aa8bb;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1e3040;">Category</th>
            <th style="text-align:left;padding:8px 12px;color:#8aa8bb;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1e3040;">Question</th>
            <th style="text-align:left;padding:8px 12px;color:#8aa8bb;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1e3040;">Answer</th>
          </tr>
        </thead>
        <tbody>${answerRows}</tbody>
      </table>
    </div>

    <div style="text-align:center;">
      <a href="https://calendly.com/dev-harinemanagement/30min" style="display:inline-block;background:#23c6a0;color:#0b1520;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">Book Follow-Up Call</a>
    </div>

  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "dev@harinemanagement.com",
      to: "dev@harinemanagement.com",
      subject: notifSubject,
      html: notifHtml,
    });

    // ── Step 3: Lead report email ────────────────────────────────────────────

    const leadHtml = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0b1520;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:620px;margin:0 auto;padding:48px 24px;">

    <p style="color:#8aa8bb;margin:0 0 36px;font-size:15px;">Hi ${lead.name},<br><br>Thank you for completing the Practice Health Assessment. Here's your personalized report.</p>

    <div style="text-align:center;margin-bottom:44px;">
      <p style="color:#8aa8bb;margin:0 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Your Practice Health Score</p>
      <p style="font-size:104px;font-weight:800;color:${band.color};margin:0;line-height:1;">${score}</p>
      <div style="display:inline-block;background:${band.color}28;border:1.5px solid ${band.color};border-radius:6px;padding:6px 20px;margin-top:14px;">
        <span style="color:${band.color};font-weight:700;font-size:16px;letter-spacing:0.5px;">${band.label}</span>
      </div>
    </div>

    <div style="background:#0f1f2e;border-radius:12px;padding:28px 32px;margin-bottom:36px;">
      ${reportHtml}
    </div>

    <div style="text-align:center;margin-bottom:44px;">
      <a href="https://calendly.com/dev-harinemanagement/30min" style="display:inline-block;background:linear-gradient(135deg,#23c6a0 0%,#1a9e80 100%);color:#ffffff;font-weight:700;font-size:16px;padding:18px 40px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">Book a Free 30-Min Call</a>
      <p style="color:#8aa8bb;font-size:13px;margin:14px 0 0;line-height:1.6;">No commitment — we'll walk through your results together<br>and identify your highest-impact opportunities.</p>
    </div>

    <hr style="border:none;border-top:1px solid #1e3040;margin:0 0 24px;">
    <p style="color:#4a6878;font-size:12px;text-align:center;margin:0;line-height:1.8;">
      Devanshu Patel · Harine Management<br>
      <a href="https://harinemanagement.com" style="color:#4a6878;text-decoration:none;">harinemanagement.com</a>
    </p>

  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "Devanshu Patel <dev@harinemanagement.com>",
      to: lead.email,
      subject: `Your Practice Health Score — ${band.label}`,
      html: leadHtml,
    });

    return NextResponse.json({ reportHtml });
  } catch (error) {
    console.error("[generate-report]", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
