// Server-only route — never import this file from client components.
import { NextResponse } from "next/server";
import { Resend } from "resend";

interface LeadPayload {
  lead: { name: string; practice: string; email: string };
  inputs: {
    monthlyGrossCharges: string;
    netCollectionRate: string;
    denialRate: string;
    daysInAR: string;
  };
  results: {
    benchmarkCollectionLoss: number;
    denialRevenueAtRisk: number;
    arStatus: "green" | "yellow" | "red";
    totalMonthlyLeakage: number;
    annualLeakage: number;
  };
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

const AR_LABEL: Record<string, string> = {
  green: "On Benchmark (≤ 30 days)",
  yellow: "Monitor Closely (31–45 days)",
  red: "Needs Attention (> 45 days)",
};

const AR_COLOR: Record<string, string> = {
  green: "#4EAD7A",
  yellow: "#D4973A",
  red: "#E07A5F",
};

export async function POST(request: Request) {
  try {
    const body: LeadPayload = await request.json();
    const { lead, inputs, results } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const annualFmt = fmt(results.annualLeakage);
    const arLabel = AR_LABEL[results.arStatus] ?? results.arStatus;
    const arColor = AR_COLOR[results.arStatus] ?? "#8aa8bb";
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Chicago",
    });

    // ── 1. Internal notification to dev@harinemanagement.com ─────────────────

    const notifSubject = `New Revenue Leakage Calculator Lead — ${lead.practice} — Est. ${annualFmt}/yr`;

    const notifHtml = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0b1520;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:680px;margin:0 auto;padding:36px 24px;">

    <h2 style="color:#e8edf2;margin:0 0 4px;font-size:22px;">New Revenue Leakage Calculator Lead</h2>
    <p style="color:#8aa8bb;margin:0 0 32px;font-size:13px;">${timestamp} CT</p>

    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:20px;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Contact</h3>
      <table style="border-collapse:collapse;">
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 20px 5px 0;width:120px;">Name</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${lead.name}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 20px 5px 0;">Practice</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${lead.practice}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:14px;padding:5px 20px 5px 0;">Email</td><td style="padding:5px 0;"><a href="mailto:${lead.email}" style="color:#23c6a0;font-size:14px;">${lead.email}</a></td></tr>
      </table>
    </div>

    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:20px;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Inputs</h3>
      <table style="border-collapse:collapse;">
        <tr><td style="color:#8aa8bb;font-size:13px;padding:5px 20px 5px 0;">Monthly Gross Charges</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${fmt(parseFloat(inputs.monthlyGrossCharges) || 0)}</td></tr>
        <tr><td style="color:#8aa8bb;font-size:13px;padding:5px 20px 5px 0;">Net Collection Rate</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${inputs.netCollectionRate}%</td></tr>
        <tr><td style="color:#8aa8bb;font-size:13px;padding:5px 20px 5px 0;">Denial Rate</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${inputs.denialRate}%</td></tr>
        <tr><td style="color:#8aa8bb;font-size:13px;padding:5px 20px 5px 0;">Average Days in A/R</td><td style="color:#c8dde8;font-size:14px;padding:5px 0;font-weight:600;">${inputs.daysInAR} days</td></tr>
      </table>
    </div>

    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:28px;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Calculated Leakage</h3>
      <table style="border-collapse:collapse;width:100%;">
        <tr style="border-bottom:1px solid #1e3040;">
          <td style="color:#8aa8bb;font-size:13px;padding:8px 20px 8px 0;">Collection Gap</td>
          <td style="color:#e8edf2;font-size:15px;padding:8px 0;font-weight:700;text-align:right;">${fmt(results.benchmarkCollectionLoss)}<span style="color:#8aa8bb;font-size:11px;margin-left:4px;">/mo</span></td>
        </tr>
        <tr style="border-bottom:1px solid #1e3040;">
          <td style="color:#8aa8bb;font-size:13px;padding:8px 20px 8px 0;">Denial Revenue at Risk</td>
          <td style="color:#e8edf2;font-size:15px;padding:8px 0;font-weight:700;text-align:right;">${fmt(results.denialRevenueAtRisk)}<span style="color:#8aa8bb;font-size:11px;margin-left:4px;">/mo</span></td>
        </tr>
        <tr style="border-bottom:1px solid #1e3040;">
          <td style="color:#8aa8bb;font-size:13px;padding:8px 20px 8px 0;">A/R Days Status</td>
          <td style="padding:8px 0;text-align:right;"><span style="color:${arColor};font-size:12px;font-weight:700;">${arLabel}</span></td>
        </tr>
        <tr style="border-bottom:1px solid #1e3040;">
          <td style="color:#e8edf2;font-size:14px;padding:10px 20px 10px 0;font-weight:600;">Total Monthly Leakage</td>
          <td style="color:#B83030;font-size:20px;padding:10px 0;font-weight:800;text-align:right;">${fmt(results.totalMonthlyLeakage)}<span style="color:#8aa8bb;font-size:11px;margin-left:4px;">/mo</span></td>
        </tr>
        <tr>
          <td style="color:#e8edf2;font-size:14px;padding:8px 20px 8px 0;font-weight:600;">Annual Estimate</td>
          <td style="color:#E07A5F;font-size:22px;padding:8px 0;font-weight:800;text-align:right;">${annualFmt}<span style="color:#8aa8bb;font-size:11px;margin-left:4px;">/yr</span></td>
        </tr>
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

