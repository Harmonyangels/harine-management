import { NextResponse } from "next/server";
import { Resend } from "resend";

type Status = "green" | "yellow" | "red";

interface MetricResult {
  id: string;
  label: string;
  benchmark: string;
  source: string;
  unit?: string;
  value: string;
  status: Status;
}

interface Payload {
  lead: { name: string; practice: string; email: string };
  inputs: Record<string, string>;
  results: MetricResult[];
  overallScore: number;
  greenCount: number;
  totalEntered: number;
}

const STATUS_LABEL: Record<Status, string> = {
  green: "On Benchmark",
  yellow: "Close to Benchmark",
  red: "Below Benchmark",
};

const STATUS_COLOR: Record<Status, string> = {
  green: "#4EAD7A",
  yellow: "#D4973A",
  red: "#E07A5F",
};

const STATUS_BG: Record<Status, string> = {
  green: "rgba(45,122,79,0.2)",
  yellow: "rgba(184,120,32,0.2)",
  red: "rgba(184,48,48,0.2)",
};

function fmtValue(value: string, unit?: string): string {
  if (!unit) return value;
  if (unit === "%") return `${value}%`;
  if (unit === "days") return `${value} days`;
  return value;
}

function metricRow(r: MetricResult): string {
  const color = STATUS_COLOR[r.status];
  const bg = STATUS_BG[r.status];
  const label = STATUS_LABEL[r.status];
  return `
    <tr style="border-bottom:1px solid #1e3040;">
      <td style="padding:10px 12px 10px 0;">
        <div style="color:#c8dde8;font-size:13px;font-weight:600;margin:0 0 2px;">${r.label}</div>
        <div style="color:#8aa8bb;font-size:11px;">Benchmark: ${r.benchmark} &middot; ${r.source}</div>
      </td>
      <td style="text-align:center;padding:10px 8px;white-space:nowrap;">
        <div style="color:#e8edf2;font-size:15px;font-weight:700;">${fmtValue(r.value, r.unit)}</div>
      </td>
      <td style="text-align:center;padding:10px 0 10px 8px;white-space:nowrap;">
        <span style="background:${bg};color:${color};border-radius:4px;padding:3px 8px;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${label}</span>
      </td>
    </tr>`;
}

