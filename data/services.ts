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
}

export const services: Service[] = [
  // ─────────────────────────────────────────────────────────────
  // 0. Practice Operational Diagnostic — entry offer
  // ─────────────────────────────────────────────────────────────
  {
    slug: "practice-operational-diagnostic",
    title: "Practice Operational Diagnostic",
    shortTitle: "Operational Diagnostic",
    metaTitle: "Practice Operational Diagnostic | Harine Management",
    metaDescription:
      "A $2,500 Practice Operational Diagnostic for medical practices. Reporting, revenue cycle, and operations data reviewed in under a week, with a written fix plan.",
    heroHeadline: "A scoped look at the reporting, the billing, and the operations.",
    heroSubheadline:
      "Fixed price, $2,500. Finished in under a week. You get a written findings report and a prioritized fix plan — before any dashboard build.",
    targetAudience: "practices",
    problemStatement:
      "Practice managers already know the weekly reporting is slow. What is harder to see is which number is wrong, which denial pattern is worth working, and whether a dashboard is the next step or a distraction. A full analytics build is the wrong first purchase if the underlying reports and workflows have not been looked at.",
    solutionStatement:
      "The Practice Operational Diagnostic is a fixed-price review of how the practice reports today, how the revenue cycle is performing in the data you already have, and where operations data is missing or contradictory. Harine Management reads that material and returns a written findings report plus a prioritized fix plan. Work can be done under a business associate agreement, and data access follows a minimum-necessary standard.",
    deliverables: [
      "Review of current reporting: what is rebuilt in Excel, and what the EHR already produces",
      "Revenue cycle review from the reports you have: collections, denials, and AR aging",
      "Operations review: volume, provider productivity, and where those numbers disagree",
      "Written findings report",
      "Prioritized fix plan — what to change first, and what can wait",
      "A short walkthrough of the findings",
    ],
    outcomes: [
      { value: "$2,500", label: "Fixed price, agreed before the review starts" },
      { value: "< 1 week", label: "Written findings and a prioritized fix plan" },
      { value: "3 areas", label: "Reporting, revenue cycle, and operations data" },
    ],
    faqItems: [
      {
        question: "What is included in the Practice Operational Diagnostic?",
        answer:
          "The diagnostic is a scoped review of your reporting, revenue cycle, and operations data. It ends with a written findings report and a prioritized fix plan. It does not include building a Power BI dashboard, submitting claims, or renegotiating payer contracts.",
      },
      {
        question: "How much does it cost and how long does it take?",
        answer:
          "The price is $2,500. The review is completed in under a week from the time the agreed data and reports are available.",
      },
      {
        question: "What do you need from the practice?",
        answer:
          "The reports you already run, plus read access to the EHR or billing exports that those reports come from. Access is limited to what the review needs. The engagement can be done under a business associate agreement.",
      },
      {
        question: "What happens after the diagnostic?",
        answer:
          "You keep the written report either way. If the fix plan calls for a dashboard, a revenue cycle repair, or diligence work, that is a separate scope. Nothing in the diagnostic commits you to a larger engagement.",
      },
    ],
    definitionBlock:
      "The Practice Operational Diagnostic from Harine Management is a $2,500 review of a medical practice's reporting, revenue cycle, and operations data, completed in under a week, and delivered as a written findings report with a prioritized fix plan.",
  },

  // ─────────────────────────────────────────────────────────────
  // 1. Practice Analytics System
  // ─────────────────────────────────────────────────────────────
  {
    slug: "practice-analytics-system",
    title: "Practice Analytics System",
    shortTitle: "Practice Analytics",
    metaTitle: "Practice Analytics System | Harine Management",
    metaDescription:
      "Power BI dashboards for medical practices, connected to athenahealth and eClinicalWorks. Volume, revenue, and provider views without another Excel export.",
    heroHeadline: "Analytics built for decisions, not just reports.",
    heroSubheadline:
      "We connect your EHR to a dashboard your CMO checks before their first meeting of the day — and keep it running so your team never has to.",
    targetAudience: "practices",
    problemStatement:
      "Medical practice leadership makes daily decisions on data that is two to three weeks old, assembled manually by someone who exports from the EHR and pastes it into a spreadsheet. The EHR contains everything needed to run the practice intelligently, but its native reporting is too slow, too fragmented, and too dependent on a person running a report for the information to reach the right desk in time to act on it.",
    solutionStatement:
      "The Practice Analytics System is a fully managed analytics infrastructure that connects directly to your EHR and delivers a Power BI dashboard that updates every morning without human intervention. Volume, revenue, provider performance, and trend data are surfaced in a single executive view — maintained by Harine Management so your leadership simply opens it.",
    deliverables: [
      "Daily patient volume dashboard by provider, location, and visit type",
      "wRVU production tracking with month-over-month and year-over-year trend lines",
      "Revenue and collection rate summary with live payer mix breakdown",
      "Executive summary view designed for 60-second morning consumption",
      "Automated EHR data pipeline with daily refresh and failure alerting",
      "Onboarding, user training, and ongoing pipeline maintenance included",
    ],
    outcomes: [
      { value: "Daily", label: "Dashboard refresh from the EHR, on a schedule" },
      { value: "Yours", label: "The dashboard lives in your environment" },
      { value: "Maintained", label: "Pipeline upkeep stays with Harine Management" },
    ],
    faqItems: [
      {
        question:
          "What EHR systems does the Practice Analytics System work with?",
        answer:
          "The Practice Analytics System is built for athenahealth (athenaOne) and eClinicalWorks. Other platforms that support a structured export can be assessed on the scoping call, with no obligation to continue.",
      },
      {
        question:
          "Does my practice need a data team or IT staff to run this?",
        answer:
          "No. Harine Management builds and maintains the data pipeline. After go-live, the practice's job is to open the dashboard. Timing depends on EHR access and the views in scope, and it is set in writing before the build starts.",
      },
      {
        question:
          "Who owns the dashboard and the underlying data?",
        answer:
          "The client owns everything — the Power BI dashboard is deployed inside your Microsoft 365 or cloud environment, and all underlying data flows into your own storage; Harine Management does not retain copies of your practice data.",
      },
      {
        question:
          "What happens when the EHR pushes an update that breaks the data connection?",
        answer:
          "When pipeline monitoring is part of the engagement, Harine Management is alerted if a refresh fails. EHR updates that break a connection are diagnosed and patched as part of that maintenance.",
      },
    ],
    definitionBlock:
      "The Harine Management Practice Analytics System connects medical practice data from athenahealth and eClinicalWorks to a Power BI dashboard that refreshes on a schedule, and is maintained without an internal data team at the practice.",
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Volume Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "volume-analytics",
    title: "Volume Analytics",
    shortTitle: "Volume Analytics",
    metaTitle: "Volume Analytics for Medical Practices | Harine Management",
    metaDescription:
      "Real-time patient volume tracking by provider, location, and visit type — built on your EHR data and delivered daily in Power BI without manual exports.",
    heroHeadline: "Know exactly how busy you are — and where, and why.",
    heroSubheadline:
      "Patient encounter volume by provider, location, visit type, and payer — updated daily from your EHR without a single manual export or scheduled report run.",
    targetAudience: "practices",
    problemStatement:
      "Most practices know their total monthly visit count eventually — but they don't know which locations are running below capacity today, which providers have unfilled time this week, or which visit types are trending down before the revenue impact shows up in the P&L. Volume problems are invisible until they are expensive, and by the time a monthly report surfaces a dip, the window for corrective action has already closed.",
    solutionStatement:
      "Harine Management's Volume Analytics service builds a real-time patient encounter dashboard connected directly to your EHR, giving leadership daily visibility into encounter counts segmented by provider, location, visit type, payer, and time period. Trend lines surface changes early enough to act on them — capacity decisions are made with data rather than intuition and end-of-month surprises.",
    deliverables: [
      "Daily patient encounter volume by provider and location",
      "Visit type breakdown — new patients, established, follow-up, telehealth, and procedure visits",
      "Payer mix by volume: commercial, Medicare, Medicaid, and self-pay split",
      "Week-over-week and month-over-month trend visualization with variance highlighting",
      "No-show and cancellation rate tracking where EHR data supports it",
      "Capacity utilization view by provider and location relative to scheduled capacity",
    ],
    outcomes: [
      { value: "Daily", label: "Encounter counts, without a weekly spreadsheet" },
      { value: "By site", label: "Volume split by provider, location, and visit type" },
      { value: "Early", label: "A dip shows up before the monthly close" },
    ],
    faqItems: [
      {
        question:
          "Can volume analytics track telehealth visits separately from in-person encounters?",
        answer:
          "Yes — where the EHR records visit type or modality at the encounter level, Harine Management's volume dashboard segments telehealth separately from in-person visits, with independent trend lines and payer mix breakdowns for each visit modality.",
      },
      {
        question:
          "How granular can the location-level breakdown be?",
        answer:
          "Volume can be segmented by any location or facility identifier stored in the EHR, down to individual exam rooms if that data is captured at the encounter level; most multi-site practices use the provider-and-location combination as their standard view, with a roll-up to practice total.",
      },
      {
        question:
          "Can individual providers see only their own volume data without seeing colleagues' numbers?",
        answer:
          "Yes — Power BI row-level security allows Harine Management to configure provider-specific login views so individual physicians see only their own encounter data, while administrators and leadership retain access to the full cross-provider and cross-location view.",
      },
      {
        question:
          "Does volume analytics include scheduled appointment data or only completed encounters?",
        answer:
          "The standard configuration uses completed encounter data from the EHR; where the EHR supports structured appointment export and the client wants forward-looking visibility, scheduled appointment data can be layered in alongside completed encounters to show the coming week's projected volume.",
      },
    ],
    definitionBlock:
      "Volume Analytics from Harine Management is a healthcare practice intelligence service that delivers daily-updated patient encounter counts segmented by provider, location, visit type, and payer — extracted directly from EHR systems like Athenahealth and eClinicalWorks and surfaced in a Power BI dashboard without any manual reporting work, enabling practice leadership to identify volume trends and capacity gaps in real time.",
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Provider Productivity Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "provider-productivity-analytics",
    title: "Provider Productivity Analytics",
    shortTitle: "Provider Productivity",
    metaTitle: "Provider Productivity Analytics | Harine Management",
    metaDescription:
      "Daily wRVU tracking, MGMA benchmarking, and goal attainment dashboards for medical practices — built from CPT-level EHR data, updated every morning.",
    heroHeadline: "Every provider. Every wRVU. Every day.",
    heroSubheadline:
      "Individual productivity tracking built from CPT-level EHR data — benchmarked against MGMA national standards and updated daily in Power BI with role-level access for every provider.",
    targetAudience: "practices",
    problemStatement:
      "Physician compensation is increasingly tied to wRVU production, but most practices have no reliable way to see real-time productivity at the individual provider level. Quarterly spreadsheets arrive too late to course-correct, and providers who are underperforming against goal have no visibility into their own numbers until the annual compensation reconciliation — by which point the organization has already absorbed months of shortfall with no opportunity to intervene.",
    solutionStatement:
      "Provider Productivity Analytics gives each provider and their leadership a daily view of wRVU production against goal, benchmarked against MGMA specialty-specific standards, with trend lines that surface underperformance weeks before it becomes a compensation conversation. Harine Management builds and maintains the dashboard from CPT-level EHR data, with role-level access so individual providers see their own numbers and department heads see the full cohort.",
    deliverables: [
      "Individual wRVU production by month, rolling quarter, and rolling 12 months",
      "Goal attainment tracking with variance highlighted — over, at, or under target",
      "MGMA national benchmarking at the 25th, 50th, 75th, and 90th percentile by specialty",
      "Visit volume by provider, visit type, and location with new-to-established patient ratio",
      "Provider performance cohort view for department heads and CMOs",
      "Role-secured individual provider login with self-service visibility into their own numbers",
    ],
    outcomes: [
      { value: "Daily", label: "wRVU view, not a quarterly spreadsheet" },
      { value: "MGMA", label: "Percentile context from the published report" },
      { value: "Per provider", label: "Each physician can see their own numbers" },
    ],
    faqItems: [
      {
        question:
          "What is a wRVU and why is it the right metric for measuring physician productivity?",
        answer:
          "A work relative value unit (wRVU) is the standard measure of physician productivity in ambulatory care — it quantifies clinical effort per encounter based on CPT code, is independent of payer reimbursement rates, and is the basis for physician compensation in the majority of productivity-based compensation models; tracking wRVUs at the individual provider level is the foundation of fair, transparent provider management because it measures effort rather than collections.",
      },
      {
        question:
          "How does Harine Management calculate wRVU data from the EHR?",
        answer:
          "wRVU values are derived from the CPT codes recorded at each encounter in the EHR; Harine Management's data pipeline extracts encounter-level CPT data and applies the current CMS wRVU schedule to calculate production by provider and by day — without any manual compilation, and with automatic updates when CMS revises wRVU values annually.",
      },
      {
        question:
          "Can providers access their own productivity dashboard without seeing colleagues' data?",
        answer:
          "Yes — Power BI row-level security is configured so each provider logs in and sees only their own wRVU production, goal attainment, and MGMA benchmarking, while department heads and CMOs retain an unrestricted view of the full provider cohort; individual provider access is included in the standard engagement at no additional cost.",
      },
      {
        question:
          "How current is the MGMA benchmarking data used for percentile rankings?",
        answer:
          "Harine Management uses the most recent MGMA Physician Compensation and Production Report for benchmarking; the dataset is updated annually when the new MGMA report is published, and clients are proactively notified if their MGMA percentile rank changes materially when the new benchmarks are applied.",
      },
    ],
    definitionBlock:
      "Provider Productivity Analytics from Harine Management is a daily-updated wRVU tracking and MGMA benchmarking service for medical practices that surfaces individual physician production against goal and against national specialty percentiles — built from CPT-level EHR encounter data and delivered in a role-secured Power BI dashboard that gives each provider self-service visibility into their own numbers.",
  },

  // ─────────────────────────────────────────────────────────────
  // 4. Revenue Cycle Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "revenue-cycle-analytics",
    title: "Revenue Cycle Analytics",
    shortTitle: "Revenue Cycle",
    metaTitle: "Revenue Cycle Analytics | Harine Management",
    metaDescription:
      "AR aging, denial rates, collection rates, and payer mix dashboards built from EHR billing data — catch revenue cycle problems in days, not quarters.",
    heroHeadline: "Know if the revenue is real before it reaches your bank account.",
    heroSubheadline:
      "Collection rates, AR aging, denial patterns, and payer mix — surfaced in real time from your EHR billing data so your finance team can act before the shortfall compounds.",
    targetAudience: "practices",
    problemStatement:
      "Revenue cycle problems are easy to miss in a monthly summary. A collection rate can drift, AR over 90 days can accumulate, and a denial pattern can sit until someone happens to pull the right report. By the time the change shows in the financial statements, the encounters that caused it are already old.",
    solutionStatement:
      "Revenue Cycle Analytics puts collection rates by payer, AR aging by bucket and provider, denial rates by CPT code, and net revenue per visit in one Power BI view, refreshed from EHR billing data. The point is to see a pattern while the encounters behind it can still be worked.",
    deliverables: [
      "AR aging dashboard: current, 30, 60, 90, and 120+ day buckets by provider and payer",
      "Collection rate by payer and visit type with month-over-month trend lines",
      "Denial rate by CPT code and payer with encounter volume and dollar impact quantified",
      "Payer mix dashboard: commercial / Medicare / Medicaid / self-pay split tracked over time",
      "Net revenue per visit by payer and CPT code",
      "Reimbursement rate variance — actual amount collected vs. contracted rate by payer",
    ],
    outcomes: [
      { value: "By payer", label: "Collection rate, denial rate, and AR aging in one view" },
      { value: "Daily", label: "Billing data refresh from the EHR" },
      { value: "By code", label: "Denial patterns split by CPT code and payer" },
    ],
    faqItems: [
      {
        question:
          "What is accounts receivable aging and why does it matter for a medical practice?",
        answer:
          "Accounts receivable aging is a breakdown of unpaid claims by how long they have been outstanding — typically segmented into current (0–30 days), 30–60, 60–90, and 90+ day buckets — and it is one of the most reliable indicators of billing health; AR that is heavily concentrated in the 90+ day bucket signals collection failures, payer adjudication problems, or billing workflow breakdowns that, if left unaddressed, typically result in permanent write-offs at a fraction of the billed amount.",
      },
      {
        question:
          "Can revenue cycle analytics identify which payers are paying slowly or reimbursing below contract?",
        answer:
          "Yes — Harine Management's payer-level analysis shows average days-to-payment by payer, actual collection rate vs. contracted rate, and denial frequency by payer and CPT code, which together identify whether a payer is systematically slow-paying, denying specific procedure codes at anomalous rates, or reimbursing below the negotiated fee schedule.",
      },
      {
        question:
          "Does this replace a revenue cycle management company or billing team?",
        answer:
          "No — Revenue Cycle Analytics is the measurement layer that tells you whether your RCM partner or internal billing team is performing and where the gaps are; it does not submit claims, manage denials, or renegotiate payer contracts, but it gives you the data to hold your RCM partner accountable with specificity rather than relying solely on the reports the RCM company produces about its own performance.",
      },
      {
        question:
          "How does Harine Management access billing data without compromising protected health information?",
        answer:
          "Billing data is pulled through the EHR's approved export path and lands in the client's own environment. Harine Management does not keep a copy of the billing records. Access is limited to what the engagement needs, and the work can be done under a business associate agreement.",
      },
    ],
    definitionBlock:
      "Revenue Cycle Analytics from Harine Management is a real-time financial performance intelligence service for medical practices that surfaces accounts receivable aging, collection rates, denial patterns, and payer mix from EHR billing data in a daily-updated Power BI dashboard — enabling finance teams to identify and address revenue cycle problems days after they emerge rather than a quarter after they compound.",
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
          "The work is built for practices running athenahealth, eClinicalWorks, and other ambulatory platforms that can produce a structured export, including Epic, Kareo, and Greenway Health when the export is usable. The extraction approach is confirmed when the engagement is scoped.",
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
    problemStatement:
      "Most medical practice acquisitions close without functioning analytics infrastructure. The practice has been running on a billing company, tribal knowledge, and a practice manager who knows where everything is. After close, the investor needs operational visibility the practice has never had to provide, and there is no baseline to measure a value-creation plan against.",
    solutionStatement:
      "Post-Acquisition Intelligence builds the EHR data pipeline, establishes baseline KPIs, shapes reporting to portfolio requirements, and stands up a dashboard the operators can check. The point is to have a baseline before improvement work is judged against it.",
    deliverables: [
      "Post-close EHR data pipeline, scoped once data access is granted",
      "Month 1 baseline KPI report: volume, revenue, provider productivity, collection rate, and AR aging",
      "Standardized monthly reporting package aligned with PE portfolio reporting cadence and format",
      "Early-warning KPI monitoring with threshold alerts for metric deterioration in real time",
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
  // 8. AI Insights Layer
  // ─────────────────────────────────────────────────────────────
  {
    slug: "ai-insights-layer",
    title: "AI Insights Layer",
    shortTitle: "AI Insights",
    metaTitle: "AI Insights Layer for Medical Practices | Harine Management",
    metaDescription:
      "Anomaly detection, weekly natural language performance summaries, and predictive threshold alerts layered on your Harine Management analytics infrastructure.",
    heroHeadline: "The dashboard shows you the data. The AI layer tells you what it means.",
    heroSubheadline:
      "Automated anomaly detection, natural language weekly performance narratives, and predictive threshold alerts built on top of your existing analytics infrastructure — no data science team required.",
    targetAudience: "practices",
    problemStatement:
      "A dashboard that shows you the numbers is valuable. A dashboard that tells you something is wrong before you notice it is transformative. Most practice leadership teams do not have the bandwidth to monitor every KPI every day — they open the dashboard when they remember to, spot the metrics that look obviously off, and miss the subtle trends that compound into expensive problems because no one was watching when the pattern started.",
    solutionStatement:
      "The AI Insights Layer sits on top of your existing Harine Management analytics infrastructure and adds three capabilities: automated statistical anomaly detection that flags metric deviations before they become visible to the naked eye, a weekly natural language summary that translates dashboard data into a readable performance narrative, and predictive threshold alerts that fire before a KPI crosses a critical boundary — not after.",
    deliverables: [
      "Automated anomaly detection across volume, revenue, productivity, and billing KPIs",
      "Weekly natural language performance summary — readable leadership briefing in under 2 minutes",
      "Predictive threshold alerts: fires before AR aging, collection rate, or volume crosses a defined limit",
      "Month-over-month and year-over-year variance commentary generated automatically from dashboard data",
      "Insight prioritization — surfaces the 2 to 3 metrics most deserving attention each week",
      "Email or Microsoft Teams notification delivery for alert and weekly summary distribution",
    ],
    outcomes: [
      { value: "Weekly", label: "A short written note, instead of scanning every chart" },
      { value: "Thresholds", label: "Alerts use limits you set, on metrics you already track" },
      { value: "Managed", label: "No data science hire required at the practice" },
    ],
    faqItems: [
      {
        question:
          "What AI technology does the AI Insights Layer use?",
        answer:
          "The AI Insights Layer uses large language model APIs to generate natural language trend summaries and performance narratives from structured dashboard data, and statistical threshold modeling on the underlying time-series data for anomaly detection; no proprietary patient data is sent to any external AI system — only aggregated, de-identified metric values such as collection rate, wRVU totals, and encounter counts.",
      },
      {
        question:
          "Does a practice need an AI subscription or internal data science team to use this?",
        answer:
          "No — the AI Insights Layer is a fully managed add-on to Harine Management's existing analytics infrastructure; Harine Management handles all configuration, model calibration, threshold tuning, and narrative generation; the practice receives finished weekly summaries and real-time alerts without any internal technical resources.",
      },
      {
        question:
          "What kinds of anomalies does the AI layer detect and surface?",
        answer:
          "The AI layer detects deviations from expected patterns across all tracked KPIs — a collection rate that drops more than two standard deviations from its trailing 4-week average, a provider's wRVU that falls significantly below their historical baseline, an AR aging bucket that grows faster than the trend, or a payer mix shift that exceeds a defined threshold — all ranked by estimated financial impact before being surfaced to leadership.",
      },
      {
        question:
          "How is patient data protected when AI processes practice performance metrics?",
        answer:
          "The AI Insights Layer is meant to read aggregated metrics, not patient records. A typical input is a metric and its recent average, not a chart. No protected health information should be sent to an external model. If the engagement needs it, the work is done under a business associate agreement, and access stays limited to the fields the summary needs. Harine Management does not hold a HIPAA certification.",
      },
    ],
    definitionBlock:
      "The AI Insights Layer from Harine Management is an automated analytics enhancement that adds statistical anomaly detection, weekly natural language performance summaries, and predictive threshold alerts on top of an existing practice analytics infrastructure — enabling medical practice leadership to receive proactive notification of metric deviations and readable weekly performance briefings without monitoring dashboards manually or employing internal data science resources.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByAudience(audience: TargetAudience): Service[] {
  return services.filter((s) => s.targetAudience === audience);
}
