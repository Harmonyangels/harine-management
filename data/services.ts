export type TargetAudience = "practices" | "investors";

export interface ServiceOutcome {
  value: string;
  label: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  /** Keep under 60 characters. Canonical page: https://harinemanagement.com/services/[slug] */
  metaTitle: string;
  /** Keep under 160 characters. */
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  targetAudience: TargetAudience;
  /** 2–3 sentences describing the exact pain this service addresses. */
  problemStatement: string;
  /** 2–3 sentences describing what Harine Management does and the outcome delivered. */
  solutionStatement: string;
  /** 4–6 concrete deliverables included in this engagement. */
  deliverables: string[];
  /** Exactly 3 outcome stats shown on the service page. */
  outcomes: [ServiceOutcome, ServiceOutcome, ServiceOutcome];
  /** 4 FAQ items written as complete sentences — indexed by AI engines as direct answers. */
  faqItems: [
    ServiceFaqItem,
    ServiceFaqItem,
    ServiceFaqItem,
    ServiceFaqItem,
  ];
  /** 1–2 sentence plain-English definition written to be quoted directly by AI answer engines. */
  definitionBlock: string;
  /** When false, the URL stays up but the page is left out of the services index and search. */
  listed?: boolean;
}

export const services: Service[] = [
  // ─────────────────────────────────────────────────────────────
  // 0. Practice Operational Diagnostic — entry offer
  // ─────────────────────────────────────────────────────────────
  {
    slug: "practice-operational-diagnostic",
    title: "Reporting Diagnostic",
    shortTitle: "Reporting Diagnostic",
    metaTitle: "Reporting Diagnostic | Harine Management",
    metaDescription:
      "Reporting Diagnostic list price $2,500. Free for our first 10 clients. A five-day review of the reports you already run, with written findings and a build plan.",
    heroHeadline: "A five-day look at the reports you already run.",
    heroSubheadline:
      "List price $2,500. Free for our first 10 clients. You get written findings and a recommended build plan. Book a 30-minute call to claim it.",
    targetAudience: "practices",
    problemStatement:
      "Practice and billing managers already know which reports to run. The slow part is copying them into Excel and rebuilding the same workbook. A dashboard build is the wrong first purchase if nobody has looked at which reports you already export and what leadership actually needs to see.",
    solutionStatement:
      "The Reporting Diagnostic is a five-day review of your reporting workflow: which reports you run, what gets rebuilt in Excel, and what the dashboards should show first. You get written findings and a recommended build plan. The list price is $2,500, and it is free for our first 10 clients. After those first 10, the diagnostic is $2,500. If you sign the Core Build within 14 days of that paid diagnostic, the $2,500 is credited in full toward the build. The credit does not apply to the free founding diagnostics. Work is done under a signed business associate agreement.",
    deliverables: [
      "Review of which reports you already run in athenahealth or eClinicalWorks",
      "A map of what gets rebuilt in Excel, and how long that takes",
      "A recommendation for what the practice, provider, and billing views should show first",
      "Written findings",
      "A recommended build plan",
      "A short walkthrough of the findings",
    ],
    outcomes: [
      { value: "$2,500", label: "List price. Free for our first 10 clients." },
      { value: "5 days", label: "Written findings and a recommended build plan" },
      { value: "Your reports", label: "The exports you already run. No new EMR fields." },
    ],
    faqItems: [
      {
        question: "What is included in the Reporting Diagnostic?",
        answer:
          "A five-day review of your reporting workflow: which reports you run, what gets rebuilt in Excel, and what the dashboards should show first. You get written findings and a recommended build plan. It does not include building the Power BI dashboards.",
      },
      {
        question: "How much does the Reporting Diagnostic cost?",
        answer:
          "The list price is $2,500. It is free for our first 10 clients. Book a 30-minute call to claim that. After the first 10, the diagnostic is $2,500, and if you sign the Core Build within 14 days of that paid diagnostic, the $2,500 is credited in full toward the build.",
      },
      {
        question: "What do you need from the practice?",
        answer:
          "The reports you already run from athenahealth or eClinicalWorks. Nothing is reformatted first. Access is limited to what the review needs. Engagements are done under a signed business associate agreement and a confidentiality agreement. The files stay in your SharePoint.",
      },
      {
        question: "Does the free diagnostic reduce the Core Build price?",
        answer:
          "No. The founding diagnostics are free, and the 14-day credit applies only when a diagnostic is paid. After the first 10, a $2,500 diagnostic is credited in full toward a Core Build signed within 14 days. The Core Build remains $8,500, or $9,500 for practices with five or more locations.",
      },
    ],
    definitionBlock:
      "The Reporting Diagnostic from Harine Management is a five-day review of an outpatient practice's reporting workflow. The list price is $2,500, and it is free for the first 10 clients. Paid diagnostics after that are credited in full toward a Core Build signed within 14 days.",
  },

  // ─────────────────────────────────────────────────────────────
  // 1. Practice Analytics System
  // ─────────────────────────────────────────────────────────────
  {
    slug: "practice-analytics-system",
    title: "Core Build",
    shortTitle: "Core Build",
    metaTitle: "Core Build | Harine Management",
    metaDescription:
      "Core Build is $8,500, or $9,500 for five or more locations. Three Power BI dashboards on your SharePoint folder, refreshed by Power Automate when a new file lands.",
    heroHeadline: "Three Power BI dashboards. Fixed price.",
    heroSubheadline:
      "$8,500, or $9,500 for practices with five or more locations. Set up on your SharePoint folder, with Power Automate refresh and a walkthrough for your team.",
    targetAudience: "practices",
    problemStatement:
      "The reports are already in athenahealth or eClinicalWorks. Leadership still waits on someone to export them and rebuild the workbook. Native report libraries were not built to compare locations, track providers against the benchmarks you already use, or show denials and AR without another spreadsheet.",
    solutionStatement:
      "The Core Build maps the reports you already use, builds the data model, and stands up a practice dashboard, a provider dashboard, and billing views in Power BI. Your team exports those reports unchanged and drops them in a SharePoint folder. Power Automate triggers a refresh whenever a new file lands. There is no IT project, no integration with the EMR, and no EMR-vendor fee. The billing views — charges, payments, denials, and AR — are part of the scope and are not described as a finished product.",
    deliverables: [
      "Practice dashboard: visits by location and visit type, month-over-month and year-over-year volume, cancellations by reason",
      "Provider dashboard: patients seen per day, new patients in the month, work RVUs against the benchmarks you already set",
      "Billing views from the billing reports you export: charges billed, paid, and denied, charges by billed code, AR and adjustments",
      "SharePoint folder in your Microsoft 365 environment, with files dropped in as exported",
      "Power Automate refresh when a new file lands",
      "A walkthrough for your team",
    ],
    outcomes: [
      { value: "$8,500", label: "$9,500 when the practice has five or more locations" },
      { value: "Your folder", label: "Source files stay in your SharePoint" },
      { value: "On drop", label: "Power Automate refreshes when a new file lands" },
    ],
    faqItems: [
      {
        question: "Which EMRs does the Core Build use?",
        answer:
          "athenahealth (athenaOne) and eClinicalWorks. The workflow is the standard report export you already run. Harine Management does not list other EMR platforms as a current capability.",
      },
      {
        question: "Does the practice need an IT project?",
        answer:
          "No. Someone on your team exports the reports the way you do today and drops the files into a SharePoint folder. Power BI transforms them. Power Automate refreshes the dashboards when a new file lands. There is no EMR integration and no vendor interface fee.",
      },
      {
        question: "Where do the files live?",
        answer:
          "In your Microsoft 365 / SharePoint environment. Engagements are done under a signed business associate agreement and a confidentiality agreement. Access is limited to the reports and fields the work needs.",
      },
      {
        question: "Are the billing dashboards finished?",
        answer:
          "Billing views are part of the Core Build scope: charges billed, paid, and denied, charges by billed code, and AR and adjustments, from the billing reports you already export. They should not be described as a finished product. On the anonymized athenahealth engagement, the volume dashboard and the work RVU dashboard are in use, and the charges and collections views are still being built.",
      },
    ],
    definitionBlock:
      "The Harine Management Core Build is a fixed-price setup of three Power BI dashboards for an outpatient practice. Unchanged athenahealth or eClinicalWorks report exports are dropped into the practice's SharePoint folder, and Power Automate refreshes the dashboards when a new file lands. The price is $8,500, or $9,500 for practices with five or more locations.",
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Practice dashboard (volume)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "volume-analytics",
    title: "Practice Dashboard",
    shortTitle: "Practice Dashboard",
    metaTitle: "Practice Dashboard | Harine Management",
    metaDescription:
      "Patients seen by location and visit type, month-over-month and year-over-year volume, and cancellations by reason. Built from the reports you already export.",
    heroHeadline: "Volume by location, without rebuilding the workbook.",
    heroSubheadline:
      "Patients seen by location and by visit type. Month-over-month and year-over-year volume. Cancellations, broken down by reason. The dashboard updates when a new export lands in SharePoint.",
    targetAudience: "practices",
    problemStatement:
      "To see volume by location, visit mix, or cancellations, someone runs several reports, copies them into Excel, and rebuilds the same workbook. In a group with five or more locations that can take hours, and the file is already behind by the time it is ready.",
    solutionStatement:
      "The practice dashboard is one of the three views in the Core Build. Your team exports the standard athenahealth or eClinicalWorks reports, unchanged, and drops them in a SharePoint folder. Power BI transforms those files. Power Automate refreshes the dashboard when a new file lands. There is no IT project and no EMR integration.",
    deliverables: [
      "Patients seen by location and by visit type",
      "Month-over-month and year-over-year volume",
      "Cancellations, broken down by reason",
      "Daily, weekly, and monthly trends when the exported reports include those dates",
      "The same SharePoint drop used for the provider and billing views",
    ],
    outcomes: [
      { value: "On drop", label: "Refreshes when a new export lands in SharePoint" },
      { value: "By site", label: "Volume by location and visit type" },
      { value: "Your reports", label: "No new fields and no reformatting" },
    ],
    faqItems: [
      {
        question: "Does someone still export the volume reports?",
        answer:
          "Yes. That export is the workflow. Your team downloads the standard reports the same way you do today and drops the files into SharePoint as they are. Power BI does the rebuild that used to happen in Excel.",
      },
      {
        question: "Does the dashboard update overnight on its own?",
        answer:
          "No. Power Automate triggers a refresh when a new file lands in the SharePoint folder. If nobody exported a file, the dashboard does not invent a newer number.",
      },
      {
        question: "Which EMRs does this use?",
        answer:
          "athenahealth and eClinicalWorks. The practice dashboard is part of the Core Build, priced at $8,500, or $9,500 for practices with five or more locations.",
      },
      {
        question: "Can each provider be limited to their own numbers?",
        answer:
          "If the engagement needs separate views, that is scoped with the build. The standard leadership view compares locations and visit types in one Power BI report.",
      },
    ],
    definitionBlock:
      "The practice dashboard from Harine Management shows patients seen by location and visit type, volume trends, and cancellations by reason. It is built in Power BI from unchanged athenahealth or eClinicalWorks report exports dropped into the practice's SharePoint folder.",
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Provider dashboard
  // ─────────────────────────────────────────────────────────────
  {
    slug: "provider-productivity-analytics",
    title: "Provider Dashboard",
    shortTitle: "Provider Dashboard",
    metaTitle: "Provider Dashboard | Harine Management",
    metaDescription:
      "Patients seen per day by provider, new patients in the month, and work RVUs against the benchmarks you already set. Refreshes when a new export is dropped in SharePoint.",
    heroHeadline: "Work RVUs against the benchmarks you already set.",
    heroSubheadline:
      "Patients seen per day by provider. New patients in the month. Work RVUs, including wRVU per provider, from the reports you already export.",
    targetAudience: "practices",
    problemStatement:
      "Provider productivity often lives in a spreadsheet that someone rebuilds after exporting several EHR reports. By the time leadership can compare providers, the week has moved on.",
    solutionStatement:
      "The provider dashboard is part of the Core Build. It uses the same SharePoint drop as the practice dashboard. Power BI calculates work RVUs from the exported reports and lines them up against the benchmarks the practice already uses. It refreshes when a new file lands. It is not a live feed from the EMR.",
    deliverables: [
      "Patients seen per day by provider",
      "New patients in the month",
      "Work RVUs",
      "wRVU per provider, so leadership can compare provider productivity side by side",
      "Benchmarks the practice already set, not a new benchmark product",
    ],
    outcomes: [
      { value: "wRVU", label: "Per provider, from the reports you export" },
      { value: "Side by side", label: "Providers compared on the same definitions" },
      { value: "On drop", label: "Refresh when a new file lands in SharePoint" },
    ],
    faqItems: [
      {
        question: "How are work RVUs calculated?",
        answer:
          "From the CPT detail in the reports the practice already exports. Harine Management applies the wRVU values those reports need and shows wRVU per provider. The practice does not reformat the file first.",
      },
      {
        question: "Do you publish MGMA percentiles as part of the dashboard?",
        answer:
          "The dashboard uses the benchmarks the practice already set. Harine Management does not sell a separate national-percentile product.",
      },
      {
        question: "Is this a separate purchase from the Core Build?",
        answer:
          "No. The provider dashboard is one of the three views in the Core Build: $8,500, or $9,500 for practices with five or more locations.",
      },
      {
        question: "Is the work RVU view finished for the anonymized practice?",
        answer:
          "Yes. That engagement uses a volume dashboard and a work RVU dashboard, including wRVU per provider. Charges, collections, and the remaining financial comparisons from that engagement are still being built.",
      },
    ],
    definitionBlock:
      "The provider dashboard from Harine Management shows patients seen per day, new patients in the month, and work RVUs against the benchmarks a practice already set. It is built from athenahealth or eClinicalWorks report exports dropped into SharePoint.",
  },

  // ─────────────────────────────────────────────────────────────
  // 4. Billing dashboard
  // ─────────────────────────────────────────────────────────────
  {
    slug: "revenue-cycle-analytics",
    title: "Billing Dashboard",
    shortTitle: "Billing Dashboard",
    metaTitle: "Billing Dashboard | Harine Management",
    metaDescription:
      "Charges billed, paid, and denied, with denial reasons, charges by billed code, and AR and adjustments. Part of the Core Build. Not described as a finished product.",
    heroHeadline: "Billing views from the reports you already export.",
    heroSubheadline:
      "Charges billed, paid, and denied, with denial reasons. Charges by billed code. AR and adjustments. These views are part of the build and are not described as finished.",
    targetAudience: "practices",
    problemStatement:
      "Denials, charges, and AR usually take another set of exports and another Excel file. Leadership should not need a second workbook to see what the billing reports already contain.",
    solutionStatement:
      "Billing views are the third part of the Core Build. They are built from the billing reports the practice already exports, dropped into the same SharePoint folder, and refreshed when a new file lands. The scope is charges billed, paid, and denied, with denial reasons; charges by billed code; and AR and adjustments. On the anonymized engagement, the volume and work RVU dashboards are in use, and the charges and collections views are still being built. Do not read this page as a claim that those views are finished.",
    deliverables: [
      "Charges billed, paid, and denied, with denial reasons",
      "Charges by billed code",
      "AR and adjustments",
      "The same SharePoint drop and Power Automate refresh as the other two dashboards",
      "A scope confirmed against the reports the practice already runs",
    ],
    outcomes: [
      { value: "In scope", label: "Charges, denials, and AR from your billing exports" },
      { value: "Modest", label: "Not described as a finished billing product" },
      { value: "On drop", label: "Updates when a new billing file lands" },
    ],
    faqItems: [
      {
        question: "Are the billing dashboards finished?",
        answer:
          "They are part of the Core Build scope. They are not described as a finished product. For the anonymized multi-location practice on athenahealth, charges, collections, and the remaining financial comparisons are still being built. The volume dashboard and the work RVU dashboard from that engagement are in use.",
      },
      {
        question: "Does this replace a billing company?",
        answer:
          "No. The billing dashboard reads the reports you already export. It does not submit claims, work denials, or renegotiate payer contracts.",
      },
      {
        question: "Where do the billing files go?",
        answer:
          "Into your SharePoint folder, unchanged. Engagements are done under a signed business associate agreement and a confidentiality agreement. Access is limited to the reports the work needs.",
      },
      {
        question: "What does the billing view cost?",
        answer:
          "It is included in the Core Build: $8,500, or $9,500 for practices with five or more locations. It is not a separate integration.",
      },
    ],
    definitionBlock:
      "The billing dashboard from Harine Management is a Power BI view of charges, payments, denials, and AR, built from the billing reports a practice already exports into SharePoint. It is part of the Core Build and is not described as a finished product.",
  },

  // ─────────────────────────────────────────────────────────────
  // 5. Due Diligence Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "due-diligence-analytics",
    title: "Due Diligence Analytics",
    shortTitle: "Due Diligence",
    metaTitle: "Healthcare Due Diligence Analytics | Harine Management",
    metaDescription:
      "EHR-level due diligence for healthcare investors buying medical practices — provider risk, payer mix, revenue integrity, and AR aging, scoped to the deal calendar.",
    heroHeadline: "Before you close, know if the revenue is real.",
    heroSubheadline:
      "EHR-level due diligence analytics for healthcare investors acquiring medical practices — built from encounter data, not management summaries. The timeline is set to the deal calendar.",
    targetAudience: "investors",
    listed: false,
    problemStatement:
      "Management-provided financials in a healthcare M&A process show you what leadership wants you to see. They don't show you the physician whose retirement timeline isn't in the data room, the payer mix shift that will compress margins in year one of ownership, or the AR aging that management has been managing with aggressive collection tactics that won't survive new ownership. The gap between what a practice reports and what its EHR encounter data actually shows is where deal risk lives — and standard financial due diligence doesn't reach it.",
    solutionStatement:
      "Harine Management extracts and analyzes EHR-level data from the target practice — not management summaries, not adjusted financials — and produces a structured due diligence report covering revenue integrity, provider concentration risk, payer mix trajectory, and operational benchmarking against published specialty benchmarks where those exist. The output is formatted for data rooms and investment committee presentations. Timing is agreed when data access is granted, against the deal calendar.",
    deliverables: [
      "Three-year historical volume and revenue trend analysis from raw EHR encounter data",
      "Provider concentration analysis with revenue-at-risk modeling for top 1, 2, and 3 providers",
      "Payer mix quality assessment and reimbursement trajectory projection by payer class",
      "AR aging analysis benchmarked against specialty and regional peers",
      "Denial rate and collection rate comparison vs. comparable practices nationally",
      "Deliverable-ready PDF report formatted for data rooms and investment committee presentations",
    ],
    outcomes: [
      { value: "EHR-level", label: "Encounter records, not the management summary" },
      { value: "Scoped", label: "Timeline set to the diligence window" },
      { value: "Written", label: "A report you can put in the data room" },
    ],
    faqItems: [
      {
        question: "How long does healthcare due diligence analytics take?",
        answer:
          "Timing is agreed at kickoff, once data access and the deal calendar are known. A rush window is only offered when the data is actually available in time. There is no standing 48-hour guarantee.",
      },
      {
        question: "What EHR systems do you work with?",
        answer:
          "Confirmed experience is athenahealth and eClinicalWorks. Other platforms are not a current capability.",
      },
      {
        question: "What data does the client need to provide?",
        answer:
          "The acquiring firm provides Harine Management with authorization to access the target practice's EHR through the seller's cooperation under NDA; the data required includes 36 months of encounter-level CPT data with provider identifiers, 24 months of billing system claim data with adjudication status, an AR aging export, and a provider roster with employment agreement summaries — all of which are extractable from standard EHR and billing system exports with seller authorization.",
      },
      {
        question: "How is this different from a standard financial audit?",
        answer:
          "A standard financial audit or quality of earnings report analyzes management-provided financial statements — P&Ls, tax returns, and billing summaries — to verify earnings accuracy; Harine Management's EHR-level due diligence analyzes the raw encounter and billing data that produced those financials, surfacing provider revenue concentration, payer mix trajectory, denial rate patterns, and operational risks that do not appear in financial statements and are structurally invisible to a standard financial audit.",
      },
    ],
    definitionBlock:
      "Healthcare Due Diligence Analytics from Harine Management is a pre-close data analysis service for healthcare investors that extracts EHR encounter and billing data from target medical practices — revenue integrity, provider concentration, and payer mix — and delivers a written report for the data room. Timing follows the deal calendar.",
  },

  // ─────────────────────────────────────────────────────────────
  // 6. Practice Performance Scoring
  // ─────────────────────────────────────────────────────────────
  {
    slug: "practice-performance-scoring",
    title: "Practice Performance Scoring",
    shortTitle: "Performance Scoring",
    metaTitle: "Practice Performance Scoring | Harine Management",
    metaDescription:
      "Five-domain performance scores for medical practices benchmarked against MGMA national standards and regional peers — with a prioritized improvement roadmap.",
    heroHeadline: "A score that tells you where you actually stand.",
    heroSubheadline:
      "Practice performance benchmarked across revenue, productivity, billing efficiency, volume, and payer mix — scored against MGMA national standards and regional peers, with a prioritized improvement roadmap.",
    targetAudience: "investors",
    listed: false,
    problemStatement:
      "A practice that does not benchmark only knows its own trend — whether things are getting better or worse relative to last month, not relative to peers. A collection rate or a year-over-year productivity gain can look fine until it is set next to a published specialty benchmark. Without that context, a practice cannot tell a real gap from a stable result.",
    solutionStatement:
      "Practice Performance Scoring assigns a structured, domain-level score across five operational dimensions — volume, revenue cycle health, provider productivity, billing efficiency, and payer mix quality — set against published standards such as MGMA where a benchmark exists for the specialty. The output is a scored assessment with domain breakdowns and a prioritized list of what to look at first.",
    deliverables: [
      "Five-domain performance score: volume, revenue cycle, provider productivity, billing efficiency, payer mix",
      "MGMA percentile ranking for wRVU per provider and revenue per visit at 25th, 50th, and 75th percentile",
      "Collection rate, AR aging, and denial rate set next to published specialty benchmarks where those benchmarks exist",
      "Payer mix described against the specialty's usual mix, where a published comparison exists",
      "Prioritized list of gaps, with the practice's own numbers attached",
      "Quarterly re-score cadence to measure improvement against initial baseline",
    ],
    outcomes: [
      { value: "5 domains", label: "Scored: volume, RCM, productivity, billing, payer mix" },
      { value: "Published", label: "Benchmarks such as MGMA, where one exists for the specialty" },
      { value: "Quarterly", label: "Re-score cadence to track progress against improvement targets" },
    ],
    faqItems: [
      {
        question:
          "What does a practice performance score actually measure?",
        answer:
          "The Harine Management practice performance score measures a medical practice across five domains — patient volume relative to provider capacity, revenue cycle health (collection rate and AR aging vs. peers), provider productivity against MGMA national standards, billing efficiency (denial rate and reimbursement accuracy), and payer mix quality relative to specialty benchmarks — expressing each domain as a scored percentile so leadership can see at a glance where the practice is strong and where it has material room for improvement.",
      },
      {
        question:
          "How is this different from simply looking at MGMA benchmarking data directly?",
        answer:
          "MGMA benchmarking covers physician compensation and some productivity metrics but does not assess a practice across revenue cycle health, billing efficiency, and payer mix in one place. Harine Management's scoring puts EHR-derived operational data next to published standards such as MGMA, where a benchmark exists, in a single written assessment.",
      },
      {
        question:
          "Who typically requests a practice performance score?",
        answer:
          "Practice performance scoring is most commonly requested by practices preparing for a strategic decision — adding a location, bringing on new providers, renegotiating payer contracts, or evaluating a potential sale — and by PE firms and healthcare investors who want an independent operational assessment of a portfolio company or acquisition target without the cost of a full management consulting engagement.",
      },
      {
        question:
          "How long does the initial scoring engagement take to deliver?",
        answer:
          "Timing is set when data access is confirmed. If a pipeline is already in place, the score can be produced from that data without a new extraction. The date is agreed up front, not assumed.",
      },
    ],
    definitionBlock:
      "Practice Performance Scoring from Harine Management is a structured benchmarking assessment that scores a medical practice across five domains — volume, revenue cycle, provider productivity, billing efficiency, and payer mix quality — against MGMA national standards and regional peer data, delivering a scored report and a prioritized improvement roadmap suitable for leadership review, strategic planning, and investment evaluation.",
  },

  // ─────────────────────────────────────────────────────────────
  // 7. Post-Acquisition Intelligence
  // ─────────────────────────────────────────────────────────────
  {
    slug: "post-acquisition-intelligence",
    title: "Post-Acquisition Intelligence",
    shortTitle: "Post-Acquisition",
    metaTitle: "Post-Acquisition Intelligence | Harine Management",
    metaDescription:
      "Analytics infrastructure for PE-backed practices after close — a KPI baseline, portfolio-style reporting, and a dashboard the operators can actually open.",
    heroHeadline: "You closed the deal. Now build the measurement layer.",
    heroSubheadline:
      "Post-acquisition analytics for PE-backed medical practices — a KPI baseline, reporting shaped to the portfolio cadence, and a dashboard in place before improvement work is judged.",
    targetAudience: "investors",
    listed: false,
    problemStatement:
      "Most medical practice acquisitions close without functioning analytics infrastructure. The practice has been running on a billing company, tribal knowledge, and a practice manager who knows where everything is. After close, the investor needs operational visibility the practice has never had to provide, and there is no baseline to measure a value-creation plan against.",
    solutionStatement:
      "Post-Acquisition Intelligence builds the EHR data pipeline, establishes baseline KPIs, shapes reporting to portfolio requirements, and stands up a dashboard the operators can check. The point is to have a baseline before improvement work is judged against it.",
    deliverables: [
      "Post-close EHR data pipeline, scoped once data access is granted",
      "Month 1 baseline KPI report: volume, revenue, provider productivity, collection rate, and AR aging",
      "Standardized monthly reporting package aligned with PE portfolio reporting cadence and format",
      "KPI monitoring against thresholds the engagement agrees in writing",
      "Multi-practice portfolio dashboard for firms with more than one healthcare holding",
      "Month 3 and Month 6 milestone reports with variance analysis vs. acquisition-date baseline",
    ],
    outcomes: [
      { value: "Baseline", label: "KPI baseline set before improvement work is judged" },
      { value: "Written", label: "A first baseline report from the new pipeline" },
      { value: "Same definitions", label: "Reporting shaped to the portfolio cadence" },
    ],
    faqItems: [
      {
        question: "Why set up analytics soon after close?",
        answer:
          "The period right after close is when a baseline gets set. Later comparisons need that starting point. The work is a measurement layer — volume, revenue cycle, and provider productivity — so later changes have something to be compared with. It is not a promise that problems will be found or fixed on a set schedule.",
      },
      {
        question:
          "What if the acquired practice has no data infrastructure or reporting history?",
        answer:
          "These engagements often start with a practice that has no formal analytics infrastructure. The work begins with an EHR data assessment, then builds the extraction pipeline, structures the historical data, and delivers a first baseline report. The practice does not need an existing reporting stack to start.",
      },
      {
        question:
          "Can Harine Management standardize reporting across multiple practices in a PE portfolio?",
        answer:
          "Yes — portfolio-level standardization is one of Post-Acquisition Intelligence's core applications; Harine Management builds each portfolio company's analytics infrastructure to a common schema and reporting format, which enables the PE firm's operations team to review all holdings in a single dashboard with consistent KPI definitions and comparable trend data.",
      },
      {
        question:
          "How does post-acquisition analytics interact with the acquired practice's existing billing company or RCM vendor?",
        answer:
          "Harine Management builds its analytics layer from EHR data directly and does not require coordination with or data from the existing RCM vendor; the analytics layer is independent of the billing company, which means it can be used to measure and hold the RCM partner accountable with objective data rather than relying on the billing company's own performance reports.",
      },
    ],
    definitionBlock:
      "Post-Acquisition Intelligence from Harine Management is a healthcare analytics service for investors that sets up an EHR data pipeline, a baseline KPI report, and a dashboard for a newly acquired medical practice, so later operating work has a starting point to measure against.",
  },

  // ─────────────────────────────────────────────────────────────
  // 8. AI Insights — not a current offer. URL kept so older links resolve.
  // ─────────────────────────────────────────────────────────────
  {
    slug: "ai-insights-layer",
    title: "AI Insights",
    shortTitle: "AI Insights",
    metaTitle: "AI Insights | Harine Management",
    metaDescription:
      "Harine Management does not sell an AI insights layer. The current offer is Power BI dashboards from the reports you already export.",
    heroHeadline: "AI Insights is not a current offer.",
    heroSubheadline:
      "Harine Management does not sell anomaly detection, natural-language summaries, or predictive alerts. The work is Power BI dashboards from the reports you already export.",
    targetAudience: "practices",
    listed: false,
    problemStatement:
      "An AI insights layer is not part of the offer. Selling one would describe a product that is not shipped.",
    solutionStatement:
      "The current offer is a Reporting Diagnostic, a Core Build of three Power BI dashboards, and a monthly retainer. Your team exports athenahealth or eClinicalWorks reports and drops them in SharePoint. Power Automate refreshes the dashboards when a new file lands.",
    deliverables: [
      "This page is kept so older links still open",
      "It is not a product you can buy",
      "Book a 30-minute call if you want the Reporting Diagnostic or the Core Build",
    ],
    outcomes: [
      { value: "Not offered", label: "No AI insights product" },
      { value: "Power BI", label: "Dashboards from the reports you export" },
      { value: "SharePoint", label: "Files stay in your tenant" },
    ],
    faqItems: [
      {
        question: "Do you sell an AI insights layer?",
        answer:
          "No. Harine Management does not sell anomaly detection, natural-language performance summaries, or predictive alerts.",
      },
      {
        question: "What do you sell instead?",
        answer:
          "A Reporting Diagnostic (list price $2,500, free for our first 10 clients), a Core Build at $8,500 or $9,500 for five or more locations, and a retainer of $1,000 to $1,250 a month.",
      },
      {
        question: "How do the dashboards get their data?",
        answer:
          "Someone exports the reports the practice already runs and drops the files into SharePoint. Power BI transforms them. Power Automate refreshes when a new file lands.",
      },
      {
        question: "How is practice data handled?",
        answer:
          "Engagements are done under a signed business associate agreement and a confidentiality agreement. Source files stay in the client's SharePoint. Access is limited to the reports the work needs.",
      },
    ],
    definitionBlock:
      "Harine Management does not offer an AI insights layer. The current work is Power BI dashboards built from athenahealth or eClinicalWorks report exports dropped into the client's SharePoint folder.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByAudience(audience: TargetAudience): Service[] {
  return services.filter((s) => s.targetAudience === audience);
}

export function isListedService(service: Service): boolean {
  return service.listed !== false;
}