export async function POST(request: Request) {
  try {
    const body: Payload = await request.json();
    const { lead, results, overallScore, greenCount, totalEntered } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Chicago",
    });

    const scoreLabel =
      overallScore >= 80
        ? "Strong Performance"
        : overallScore >= 50
        ? "Improvement Opportunity"
        : "Significant Leakage Risk";

    const scoreColor =
      overallScore >= 80
        ? "#4EAD7A"
        : overallScore >= 50
        ? "#D4973A"
        : "#E07A5F";

    const summaryMsg =
      totalEntered === 0
        ? "No metrics were entered."
        : overallScore >= 80
        ? "Your billing performance is strong. Let's make sure it stays that way."
        : overallScore >= 50
        ? "You have clear opportunities to recover revenue. A Diagnostic will show you exactly where."
        : "Significant revenue recovery potential exists in your practice. An RCM Fix engagement typically recovers this within 60–90 days.";

    // ── 1. Internal notification ───────────────────────────────────────────────

    const notifSubject = `New RCM Scorecard Lead — ${lead.practice} — ${greenCount}/${totalEntered} metrics meeting benchmark`;

    const metricsRows =
      results.length > 0
        ? results.map(metricRow).join("")
        : `<tr><td colspan="3" style="padding:16px 0;color:#8aa8bb;font-size:13px;">No metrics entered</td></tr>`;

    const notifHtml = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0b1520;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:680px;margin:0 auto;padding:36px 24px;">

    <h2 style="color:#e8edf2;margin:0 0 4px;font-size:22px;">New RCM Scorecard Lead</h2>
    <p style="color:#8aa8bb;margin:0 0 32px;font-size:13px;">${timestamp} CT</p>

    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:20px;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Contact</h3>
      <table style="border-collapse:collapse;">
        <tr><td style="color:#8aa8bb;font-size:13px;padding:5px 20px 5px 0;width:120px;">Name</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${lead.name}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:13px;padding:5px 20px 5px 0;">Practice</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${lead.practice}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:13px;padding:5px 20px 5px 0;">Email</td><td style="padding:5px 0;"><a href="mailto:${lead.email}" style="color:#23c6a0;font-size:14px;">${lead.email}</a></td></tr>
      </table>
    </div>

    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:20px;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Overall Score</h3>
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
        <div style="font-size:48px;font-weight:800;color:${scoreColor};line-height:1;">${totalEntered > 0 ? `${overallScore}%` : "—"}</div>
        <div>
          <div style="color:#e8edf2;font-size:14px;font-weight:600;">${scoreLabel}</div>
          <div style="color:#8aa8bb;font-size:12px;margin-top:4px;">${totalEntered > 0 ? `${greenCount} of ${totalEntered} metrics meeting benchmark` : "No metrics entered"}</div>
        </div>
      </div>
    </div>

    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:28px;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Metric Breakdown</h3>
      <table style="border-collapse:collapse;width:100%;">
        <thead>
          <tr>
            <th style="text-align:left;color:#8aa8bb;font-size:11px;padding:0 12px 10px 0;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1e3040;">Metric</th>
            <th style="text-align:center;color:#8aa8bb;font-size:11px;padding:0 8px 10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1e3040;">Value</th>
            <th style="text-align:center;color:#8aa8bb;font-size:11px;padding:0 0 10px 8px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1e3040;">Status</th>
          </tr>
        </thead>
        <tbody>${metricsRows}</tbody>
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

    // ── 2. Results email to lead ───────────────────────────────────────────────

    const leadMetricsRows =
      results.length > 0
        ? results.map(metricRow).join("")
        : `<tr><td colspan="3" style="padding:20px 0;color:#8aa8bb;font-size:14px;text-align:center;">No metrics were entered — book a call to discuss your RCM performance.</td></tr>`;

    const leadHtml = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0b1520;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:620px;margin:0 auto;padding:48px 24px;">

    <p style="color:#8aa8bb;margin:0 0 6px;font-size:15px;">Hi ${lead.name},</p>
    <p style="color:#8aa8bb;margin:0 0 40px;font-size:15px;line-height:1.7;">
      Thank you for completing the Harine Management RCM Benchmarking Scorecard.
      Here&rsquo;s your personalized results for <strong style="color:#c8dde8;">${lead.practice}</strong>.
    </p>

    <!-- Score -->
    <div style="text-align:center;background:#0f1f2e;border-radius:12px;padding:32px 24px;margin-bottom:20px;border:1px solid #1e3040;">
      <p style="color:#8aa8bb;margin:0 0 10px;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Your RCM Score</p>
      ${
        totalEntered > 0
          ? `<p style="font-size:72px;font-weight:800;color:${scoreColor};margin:0;line-height:1;">${overallScore}%</p>
             <p style="color:#8aa8bb;font-size:13px;margin:10px 0 0;">${greenCount} of ${totalEntered} metrics meeting benchmark &middot; ${scoreLabel}</p>`
          : `<p style="color:#8aa8bb;font-size:16px;margin:0;">No metrics were entered. Book a call to walk through your RCM performance.</p>`
      }
    </div>

    <!-- Summary message -->
    ${
      totalEntered > 0
        ? `<div style="background:#0f1f2e;border-radius:10px;padding:20px 24px;margin-bottom:20px;border-left:3px solid ${scoreColor};">
             <p style="color:#c8dde8;font-size:15px;margin:0;line-height:1.6;">${summaryMsg}</p>
           </div>`
        : ""
    }

    <!-- Metric scorecard -->
    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:20px;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Your RCM Metrics vs. Benchmarks</h3>
      <table style="border-collapse:collapse;width:100%;">
        <thead>
          <tr>
            <th style="text-align:left;color:#8aa8bb;font-size:11px;padding:0 12px 10px 0;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1e3040;">Metric</th>
            <th style="text-align:center;color:#8aa8bb;font-size:11px;padding:0 8px 10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1e3040;">Your Value</th>
            <th style="text-align:center;color:#8aa8bb;font-size:11px;padding:0 0 10px 8px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1e3040;">Status</th>
          </tr>
        </thead>
        <tbody>${leadMetricsRows}</tbody>
      </table>
    </div>

    <!-- Benchmark sources -->
    <div style="background:#0f1f2e;border-radius:10px;padding:20px 24px;margin-bottom:32px;">
      <h3 style="color:#e8edf2;margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Benchmark Sources</h3>
      <table style="border-collapse:collapse;width:100%;">
        <tr><td style="color:#8aa8bb;font-size:12px;padding:4px 16px 4px 0;vertical-align:top;white-space:nowrap;">Net Collection Rate (95%+)</td><td style="color:#6a8898;font-size:12px;padding:4px 0;">MGMA 2023 Physician Compensation &amp; Production Report</td></tr>
        <tr><td style="color:#8aa8bb;font-size:12px;padding:4px 16px 4px 0;vertical-align:top;white-space:nowrap;">Denial Rate (&lt;5%)</td><td style="color:#6a8898;font-size:12px;padding:4px 0;">AAPC Medical Billing Industry Standards</td></tr>
        <tr><td style="color:#8aa8bb;font-size:12px;padding:4px 16px 4px 0;vertical-align:top;white-space:nowrap;">Days in A/R (&lt;30)</td><td style="color:#6a8898;font-size:12px;padding:4px 0;">MGMA 2023 Physician Compensation &amp; Production Report</td></tr>
        <tr><td style="color:#8aa8bb;font-size:12px;padding:4px 16px 4px 0;vertical-align:top;white-space:nowrap;">Clean Claim Rate (95%+)</td><td style="color:#6a8898;font-size:12px;padding:4px 0;">HFMA Revenue Cycle Benchmarking Survey</td></tr>
        <tr><td style="color:#8aa8bb;font-size:12px;padding:4px 16px 4px 0;vertical-align:top;white-space:nowrap;">First-Pass Resolution (90%+)</td><td style="color:#6a8898;font-size:12px;padding:4px 0;">HFMA Revenue Cycle Benchmarking Survey</td></tr>
        <tr><td style="color:#8aa8bb;font-size:12px;padding:4px 16px 4px 0;vertical-align:top;white-space:nowrap;">Appeal Rate (75%+)</td><td style="color:#6a8898;font-size:12px;padding:4px 0;">AAPC Denial Management Standards</td></tr>
        <tr><td style="color:#8aa8bb;font-size:12px;padding:4px 16px 4px 0;vertical-align:top;white-space:nowrap;">Overhead Ratio (&lt;55%)</td><td style="color:#6a8898;font-size:12px;padding:4px 0;">MGMA 2023 Physician Compensation &amp; Production Report</td></tr>
        <tr><td style="color:#8aa8bb;font-size:12px;padding:4px 16px 4px 0;vertical-align:top;white-space:nowrap;">Payer Contract Review</td><td style="color:#6a8898;font-size:12px;padding:4px 0;">Healthcare Financial Management industry best practice</td></tr>
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:44px;">
      <p style="color:#c8dde8;font-size:16px;font-weight:600;margin:0 0 10px;">Ready to improve your RCM performance?</p>
      <p style="color:#8aa8bb;font-size:14px;margin:0 0 24px;line-height:1.7;">
        A free 30-minute Practice Operational Diagnostic will walk through your complete billing picture
        and identify your highest-impact recovery opportunities — no commitment required.
      </p>
      <a href="https://calendly.com/dev-harinemanagement/30min"
         style="display:inline-block;background:#B83030;color:#ffffff;font-weight:700;font-size:16px;padding:18px 40px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">
        Book a Free Discovery Call &rarr;
      </a>
    </div>

    <hr style="border:none;border-top:1px solid #1e3040;margin:0 0 24px;" />
    <p style="color:#4a6878;font-size:12px;text-align:center;margin:0;line-height:1.8;">
      Devanshu Patel &middot; Harine Management<br />
      <a href="https://harinemanagement.com" style="color:#4a6878;text-decoration:none;">harinemanagement.com</a>
      &nbsp;&middot;&nbsp;
      <a href="mailto:dev@harinemanagement.com" style="color:#4a6878;text-decoration:none;">dev@harinemanagement.com</a>
    </p>

  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "Devanshu Patel <dev@harinemanagement.com>",
      to: lead.email,
      subject: `Your RCM Benchmarking Scorecard — ${lead.practice}`,
      html: leadHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[rcm-scorecard]", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
