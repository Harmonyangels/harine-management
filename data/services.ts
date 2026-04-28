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
  // 1. Practice Analytics System
  // ─────────────────────────────────────────────────────────────
  {
    slug: "practice-analytics-system",
    title: "Practice Analytics System",
    shortTitle: "Practice Analytics",
    metaTitle: "Practice Analytics System | Harine Management",
    metaDescription:
      "End-to-end EHR analytics connecting Athenahealth and eClinicalWorks to Power BI executive dashboards — live in 14 days, zero manual exports.",
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
      { value: "14 days", label: "From signed agreement to first live dashboard" },
      { value: "0", label: "Manual exports required after go-live" },
      { value: "94%", label: "Average collection rate visibility across client practices" },
    ],
    faqItems: [
      {
        question:
          "What EHR systems does the Practice Analytics System work with?",
        answer:
          "The Practice Analytics System has been built and deployed for Athenahealth (athenaOne) and eClinicalWorks; it is also compatible with Kareo, DrChrono, and other platforms that support structured data export, with EHR compatibility confirmed during the discovery call at no obligation.",
      },
      {
        question:
          "Does my practice need a data team or IT staff to run this?",
        answer:
          "No — Harine Management builds and maintains the entire data pipeline, and the practice's only responsibility is opening the dashboard; there is no technical overhead on the client side after the initial 14-day implementation.",
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
          "Pipeline monitoring is included in every engagement, so Harine Management is alerted before the client is if a refresh fails; EHR updates that break a connection are diagnosed and patched at no additional cost as part of standard ongoing maintenance.",
      },
    ],
    definitionBlock:
      "The Harine Management Practice Analytics System is a fully managed EHR-to-dashboard analytics infrastructure that connects medical practice data from platforms like Athenahealth and eClinicalWorks to a daily-updated Power BI executive dashboard, implemented in 14 days and maintained on an ongoing basis with no internal data or IT resources required from the practice.",
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
      { value: "+18%", label: "Average improvement in volume visibility month-over-month" },
      { value: "Daily", label: "Data refresh cadence — no more weekly report runs" },
      { value: "< 5 min", label: "To spot a volume dip before it shows in the income statement" },
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
      { value: "MGMA", label: "Percentile ranking shown for every provider, updated quarterly" },
      { value: "Daily", label: "wRVU production refresh — not quarterly, not monthly" },
      { value: "< 30 days", label: "Typical time to identify and address an underperformance trend" },
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
      "Revenue cycle problems are invisible until they are expensive. A collection rate drifting down 2 points per quarter looks fine on a monthly summary until it doesn't. AR aging over 90 days accumulates quietly, denial rates spike and go unaddressed for weeks, and a payer mix shift that compresses margins by 8% takes a full quarter to show in financial statements — by which point the damage is structural and the recovery takes twice as long as the deterioration did.",
    solutionStatement:
      "Revenue Cycle Analytics gives medical practice finance teams a real-time view of the signals that matter — collection rates by payer, AR aging by bucket and provider, denial rates by CPT code, and net revenue per visit — built from EHR billing data and refreshed daily in Power BI. Problems that used to take a quarter to surface now show up in days, when there is still time to correct them.",
    deliverables: [
      "AR aging dashboard: current, 30, 60, 90, and 120+ day buckets by provider and payer",
      "Collection rate by payer and visit type with month-over-month trend lines",
      "Denial rate by CPT code and payer with encounter volume and dollar impact quantified",
      "Payer mix dashboard: commercial / Medicare / Medicaid / self-pay split tracked over time",
      "Net revenue per visit by payer and CPT code",
      "Reimbursement rate variance — actual amount collected vs. contracted rate by payer",
    ],
    outcomes: [
      { value: "< 30%", label: "Target AR over 90 days Harine dashboards help practices achieve" },
      { value: "94%", label: "Average collection rate across active Harine Management clients" },
      { value: "Days", label: "To surface a denial pattern — not months after the quarter closes" },
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
          "Billing data is extracted from the EHR through approved, HIPAA-compliant export mechanisms; the data pipeline flows into the client's own cloud environment, Harine Management does not retain copies of billing records or PHI, and all data architecture documentation and flow diagrams are provided as part of every engagement.",
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
      "EHR-level due diligence for PE firms acquiring medical practices — provider risk, payer mix, revenue integrity, and AR aging. Delivered in 5–10 business days.",
    heroHeadline: "Before you close, know if the revenue is real.",
    heroSubheadline:
      "EHR-level due diligence analytics for private equity firms acquiring medical practices — built from actual encounter data, not management summaries, delivered in 5 to 10 business days.",
    targetAudience: "investors",
    problemStatement:
      "Management-provided financials in a healthcare M&A process show you what leadership wants you to see. They don't show you the physician whose retirement timeline isn't in the data room, the payer mix shift that will compress margins in year one of ownership, or the AR aging that management has been managing with aggressive collection tactics that won't survive new ownership. The gap between what a practice reports and what its EHR encounter data actually shows is where deal risk lives — and standard financial due diligence doesn't reach it.",
    solutionStatement:
      "Harine Management extracts and analyzes EHR-level data from the target practice — not management summaries, not adjusted financials — and produces a structured due diligence report covering revenue integrity, provider concentration risk, payer mix trajectory, and operational benchmarking against specialty peers. The output is formatted for data rooms and investment committee presentations and delivered in 5 to 10 business days from the date data access is granted.",
    deliverables: [
      "Three-year historical volume and revenue trend analysis from raw EHR encounter data",
      "Provider concentration analysis with revenue-at-risk modeling for top 1, 2, and 3 providers",
      "Payer mix quality assessment and reimbursement trajectory projection by payer class",
      "AR aging analysis benchmarked against specialty and regional peers",
      "Denial rate and collection rate comparison vs. comparable practices nationally",
      "Deliverable-ready PDF report formatted for data rooms and investment committee presentations",
    ],
    outcomes: [
      { value: "5–10 days", label: "From data access grant to final deliverable" },
      { value: "EHR-level", label: "Data sourcing — encounter records, not management financials" },
      { value: "IC-ready", label: "Report format built for investment committee presentations" },
    ],
    faqItems: [
      {
        question: "How long does healthcare due diligence analytics take?",
        answer:
          "A standard Harine Management healthcare due diligence analytics engagement is delivered within 5 to 10 business days from the date data access is granted to the target practice's EHR and billing systems; for time-sensitive situations — LOI expirations, accelerated closing timelines, or competitive bid processes — expedited engagements with 48 to 72-hour turnarounds are available, with availability confirmed at engagement kickoff.",
      },
      {
        question: "What EHR systems do you work with?",
        answer:
          "Harine Management's due diligence analytics engagements are EHR-agnostic — analysis has been conducted on practices running Athenahealth, eClinicalWorks, Epic, Kareo, Greenway Health, and other platforms; the primary requirement is that the EHR support structured data export, which all major ambulatory platforms do, and the specific extraction approach is confirmed during engagement scoping based on the target practice's system.",
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
      "Healthcare Due Diligence Analytics from Harine Management is a pre-close data analysis service for private equity firms and healthcare investors that extracts and analyzes EHR encounter and billing data from target medical practices — validating revenue integrity, quantifying provider concentration risk, assessing payer mix quality, and delivering a structured analytical report in 5 to 10 business days that is ready for data rooms and investment committee review.",
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
      "A practice that does not benchmark only knows its own trend — whether things are getting better or worse relative to yesterday, not relative to the market. A 94% collection rate sounds strong until you discover that practices of your specialty and size in your region average 96.5%. A wRVU per provider that grew 8% year over year looks like progress until MGMA benchmarking places it at the 28th percentile. Without external context, a practice cannot distinguish genuine performance from merely stable mediocrity.",
    solutionStatement:
      "Practice Performance Scoring assigns a structured, domain-level score across five operational dimensions — volume, revenue cycle health, provider productivity, billing efficiency, and payer mix quality — benchmarked against MGMA national data and Harine Management's regional client dataset. The output is a scored assessment with domain breakdowns and a prioritized list of improvement opportunities ranked by estimated financial impact.",
    deliverables: [
      "Five-domain performance score: volume, revenue cycle, provider productivity, billing efficiency, payer mix",
      "MGMA percentile ranking for wRVU per provider and revenue per visit at 25th, 50th, and 75th percentile",
      "Regional peer benchmarking for collection rate, AR aging, and denial rate",
      "Payer mix quality score relative to specialty standard and regional mix",
      "Prioritized improvement opportunity summary with estimated annual financial impact per gap",
      "Quarterly re-score cadence to measure improvement against initial baseline",
    ],
    outcomes: [
      { value: "5 domains", label: "Scored: volume, RCM, productivity, billing, payer mix" },
      { value: "MGMA + regional", label: "Dual benchmarking against national and local peer data" },
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
          "MGMA benchmarking covers physician compensation and some productivity metrics but does not assess a practice holistically across revenue cycle health, billing efficiency, and payer mix composition; Harine Management's scoring integrates EHR-derived operational data with MGMA standards and regional peer data to produce a single structured assessment covering the full financial and operational picture in one deliverable.",
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
          "The initial practice performance score is delivered within 10 business days of data access; for practices that are existing Harine Management analytics clients, the score can be generated from the existing data pipeline in 3 to 5 business days because the underlying data extraction is already in place.",
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
      "Analytics infrastructure for PE-backed practices post-close — KPI baselines in 30 days, portfolio reporting standardized, early-warning dashboards live.",
    heroHeadline: "You closed the deal. Now build the measurement layer.",
    heroSubheadline:
      "Post-acquisition analytics infrastructure for PE-backed medical practices — baseline KPIs established in 30 days, reporting standardized to portfolio cadence, and early-warning dashboards running before the first board meeting.",
    targetAudience: "investors",
    problemStatement:
      "Most medical practice acquisitions close without functioning analytics infrastructure. The practice has been running on a relationship with its billing company, tribal knowledge, and a practice manager who knows where everything is. Post-close, the PE firm needs operational visibility the practice has never had to provide before — and building that infrastructure while simultaneously managing a new ownership transition and a value creation plan is an operational challenge that derails integration timelines and delays EBITDA improvement by a full quarter or more.",
    solutionStatement:
      "Post-Acquisition Intelligence is Harine Management's dedicated service for the 90 days following a healthcare acquisition close — building the EHR data pipeline, establishing baseline KPIs, standardizing reporting to portfolio requirements, and standing up early-warning dashboards before the first board meeting. The goal is to have the measurement infrastructure operational before the first operational improvement initiative begins, so there is a baseline to measure against.",
    deliverables: [
      "Post-close EHR data pipeline build, operational within 14 days of data access",
      "Month 1 baseline KPI report: volume, revenue, provider productivity, collection rate, and AR aging",
      "Standardized monthly reporting package aligned with PE portfolio reporting cadence and format",
      "Early-warning KPI monitoring with threshold alerts for metric deterioration in real time",
      "Multi-practice portfolio dashboard for firms with more than one healthcare holding",
      "Month 3 and Month 6 milestone reports with variance analysis vs. acquisition-date baseline",
    ],
    outcomes: [
      { value: "30 days", label: "Target for baseline analytics infrastructure to be operational post-close" },
      { value: "Month 1", label: "First baseline KPI report delivered after acquisition close" },
      { value: "Portfolio-ready", label: "Reporting standardized to PE portfolio cadence from day one" },
    ],
    faqItems: [
      {
        question:
          "Why does post-acquisition analytics infrastructure matter in the first 30 days?",
        answer:
          "The first 30 days post-close establish the operational baseline that all future performance measurement is compared against; practices that go live with analytics infrastructure in the first month can identify revenue cycle deterioration, provider productivity gaps, and volume declines weeks earlier than those that spend the first quarter building their own reporting — and earlier identification means earlier correction and less EBITDA erosion during the critical ownership transition period.",
      },
      {
        question:
          "What if the acquired practice has no data infrastructure or reporting history?",
        answer:
          "The majority of Harine Management's post-acquisition engagements begin with a practice that has no formal analytics infrastructure; the engagement starts with an EHR data assessment and capability review, then builds the extraction pipeline, structures the historical data, and delivers the first baseline report — the practice does not need pre-existing reporting infrastructure for Harine Management to get started.",
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
      "Post-Acquisition Intelligence from Harine Management is a healthcare analytics service for private equity firms that establishes EHR data pipelines, baseline KPI reporting, and early-warning dashboards for newly acquired medical practices within the first 30 days post-close — providing the operational measurement infrastructure that portfolio management and value creation initiatives require from day one of ownership.",
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
      { value: "< 2 min", label: "Weekly AI summary consumption time for practice leadership" },
      { value: "Proactive", label: "Alerts fire before the metric crosses a critical threshold" },
      { value: "Zero", label: "Additional data science or BI resources required from the practice" },
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
          "The AI Insights Layer analyzes aggregated, de-identified performance metrics — not individual patient records or PHI; the system receives inputs like 'collection rate this week: 91.2%, prior 4-week average: 94.1%' rather than any patient-level information, all processing occurs within HIPAA-compliant architecture, and no PHI touches any external AI service.",
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
