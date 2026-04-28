export interface PostFaqItem {
  question: string;
  answer: string;
}

/**
 * FAQPage JSON-LD data keyed by post slug.
 * Only posts listed here receive FAQ structured data.
 * All answers are written as complete standalone sentences — AI engines
 * extract FAQ answers in isolation and must not require surrounding context.
 */
export const POST_FAQS: Record<string, PostFaqItem[]> = {
  // ─────────────────────────────────────────────────────────────
  // What Is wRVU and Why It's the Most Important Metric in Your Practice
  // ─────────────────────────────────────────────────────────────
  "what-is-wrvu": [
    {
      question: "What is a wRVU?",
      answer:
        "A work relative value unit (wRVU) is a standardized measure of the clinical effort required to perform a medical service, assigned by the Centers for Medicare and Medicaid Services (CMS) to every CPT procedure code in the Medicare Physician Fee Schedule; it quantifies physician work — including time, cognitive effort, technical skill, and physical effort — independently of payer reimbursement rates, practice location, or overhead, making it the standard currency for measuring and comparing physician productivity across specialties and settings.",
    },
    {
      question: "How are wRVU values determined and updated?",
      answer:
        "CMS assigns wRVU values to each CPT code through the Medicare Physician Fee Schedule rulemaking process, which is conducted annually and results in updated values that take effect each January; values reflect physician work relative to a reference procedure, with more complex or time-intensive services carrying higher wRVU values — for example, a standard established patient office visit (99213) carries approximately 1.3 wRVUs while a complex established visit (99215) carries approximately 2.11; practices that track wRVUs must update their models each year when the new CMS schedule is published in November.",
    },
    {
      question: "How is wRVU used in physician compensation models?",
      answer:
        "In productivity-based physician compensation models, physicians are paid a dollar amount per wRVU produced — called the conversion factor — which may be set by the practice or benchmarked against MGMA specialty standards; total annual compensation is calculated by multiplying the physician's wRVU production for the year by this rate, which means higher-producing physicians earn more and the practice pays in proportion to the work delivered; wRVU-based compensation is widely used because it measures physician effort independently of payer mix, geography, and practice billing efficiency.",
    },
    {
      question:
        "What is a good wRVU benchmark for a primary care physician?",
      answer:
        "According to MGMA national benchmarking data, the median wRVU production for a full-time family medicine physician is approximately 4,700 to 5,200 wRVUs per year, with the 75th percentile around 6,000 and the 90th percentile above 7,000 — though these figures vary meaningfully by practice setting, patient population complexity, and whether the physician performs procedures in addition to evaluation and management visits; practices should benchmark against the MGMA specialty-specific percentile that corresponds to their compensation target rather than using a single national figure as a universal standard.",
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // Healthcare Due Diligence Checklist: 12 Data Points PE Firms Miss
  // ─────────────────────────────────────────────────────────────
  "healthcare-due-diligence-checklist": [
    {
      question:
        "What operational data points are most commonly missing from standard healthcare M&A due diligence?",
      answer:
        "The operational data points most often absent from standard healthcare due diligence packages include wRVU production by individual provider trended over 36 months, referral network source trends, payer realization rates by CPT code (not just payer mix percentages), denial rate segmented by payer and CPT code, documentation lag by provider, and scheduling capacity utilization relative to provider template — all of which live in the EHR and billing system rather than the data room and require structured data export requests to surface.",
    },
    {
      question:
        "Why is wRVU production by provider the most important dataset to request in a healthcare acquisition?",
      answer:
        "wRVU production by individual provider, trended monthly over 36 months, is the most important dataset in healthcare due diligence because it reveals which specific physicians are generating revenue, at what pace, and in which direction — information that aggregate financial statements cannot provide; a practice where 55% of revenue is produced by two physicians, one of whom has been declining in productivity for 18 months, is a fundamentally different acquisition risk than the same practice's P&L would suggest, and the distinction only becomes visible in provider-level productivity data.",
    },
    {
      question:
        "How does E/M code distribution signal compliance or revenue risk in a due diligence process?",
      answer:
        "Evaluation and management (E/M) code distribution — the breakdown of office visit codes billed by each physician across complexity levels (99202 through 99215) — signals compliance risk when a provider's billing pattern is a significant outlier above the specialty average for high-complexity codes, which may indicate upcoding that a payer audit will eventually find; it signals revenue risk when the pattern is a significant outlier below average, meaning the physician may be under-documenting encounters and leaving wRVU production and collections on the table; both conditions are material and neither is visible in financial statements.",
    },
    {
      question:
        "What is a data infrastructure audit and why does it belong in healthcare due diligence?",
      answer:
        "A data infrastructure audit in healthcare due diligence is an assessment of the target practice's existing analytics and reporting capabilities — what systems it uses, who built and maintains them, what reporting the practice currently produces, and what would be required to bring the practice to portfolio-standard reporting under new ownership; this assessment belongs in due diligence because the difference between acquiring a practice with a functioning analytics pipeline and one with none is often 60 to 90 days of post-close integration delay and material cost, both of which affect the EBITDA improvement timeline in the ownership plan.",
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // Revenue Cycle Analytics: The Metrics That Predict Practice Health 90 Days Out
  // ─────────────────────────────────────────────────────────────
  "revenue-cycle-analytics-metrics-90-days": [
    {
      question:
        "What is the difference between leading and lagging revenue cycle metrics?",
      answer:
        "Lagging revenue cycle metrics — such as net collections, net revenue per visit, and EBITDA — measure the financial outcome of encounters that typically happened 45 to 90 days earlier, meaning they confirm problems after they have already compounded through the billing pipeline; leading metrics, by contrast, measure the upstream conditions that determine billing outcomes before money is collected, such as documentation lag, first-pass claim acceptance rate, and denial rate by payer — these indicators give a practice 60 to 90 days of warning before a billing problem appears in financial statements.",
    },
    {
      question: "What is first-pass claim acceptance rate?",
      answer:
        "First-pass claim acceptance rate is the percentage of submitted claims that are accepted into adjudication by the payer without a technical rejection on the first submission; rejection (which occurs before adjudication) differs from denial (which occurs after) — a rejected claim was not accepted for processing because it failed the payer's technical requirements, such as missing a modifier, an incorrect place of service code, or an absent prior authorization number; a first-pass acceptance rate consistently below 95% signals billing workflow or coding quality issues that, if unaddressed, will translate into cash flow deterioration within 45 to 60 days.",
    },
    {
      question:
        "What is payer realization rate and what does a decline in it indicate?",
      answer:
        "Payer realization rate is the percentage of the payer's allowed amount that a medical practice actually collects, net of contractual adjustments — for a contracted commercial payer it should be close to 100%, representing the combined total of the insurer's payment and the patient's collected responsibility; when realization rate drops below 95% for a contracted payer, it typically signals one of three problems: patient balance collections are breaking down, the payer is underpaying relative to the contracted rate and adjustments are not being appealed, or write-offs are occurring at a higher rate than intended — each representing revenue that was earned and allowed but not collected.",
    },
    {
      question:
        "How far in advance do leading revenue cycle indicators predict cash flow problems?",
      answer:
        "The lead time varies by metric but follows a consistent pattern: documentation quality problems today — measured as increased documentation lag by provider — typically appear as claim submission delays within 2 to 4 weeks, as coding query backlogs within 3 to 5 weeks, and as denial rate increases within 6 to 10 weeks; first-pass acceptance rate declines today appear as cash flow events within 4 to 8 weeks; prior authorization gaps today appear as non-payment events within 3 to 6 weeks; a practice monitoring these six leading indicators weekly has a 60 to 90-day window to identify and address revenue problems before they reach the income statement.",
    },
  ],
};