    // ── 2. Results email to the lead ─────────────────────────────────────────

    const leadHtml = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0b1520;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:620px;margin:0 auto;padding:48px 24px;">

    <p style="color:#8aa8bb;margin:0 0 6px;font-size:15px;">Hi ${lead.name},</p>
    <p style="color:#8aa8bb;margin:0 0 40px;font-size:15px;line-height:1.7;">
      Thank you for using the Harine Management Revenue Leakage Calculator.
      Here&rsquo;s your personalized estimate for <strong style="color:#c8dde8;">${lead.practice}</strong>.
    </p>

    <!-- Monthly leakage headline -->
    <div style="text-align:center;background:#0f1f2e;border-radius:12px;padding:32px 24px;margin-bottom:20px;border:1px solid #1e3040;">
      <p style="color:#8aa8bb;margin:0 0 10px;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Estimated Monthly Revenue Leakage</p>
      <p style="font-size:64px;font-weight:800;color:#B83030;margin:0;line-height:1;">${fmt(results.totalMonthlyLeakage)}</p>
      <p style="color:#8aa8bb;font-size:13px;margin:8px 0 0;">per month</p>
    </div>

    <!-- Annual projection -->
    <div style="background:#0f1f2e;border-radius:10px;padding:20px 24px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <p style="color:#8aa8bb;margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;">Annual Leakage Estimate</p>
        <p style="color:rgba(255,255,255,0.35);font-size:12px;margin:0;">If current patterns continue</p>
      </div>
      <p style="font-size:32px;font-weight:800;color:#E07A5F;margin:0;">${annualFmt}<span style="font-size:13px;color:rgba(255,255,255,0.3);margin-left:4px;">/yr</span></p>
    </div>

    <!-- Breakdown -->
    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:20px;">
      <h3 style="color:#e8edf2;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Leakage Breakdown</h3>
      <table style="border-collapse:collapse;width:100%;">
        <tr style="border-bottom:1px solid #1e3040;">
          <td style="padding:10px 0;">
            <p style="color:#c8dde8;font-size:14px;font-weight:600;margin:0 0 3px;">Collection Gap</p>
            <p style="color:#8aa8bb;font-size:12px;margin:0;">Your ${inputs.netCollectionRate}% collection rate vs. 95% industry benchmark</p>
          </td>
          <td style="text-align:right;padding:10px 0;white-space:nowrap;">
            <p style="color:${results.benchmarkCollectionLoss > 0 ? "#B83030" : "#4EAD7A"};font-size:18px;font-weight:700;margin:0;">${fmt(results.benchmarkCollectionLoss)}<span style="font-size:11px;color:#8aa8bb;margin-left:3px;">/mo</span></p>
          </td>
        </tr>
        <tr style="border-bottom:1px solid #1e3040;">
          <td style="padding:10px 0;">
            <p style="color:#c8dde8;font-size:14px;font-weight:600;margin:0 0 3px;">Denial Revenue at Risk</p>
            <p style="color:#8aa8bb;font-size:12px;margin:0;">${inputs.denialRate}% denial rate · 60% estimated as recoverable</p>
          </td>
          <td style="text-align:right;padding:10px 0;white-space:nowrap;">
            <p style="color:#C4543A;font-size:18px;font-weight:700;margin:0;">${fmt(results.denialRevenueAtRisk)}<span style="font-size:11px;color:#8aa8bb;margin-left:3px;">/mo</span></p>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;">
            <p style="color:#c8dde8;font-size:14px;font-weight:600;margin:0 0 3px;">A/R Days</p>
            <p style="color:#8aa8bb;font-size:12px;margin:0;">Current: ${inputs.daysInAR} days · Benchmark: under 30 days</p>
          </td>
          <td style="text-align:right;padding:10px 0;">
            <span style="background:${AR_COLOR[results.arStatus]}28;border:1.5px solid ${arColor};border-radius:4px;padding:4px 10px;font-size:11px;font-weight:700;color:${arColor};">${arLabel}</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Benchmarks -->
    <div style="background:#0f1f2e;border-radius:10px;padding:24px;margin-bottom:32px;">
      <h3 style="color:#e8edf2;margin:0 0 14px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Your Numbers vs. Industry Benchmarks</h3>
      <table style="border-collapse:collapse;width:100%;">
        <thead>
          <tr>
            <th style="text-align:left;color:#8aa8bb;font-size:11px;padding:0 0 10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1e3040;">Metric</th>
            <th style="text-align:center;color:#8aa8bb;font-size:11px;padding:0 0 10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1e3040;">Your Practice</th>
            <th style="text-align:center;color:#8aa8bb;font-size:11px;padding:0 0 10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1e3040;">Benchmark</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #1e3040;">
            <td style="color:#c8dde8;font-size:13px;padding:9px 0;">Net Collection Rate</td>
            <td style="text-align:center;color:${parseFloat(inputs.netCollectionRate) >= 95 ? "#4EAD7A" : "#B83030"};font-size:14px;font-weight:700;padding:9px 0;">${inputs.netCollectionRate}%</td>
            <td style="text-align:center;color:#4EAD7A;font-size:13px;padding:9px 0;">95%+</td>
          </tr>
          <tr style="border-bottom:1px solid #1e3040;">
            <td style="color:#c8dde8;font-size:13px;padding:9px 0;">Denial Rate</td>
            <td style="text-align:center;color:${parseFloat(inputs.denialRate) <= 5 ? "#4EAD7A" : "#B83030"};font-size:14px;font-weight:700;padding:9px 0;">${inputs.denialRate}%</td>
            <td style="text-align:center;color:#4EAD7A;font-size:13px;padding:9px 0;">Below 5%</td>
          </tr>
          <tr>
            <td style="color:#c8dde8;font-size:13px;padding:9px 0;">Days in A/R</td>
            <td style="text-align:center;color:${parseFloat(inputs.daysInAR) <= 30 ? "#4EAD7A" : "#B83030"};font-size:14px;font-weight:700;padding:9px 0;">${inputs.daysInAR} days</td>
            <td style="text-align:center;color:#4EAD7A;font-size:13px;padding:9px 0;">Under 30 days</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:44px;">
      <p style="color:#c8dde8;font-size:16px;font-weight:600;margin:0 0 10px;">Ready to recover this revenue?</p>
      <p style="color:#8aa8bb;font-size:14px;margin:0 0 24px;line-height:1.7;">
        A free 15-minute RCM review will identify the exact sources of leakage in your specific reports — no commitment required.
      </p>
      <a href="https://calendly.com/dev-harinemanagement/30min"
         style="display:inline-block;background:#B83030;color:#ffffff;font-weight:700;font-size:16px;padding:18px 40px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">
        Book a Free 15-Min RCM Review →
      </a>
    </div>

    <hr style="border:none;border-top:1px solid #1e3040;margin:0 0 24px;" />
    <p style="color:#4a6878;font-size:12px;text-align:center;margin:0;line-height:1.8;">
      These estimates are based on industry benchmarks and your self-reported inputs. Actual leakage may vary.<br />
      Devanshu Patel · Harine Management<br />
      <a href="https://harinemanagement.com" style="color:#4a6878;text-decoration:none;">harinemanagement.com</a>
      &nbsp;·&nbsp;
      <a href="mailto:dev@harinemanagement.com" style="color:#4a6878;text-decoration:none;">dev@harinemanagement.com</a>
    </p>

  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "Devanshu Patel <dev@harinemanagement.com>",
      to: lead.email,
      subject: `Your Revenue Leakage Analysis — ${lead.practice}`,
      html: leadHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[revenue-leakage]", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
