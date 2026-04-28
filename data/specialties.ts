export interface SpecialtyOutcome {
  value: string;
  label: string;
}

export interface SpecialtyFaqItem {
  question: string;
  answer: string;
}

export interface Specialty {
  slug: string;
  title: string;
  shortTitle: string;
  /** Keep under 60 characters. Canonical page: https://harinemanagement.com/specialties/[slug] */
  metaTitle: string;
  /** Keep under 160 characters. */
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  /** 2–3 sentences describing the exact billing and operational pain this specialty faces. */
  problemStatement: string;
  /** 2–3 sentences describing what Harine Management delivers for this specialty. */
  solutionStatement: string;
  /** 4–6 concrete deliverables specific to this specialty. */
  deliverables: string[];
  /** Exactly 3 outcome stats. */
  outcomes: [SpecialtyOutcome, SpecialtyOutcome, SpecialtyOutcome];
  /** 4 FAQ items targeting the exact questions AI engines surface for this specialty. */
  faqItems: [
    SpecialtyFaqItem,
    SpecialtyFaqItem,
    SpecialtyFaqItem,
    SpecialtyFaqItem,
  ];
  /** 1–2 sentence definition written to directly answer "What is [specialty] analytics?" */
  definitionBlock: string;
}

export const specialties: Specialty[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. Urgent Care Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "urgent-care-analytics",
    title: "Urgent Care Analytics",
    shortTitle: "Urgent Care",
    metaTitle: "Urgent Care Data Analytics | Harine Management",
    metaDescription:
      "Real-time urgent care dashboards covering door-to-provider time, hourly occupancy, shift productivity, and payer mix — built from your EHR data, updated daily.",
    heroHeadline: "Run your urgent care on data, not gut feel.",
    heroSubheadline:
      "Hourly occupancy, door-to-provider time, shift-level productivity, and payer mix — all pulled from your EHR and surfaced in a dashboard your ops team checks before the first shift starts.",
    problemStatement:
      "Urgent care operations run on throughput, but most urgent care groups have no real-time visibility into the metrics that actually drive it. Staffing decisions are made on last week's volume, occupancy spikes go undetected until the waiting room is full, and payer mix shifts — particularly rising self-pay — don't show up in financial statements until the quarter is over and the damage is already done. Claim denial rates on X-ray, lab, and procedure bundles often run 3–5 points higher than owners realize because no one is watching CPT-level denial patterns across shifts.",
    solutionStatement:
      "Harine Management's Urgent Care Analytics service connects your EHR to a daily-refreshed Power BI dashboard purpose-built for urgent care operations — tracking hourly and daily patient volume, door-to-provider time trends, shift-level provider productivity, payer mix, and denial patterns by CPT code and facility. Leadership gets the operational intelligence needed to staff correctly, bill cleanly, and catch payer mix deterioration before it reaches the income statement.",
    deliverables: [
      "Hourly patient volume by location with peak-hour trend visualization",
      "Door-to-provider time tracking by provider, shift, and day of week",
      "Shift-level provider productivity — encounters, wRVUs, and revenue per shift",
      "Payer mix dashboard: commercial, Medicare, Medicaid, and self-pay tracked over time",
      "CPT-level denial rate by facility with dollar impact and top denial reason codes",
      "Month-over-month and year-over-year volume trend with variance alerts",
    ],
    outcomes: [
      { value: "Daily", label: "Occupancy and volume refresh — not last week, today" },
      { value: "Shift", label: "Granularity for provider productivity — not just monthly totals" },
      { value: "< 7 days", label: "To surface a payer mix shift before it hits the P&L" },
    ],
    faqItems: [
      {
        question: "How does data analytics work for urgent care practices?",
        answer:
          "Urgent care analytics connects directly to the practice's EHR — Athenahealth, eClinicalWorks, or other platforms — and extracts encounter-level data including visit timestamps, CPT codes, payer information, and provider assignment; this data is structured into a daily-updated Power BI dashboard that tracks operational metrics like door-to-provider time, hourly occupancy, and shift productivity alongside financial metrics like payer mix, collection rate, and denial rates, giving urgent care leadership a real-time operational picture without any manual reporting.",
      },
      {
        question: "What metrics matter most for urgent care practices?",
        answer:
          "The most operationally critical metrics for urgent care groups are door-to-provider time (the primary throughput lever), hourly patient volume by location (drives staffing decisions), payer mix trend (self-pay growth compresses margins faster than most other specialties), CPT-level denial rates (X-ray, lab, and procedure bundles are the highest-risk billing categories in urgent care), and shift-level provider productivity measured in encounters and wRVUs (the basis for shift staffing optimization and provider compensation).",
      },
      {
        question: "Can urgent care analytics track multiple locations in a single dashboard?",
        answer:
          "Yes — Harine Management's urgent care dashboards are specifically designed for multi-site urgent care groups, with location-level segmentation so operators can see volume, occupancy, payer mix, and denial rates for each site independently while also viewing a consolidated roll-up across the network; location comparisons surface performance gaps and staffing inefficiencies that are invisible when all sites are aggregated.",
      },
      {
        question: "How are denial patterns tracked for urgent care billing?",
        answer:
          "Denial analytics for urgent care are built from the claim-level billing data in the EHR, with each denial categorized by CPT code, denial reason code, payer, and facility; the dashboard shows denial rate as a percentage of encounters billed, dollar value of denied claims, and trend over time — so billing teams can identify whether a spike in denials is driven by a specific CPT code, a specific payer's policy change, or a documentation gap at a particular location.",
      },
    ],
    definitionBlock:
      "Urgent care analytics is a data intelligence service that extracts operational and financial data from urgent care EHR systems and delivers it as a real-time dashboard covering hourly patient volume, door-to-provider throughput time, shift-level provider productivity, payer mix, and CPT-level claim denial rates — giving urgent care operators the visibility to staff correctly, catch revenue cycle problems early, and compare performance across locations without manual reporting.",
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Primary Care Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "primary-care-analytics",
    title: "Primary Care Analytics",
    shortTitle: "Primary Care",
    metaTitle: "Primary Care Data Analytics | Harine Management",
    metaDescription:
      "Panel management, AWV capture rates, quality measure tracking, and revenue analytics for primary care — connected from your EHR to Power BI, updated daily.",
    heroHeadline: "See your panel clearly. Capture what you've earned.",
    heroSubheadline:
      "Annual wellness visit capture rates, chronic disease panel gaps, quality bonus attainment, and provider productivity — all pulled from your EHR and updated daily so your leadership never makes a population health decision on stale data.",
    problemStatement:
      "Primary care practices are sitting on quality bonus revenue they cannot claim because they have no systematic view of which patients are due for annual wellness visits, which chronic disease panels have care gaps, or how close each provider is to hitting payer-specific quality thresholds. MIPS scores and value-based contract performance are calculated retroactively from data that is rarely visible in real time, and by the time a practice realizes it has missed a quality threshold, the performance period is already closed. Separately, new-to-established patient mix and visit type trends that signal patient panel attrition go undetected until volume has already fallen.",
    solutionStatement:
      "Harine Management's Primary Care Analytics service builds a real-time dashboard from your EHR data covering panel management, AWV capture rates, quality measure progress, payer mix, and provider productivity — giving practice administrators and CMOs daily visibility into the financial and quality metrics that primary care reimbursement increasingly depends on. Care gap lists, AWV gap reports, and quality threshold progress are surfaced in a format leadership can act on before the performance window closes.",
    deliverables: [
      "Annual wellness visit capture rate by provider, payer, and month with gap patient lists",
      "Chronic disease panel management view: identified gaps by condition and care plan completion",
      "Quality measure progress dashboard with payer-specific threshold tracking",
      "New-to-established patient ratio trend by provider and location",
      "Provider productivity: wRVUs, encounter volume, and revenue per visit by visit type",
      "Payer mix by volume and revenue with value-based contract patient identification",
    ],
    outcomes: [
      { value: "AWV", label: "Capture rate visibility updated daily — not at year-end" },
      { value: "Real-time", label: "Quality measure progress against payer-specific thresholds" },
      { value: "< 14 days", label: "From EHR connection to first live care gap dashboard" },
    ],
    faqItems: [
      {
        question: "How does analytics work for primary care practices?",
        answer:
          "Primary care analytics connects to the practice's EHR — Athenahealth, eClinicalWorks, or other platforms — and extracts encounter data, diagnosis codes, procedure codes, payer information, and appointment records to build a daily-updated dashboard covering panel management, quality measure performance, AWV capture rates, provider productivity, and revenue cycle metrics; the system gives primary care leadership a real-time view of both the clinical and financial performance drivers that determine reimbursement under increasingly value-based contracts.",
      },
      {
        question: "What metrics matter most for primary care practices?",
        answer:
          "The highest-impact metrics for primary care are annual wellness visit capture rate (a direct revenue line item under Medicare Advantage and commercial value-based contracts), chronic disease care gap closure rate (drives quality bonus payments), new-to-established patient ratio (an early indicator of panel attrition or growth), provider wRVU productivity (the basis for compensation and staffing), and payer mix trend (value-based payers reward quality; fee-for-service payers reward volume — the mix determines which metrics to optimize first).",
      },
      {
        question: "Can primary care analytics track quality measure performance for MIPS and value-based contracts?",
        answer:
          "Yes — where quality measure numerator and denominator data is captured in the EHR at the encounter or patient level, Harine Management can build measure-level dashboards showing attainment percentage, patients counted toward the measure, and gap patients still needing qualifying encounters; the specific measures tracked are configured to match the practice's active payer contracts and MIPS reporting requirements during the initial engagement.",
      },
      {
        question: "How does AWV capture rate tracking work in the primary care dashboard?",
        answer:
          "Annual wellness visit capture rate is calculated from the payer-specific AWV CPT codes (G0438 for initial, G0439 for subsequent Medicare AWV, plus equivalent codes for commercial payers) recorded in the EHR against the eligible patient panel; the dashboard shows capture rate by provider and payer, surfaces which patients are eligible but have not had an AWV in the current performance year, and tracks month-over-month progress so the practice can run targeted outreach before the year-end deadline.",
      },
    ],
    definitionBlock:
      "Primary care analytics is a data intelligence service that extracts clinical and financial data from primary care EHR systems and delivers daily dashboards covering annual wellness visit capture rates, chronic disease panel care gaps, quality measure attainment, provider productivity, and payer mix — giving primary care practices the real-time visibility needed to capture quality bonus revenue and manage population health performance under value-based contracts.",
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Multi-Location Practice Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "multi-location-practice-analytics",
    title: "Multi-Location Practice Analytics",
    shortTitle: "Multi-Location",
    metaTitle: "Multi-Location Practice Analytics | Harine Management",
    metaDescription:
      "Cross-location benchmarking, provider performance comparison, and consolidated EHR reporting for multi-site medical groups — in a single Power BI dashboard.",
    heroHeadline: "One dashboard across every location, every provider.",
    heroSubheadline:
      "Consolidated volume, revenue, payer mix, and provider productivity across your entire network — with location-level drill-down that shows you exactly where performance is diverging before it costs you.",
    problemStatement:
      "Multi-location medical groups are making network-wide decisions without network-wide visibility. Each location runs its own EHR reports, exports its own spreadsheets, and submits its own monthly summaries — and by the time leadership assembles a consolidated picture, it is three weeks old, inconsistently formatted, and missing the provider-level data needed to understand why one site is underperforming. There is no apples-to-apples comparison across locations, no early warning when a site's payer mix shifts, and no way to see which providers are carrying volume gaps at which sites without manually requesting reports from each office.",
    solutionStatement:
      "Harine Management builds a single consolidated analytics infrastructure that connects to every EHR instance across your network and delivers a unified Power BI dashboard with standardized metrics across all locations. Leadership sees total network performance at the top, drills to any site, and compares providers across locations on the same wRVU, volume, revenue, and payer mix definitions — with daily data refresh and no human assembly required.",
    deliverables: [
      "Network-wide consolidated dashboard with location-level and provider-level drill-down",
      "Cross-location benchmarking: volume, wRVU productivity, collection rate, and payer mix compared by site",
      "Provider performance comparison across locations — same metric definitions, apples-to-apples",
      "Payer mix by location with commercial, Medicare, Medicaid, and self-pay tracked independently",
      "Staffing and capacity utilization comparison across sites by day of week and visit type",
      "Automated daily consolidation of EHR data from multiple instances or platforms",
    ],
    outcomes: [
      { value: "1 view", label: "For your entire network — not one spreadsheet per location" },
      { value: "Daily", label: "Cross-location consolidation — no manual assembly" },
      { value: "All sites", label: "On identical metric definitions — true apples-to-apples" },
    ],
    faqItems: [
      {
        question: "How does analytics work for multi-location medical practices?",
        answer:
          "Multi-location practice analytics connects to the EHR instances at each site — whether they share a single EHR tenant or run separate instances — and consolidates encounter, provider, billing, and payer data into a unified data layer that feeds a single Power BI dashboard; each location's data is normalized to the same metric definitions so leadership can compare volume, revenue, provider productivity, and payer mix across sites without inconsistent manual reports, and all locations refresh on the same daily cadence so the consolidated view is always current.",
      },
      {
        question: "What metrics matter most for multi-location medical groups?",
        answer:
          "The most strategically valuable metrics for multi-location groups are cross-location wRVU productivity comparison (reveals which sites have underperforming providers or unfilled capacity), payer mix by location (sites in different geographies often have different commercial/Medicaid ratios that drive margin differences leadership may not fully see), new patient volume by site (an early indicator of which locations are growing or losing market share), collection rate by location (identifies billing execution gaps at specific sites), and provider productivity versus staffed hours (surfaces capacity waste before it becomes a staffing cost problem).",
      },
      {
        question: "Can the dashboard handle locations running on different EHR platforms?",
        answer:
          "Yes — Harine Management's multi-location data pipeline is specifically designed to handle heterogeneous EHR environments; where one location runs Athenahealth and another runs eClinicalWorks, the pipeline extracts from each system independently and maps the data to a common schema before loading it into the consolidated dashboard, so leadership sees uniform metrics regardless of which EHR each site uses.",
      },
      {
        question: "How long does it take to connect all locations to the consolidated dashboard?",
        answer:
          "Implementation timeline scales with the number of locations and EHR platforms involved; a network of two to four locations on a single EHR platform typically goes live in 14 to 21 days, while a network of six to ten locations with mixed EHR environments typically runs 21 to 35 days; Harine Management handles the full data engineering for each location and delivers a phased rollout so the highest-priority locations go live first while remaining sites are connected in sequence.",
      },
    ],
    definitionBlock:
      "Multi-location practice analytics is a healthcare data consolidation and intelligence service that connects EHR systems across every site in a medical group network — including groups running different EHR platforms — and delivers a single daily-updated Power BI dashboard with standardized volume, revenue, provider productivity, and payer mix metrics across all locations, enabling leadership to compare site performance on identical definitions and identify gaps without manual report assembly.",
  },

  // ─────────────────────────────────────────────────────────────
  // 4. Behavioral Health Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "behavioral-health-analytics",
    title: "Behavioral Health Analytics",
    shortTitle: "Behavioral Health",
    metaTitle: "Behavioral Health Data Analytics | Harine Management",
    metaDescription:
      "Session attendance rates, no-show tracking, denial rate analytics, and revenue cycle visibility for behavioral health practices — built from your EHR data.",
    heroHeadline: "Your billing is complex. Your dashboard shouldn't be.",
    heroSubheadline:
      "No-show rates, session attendance, prior auth denial patterns, and therapist productivity — pulled from your EHR and surfaced daily so your practice can focus on care instead of chasing data.",
    problemStatement:
      "Behavioral health practices carry the highest no-show rates of any outpatient specialty — often 20–35% — but most have no systematic view of which therapists, payer panels, or patient populations are driving the pattern. Revenue cycle in behavioral health is unusually complex: prior authorization burden is high, insurance denial rates on CPT codes 90834 and 90837 run well above other specialties, H-code billing for community mental health adds a separate billing layer, and sliding-scale or self-pay patients require revenue tracking that most EHR reports cannot handle cleanly. The result is that behavioral health group practice administrators are making decisions about therapist caseloads, intake scheduling, and payer contracting on data that is weeks old and manually assembled.",
    solutionStatement:
      "Harine Management builds behavioral health-specific analytics dashboards that surface no-show rate by therapist, payer, and appointment type; session productivity against contracted hours; prior authorization denial rates by payer and CPT code; and revenue per session by payer — connected directly to your EHR and refreshed daily in Power BI. Practice administrators get the visibility to manage therapist caseloads, prioritize intake, and monitor payer performance without a single manual export.",
    deliverables: [
      "No-show and cancellation rate by therapist, payer, appointment type, and day of week",
      "Session attendance rate and therapist caseload utilization against contracted hours",
      "Prior authorization denial rate by payer, CPT code, and therapist with denial reason breakdown",
      "Revenue per session by payer: commercial, Medicare, Medicaid, self-pay, and sliding scale",
      "New patient intake rate and referral source volume by month",
      "Therapist productivity dashboard: sessions delivered, revenue generated, and payer mix per provider",
    ],
    outcomes: [
      { value: "No-show", label: "Rate visible by therapist and payer — not just practice-wide" },
      { value: "Daily", label: "Session and revenue refresh — no more weekly manual summaries" },
      { value: "CPT-level", label: "Denial tracking across all behavioral health billing codes" },
    ],
    faqItems: [
      {
        question: "How does analytics work for behavioral health practices?",
        answer:
          "Behavioral health analytics connects to the practice's EHR — Athenahealth, eClinicalWorks, SimplePractice, or other platforms — and extracts appointment, session, billing, and payer data to build dashboards covering the operational and financial metrics specific to outpatient mental health and behavioral health; the system tracks no-show rates, session attendance, prior authorization and denial rates on behavioral health CPT codes, therapist productivity against contracted hours, and revenue per session by payer — with a daily refresh so practice administrators always have a current picture without manual reporting.",
      },
      {
        question: "What metrics matter most for behavioral health practices?",
        answer:
          "The highest-impact metrics for behavioral health group practices are no-show rate by therapist and payer (the single largest controllable lever on revenue capture), session attendance rate versus contracted therapist hours (identifies caseload underutilization before it compounds), prior authorization denial rate by payer and CPT code (90834 and 90837 denial rates are typically the largest single source of behavioral health revenue leakage), revenue per session by payer (highlights which payer contracts are underperforming on reimbursement relative to session length billed), and new patient intake volume (the forward-looking indicator of practice growth or attrition).",
      },
      {
        question: "Can behavioral health analytics track both insurance-billed and self-pay or sliding-scale sessions?",
        answer:
          "Yes — where the EHR records self-pay and sliding-scale sessions with a distinct payer or fee-schedule designation, Harine Management's behavioral health dashboard tracks insurance-billed and self-pay sessions separately, with revenue per session calculated for each category; this allows practice administrators to see the true payer mix including self-pay volume, monitor sliding-scale discount rates, and understand the margin difference between insurance-billed and self-pay panels without any manual calculation.",
      },
      {
        question: "How are prior authorization denials tracked in behavioral health billing?",
        answer:
          "Prior authorization denial analytics are built from the claim-level denial data in the EHR billing module, with each denial tagged by CPT code (90834, 90837, 90847, and others), payer, therapist, and denial reason code; the dashboard shows denial rate as a percentage of sessions billed, dollar value of denied claims, and trend over time — so practice administrators can identify whether denials are concentrated at a specific payer, triggered by a particular CPT code or session length, or concentrated with specific therapists whose documentation may require attention.",
      },
    ],
    definitionBlock:
      "Behavioral health analytics is a data intelligence service that extracts appointment, session, and billing data from behavioral health EHR systems and delivers daily dashboards covering no-show rates, session attendance, therapist productivity, prior authorization denial patterns, and revenue per session by payer — giving behavioral health group practices the operational visibility to manage caseloads, reduce revenue leakage, and monitor payer performance without manual reporting.",
  },

  // ─────────────────────────────────────────────────────────────
  // 5. Orthopedics Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "orthopedics-analytics",
    title: "Orthopedics Analytics",
    shortTitle: "Orthopedics",
    metaTitle: "Orthopedics Data Analytics | Harine Management",
    metaDescription:
      "Surgical vs. conservative care revenue, wRVU productivity, ASC performance, implant cost tracking, and denial analytics for orthopedic practices.",
    heroHeadline: "High-wRVU specialty. High-stakes data.",
    heroSubheadline:
      "Surgical mix, procedure revenue, ASC versus office visit split, implant cost variance, and prior auth denial rates — all built from your EHR and updated daily so your practice leadership always knows where the revenue is and where it is leaking.",
    problemStatement:
      "Orthopedic practices carry some of the highest wRVU productivity in ambulatory care, but the complexity of their billing — surgical procedures, office E&M, ASC facility fees, implant cost passthrough, and bundled payment arrangements — means that revenue cycle problems are harder to detect and more expensive when they surface. Prior authorization denial rates on imaging and elective surgical procedures run consistently higher than other specialties, and most orthopedic group administrators have no systematic view of which CPT codes, which surgeons, or which procedures are accumulating denials. Separately, the surgical-versus-conservative-care revenue mix is a critical practice management metric that most groups can only estimate because their EHR reporting cannot isolate procedure revenue by care pathway.",
    solutionStatement:
      "Harine Management builds orthopedics-specific analytics dashboards that surface surgeon wRVU productivity, surgical versus conservative care revenue mix, ASC procedure volume and revenue, prior authorization denial rates by CPT code and payer, and implant cost variance — connected to your EHR and updated daily in Power BI. Practice administrators and managing partners get the financial intelligence to manage surgeon productivity, monitor billing compliance, and negotiate payer contracts from a position of data.",
    deliverables: [
      "Surgeon wRVU production by month with MGMA orthopedic specialty benchmarking",
      "Surgical versus conservative care revenue mix by surgeon and practice total",
      "ASC procedure volume and revenue versus in-office procedure revenue — split by CPT code",
      "Prior authorization denial rate by procedure CPT code, payer, and surgeon",
      "Implant cost tracking by case type and surgeon where EHR data supports cost capture",
      "New patient referral volume and referral source tracking by surgeon and location",
    ],
    outcomes: [
      { value: "wRVU", label: "Tracked daily per surgeon — not at quarterly compensation review" },
      { value: "CPT-level", label: "Denial analytics across surgical and diagnostic codes" },
      { value: "ASC vs.", label: "Office revenue split visible in real time — not estimated" },
    ],
    faqItems: [
      {
        question: "How does analytics work for orthopedic practices?",
        answer:
          "Orthopedics analytics connects to the practice's EHR — Athenahealth, eClinicalWorks, or other platforms — and extracts encounter, procedure, billing, and payer data to build dashboards covering the high-complexity financial metrics specific to orthopedic groups; the system tracks surgeon wRVU productivity against MGMA benchmarks, surgical procedure revenue by CPT code, prior authorization denial rates on imaging and surgical procedures, ASC versus in-office revenue splits, and payer mix — with a daily refresh so managing partners have current data without waiting for monthly financial reports.",
      },
      {
        question: "What metrics matter most for orthopedic practices?",
        answer:
          "The highest-impact metrics for orthopedic group practices are surgeon wRVU productivity versus MGMA specialty benchmarks (the basis for compensation fairness and surgeon management conversations), prior authorization denial rate by procedure CPT code and payer (imaging and elective surgical procedure denials are the largest controllable revenue leakage category in orthopedics), surgical versus conservative care revenue mix by surgeon (a critical indicator of practice pattern variation and reimbursement sustainability), new patient referral volume by referral source (the forward-looking growth metric for surgical practices), and ASC versus in-office procedure revenue (determines whether ASC investment is generating the expected incremental revenue).",
      },
      {
        question: "Can orthopedics analytics track bundled payment performance?",
        answer:
          "Yes — where the practice participates in CMS bundled payment programs such as BPCI Advanced or commercial payer bundled arrangements for joint replacement or spine procedures, Harine Management can build episode-level dashboards that track cases attributed to each bundle, clinical resource utilization versus bundle target, and margin per episode; the specific metrics and episode definitions are configured to match the practice's active bundled payment contracts during the implementation engagement.",
      },
      {
        question: "How are imaging denial rates tracked in orthopedics billing?",
        answer:
          "Imaging denial analytics in orthopedics are built from the claim-level denial data in the EHR billing module, with denials tagged by CPT code (MRI, CT, and X-ray codes separately), ordering surgeon, payer, and denial reason code; the dashboard tracks denial rate as a percentage of imaging orders billed, dollar value denied, and trend over time — enabling the practice to identify whether imaging denials are driven by a specific payer's prior authorization policy, a documentation gap in the ordering workflow, or a concentration with specific CPT codes or specific surgeons.",
      },
    ],
    definitionBlock:
      "Orthopedics analytics is a data intelligence service that extracts procedure, billing, and productivity data from orthopedic EHR systems and delivers daily dashboards covering surgeon wRVU productivity versus MGMA benchmarks, surgical versus conservative care revenue mix, ASC procedure performance, prior authorization denial rates by CPT code, and payer mix — giving orthopedic group practices and their managing partners the financial intelligence to manage surgeon productivity and revenue cycle performance without manual reporting.",
  },

  // ─────────────────────────────────────────────────────────────
  // 6. Cardiology Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "cardiology-analytics",
    title: "Cardiology Analytics",
    shortTitle: "Cardiology",
    metaTitle: "Cardiology Data Analytics | Harine Management",
    metaDescription:
      "Diagnostic procedure volume, interventional vs. non-interventional revenue mix, technical component billing, and denial analytics for cardiology practices.",
    heroHeadline: "Cardiology billing is layered. Your dashboard should cut through it.",
    heroSubheadline:
      "Echo volume, stress test productivity, interventional versus non-interventional revenue, technical and professional component splits, and denial rates by CPT code — all current, all from your EHR, all in one place.",
    problemStatement:
      "Cardiology group practices operate across multiple revenue streams simultaneously — office E&M, diagnostic procedure volume (echocardiograms, stress tests, nuclear imaging), and interventional procedures — each with distinct payer reimbursement rates, prior authorization requirements, and denial patterns. Technical and professional component billing adds another layer of complexity that most cardiology administrators cannot track cleanly without manual assembly. Denial rates on diagnostic cardiology CPT codes are among the highest in ambulatory care, driven by evolving payer medical necessity criteria, and most groups have no real-time view of which procedures, which cardiologists, or which payer contracts are accumulating denials until the monthly billing report arrives.",
    solutionStatement:
      "Harine Management builds cardiology-specific analytics dashboards that surface diagnostic procedure volume and revenue by CPT code, interventional versus non-interventional revenue mix by cardiologist, technical and professional component billing split, prior authorization denial rates by procedure and payer, and physician productivity against MGMA cardiology benchmarks — connected directly to your EHR and updated daily in Power BI. Group administrators and managing physicians get the revenue intelligence needed to manage the practice's most complex billing categories without waiting for end-of-month statements.",
    deliverables: [
      "Diagnostic procedure volume by CPT code: echo, stress test, nuclear, and Holter studies",
      "Interventional versus non-interventional revenue split by cardiologist and practice total",
      "Technical and professional component billing breakdown where applicable",
      "Prior authorization denial rate by diagnostic CPT code and payer with denial reason analysis",
      "Cardiologist wRVU productivity with MGMA cardiovascular disease specialty benchmarking",
      "Payer mix by procedure category — commercial versus Medicare versus Medicare Advantage",
    ],
    outcomes: [
      { value: "CPT-level", label: "Diagnostic procedure denial rates tracked in real time" },
      { value: "Daily", label: "Procedure volume and revenue refresh — not monthly billing summaries" },
      { value: "TC/PC", label: "Component billing split visible by procedure and cardiologist" },
    ],
    faqItems: [
      {
        question: "How does analytics work for cardiology practices?",
        answer:
          "Cardiology analytics connects to the practice's EHR — Athenahealth, eClinicalWorks, or other platforms — and extracts encounter, procedure, billing, and payer data to build dashboards covering the revenue complexity specific to cardiology groups; the system tracks diagnostic procedure volume and revenue by CPT code, interventional versus non-interventional revenue mix, technical and professional component billing splits, prior authorization denial rates by procedure and payer, and cardiologist wRVU productivity — with a daily refresh so group administrators have current revenue intelligence without manual billing report assembly.",
      },
      {
        question: "What metrics matter most for cardiology practices?",
        answer:
          "The highest-impact metrics for cardiology group practices are diagnostic procedure volume by CPT code (echo, stress test, nuclear imaging, and event monitoring each carry different reimbursement profiles and denial risk), prior authorization denial rate by diagnostic procedure and payer (denial rates on cardiac diagnostic procedures are among the highest in ambulatory care and represent the largest controllable revenue leakage), interventional versus non-interventional revenue mix (determines the overall revenue profile and payer contract priorities for the group), cardiologist wRVU productivity versus MGMA cardiovascular disease benchmarks (the basis for compensation and staffing decisions), and Medicare Advantage versus traditional Medicare mix (Medicare Advantage plans apply significantly more prior authorization burden on diagnostic cardiology procedures).",
      },
      {
        question: "Can cardiology analytics track both the technical and professional components of diagnostic procedures?",
        answer:
          "Yes — where the EHR records technical and professional component billing separately (using TC and 26 modifiers on the relevant CPT codes), Harine Management's cardiology dashboard tracks revenue from each component independently, by procedure type and cardiologist; this allows group administrators to see the full revenue contribution of the practice's diagnostic equipment — echocardiography equipment, nuclear camera, treadmill — separately from the professional reading revenue generated by each physician.",
      },
      {
        question: "How are prior authorization denials tracked in cardiology billing?",
        answer:
          "Prior authorization denial analytics for cardiology are built from claim-level denial data in the EHR billing module, with each denial tagged by CPT code, cardiologist, payer, and CMS denial reason code; the dashboard shows denial rate as a percentage of procedures billed, dollar value of denied claims, top denial reasons, and trend over time — enabling the group to identify whether denial spikes are driven by a specific payer's tightened medical necessity criteria, a documentation gap in the pre-authorization workflow, or a concentration with specific diagnostic procedure types.",
      },
    ],
    definitionBlock:
      "Cardiology analytics is a data intelligence service that extracts procedure, billing, and productivity data from cardiology EHR systems and delivers daily dashboards covering diagnostic procedure volume by CPT code, interventional versus non-interventional revenue mix, technical and professional component billing splits, prior authorization denial rates, and cardiologist wRVU productivity — giving cardiology group practices real-time visibility into their most complex revenue streams without manual report assembly.",
  },

  // ─────────────────────────────────────────────────────────────
  // 7. Gastroenterology Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "gastroenterology-analytics",
    title: "Gastroenterology Analytics",
    shortTitle: "Gastroenterology",
    metaTitle: "Gastroenterology Analytics | Harine Management",
    metaDescription:
      "Colonoscopy volume, screening vs. diagnostic billing, ASC procedure revenue, and denial analytics for gastroenterology practices — updated daily from your EHR.",
    heroHeadline: "Procedure volume is only the start. Revenue tells the real story.",
    heroSubheadline:
      "Colonoscopy volume, screening versus diagnostic billing splits, polyp detection rates, ASC procedure revenue, and denial patterns by CPT code — pulled from your EHR daily so your GI group never flies blind on its most important revenue lines.",
    problemStatement:
      "Gastroenterology practices derive a significant portion of revenue from endoscopic procedures, but the billing distinction between screening and diagnostic colonoscopies creates ongoing revenue leakage that most GI groups cannot systematically track. When a screening colonoscopy converts to a diagnostic procedure — because a polyp is found — the reimbursement rate, patient cost-sharing, and prior authorization status all change, and the billing adjustment must be made correctly at the time of service or the claim will be denied or under-reimbursed. GI groups also operate across office and ASC settings with different reimbursement structures, and most administrators have no real-time view of procedure volume, revenue by setting, or denial rates by CPT code across the practice.",
    solutionStatement:
      "Harine Management builds gastroenterology-specific analytics dashboards that track endoscopic procedure volume by CPT code, screening versus diagnostic billing conversion rates, ASC versus office procedure revenue, prior authorization denial rates by payer and CPT code, and gastroenterologist productivity against MGMA benchmarks — connected directly to your EHR and refreshed daily in Power BI. GI group administrators get the revenue intelligence to manage billing accuracy, monitor ASC performance, and catch denial patterns before they compound.",
    deliverables: [
      "Endoscopic procedure volume by CPT code: colonoscopy, EGD, ERCP, and flex sig",
      "Screening versus diagnostic colonoscopy billing split with conversion rate tracking",
      "ASC versus office setting procedure revenue comparison by CPT code and physician",
      "Prior authorization denial rate by payer, CPT code, and procedure setting",
      "Gastroenterologist wRVU productivity with MGMA gastroenterology specialty benchmarking",
      "Payer mix by procedure type with Medicare Advantage versus traditional Medicare split",
    ],
    outcomes: [
      { value: "Screening", label: "vs. diagnostic conversion rate tracked per procedure — not estimated" },
      { value: "ASC vs.", label: "Office revenue split visible by physician in real time" },
      { value: "Daily", label: "Procedure volume refresh — no more end-of-month revenue surprises" },
    ],
    faqItems: [
      {
        question: "How does analytics work for gastroenterology practices?",
        answer:
          "Gastroenterology analytics connects to the practice's EHR — Athenahealth, eClinicalWorks, or other platforms — and extracts procedure, billing, and payer data to build dashboards covering the revenue metrics specific to GI groups; the system tracks endoscopic procedure volume by CPT code, screening versus diagnostic colonoscopy billing splits, ASC versus in-office procedure revenue, prior authorization denial rates, and gastroenterologist wRVU productivity — with a daily data refresh so group administrators have current procedure and revenue intelligence without manual report runs.",
      },
      {
        question: "What metrics matter most for gastroenterology practices?",
        answer:
          "The highest-impact metrics for GI group practices are procedure volume by CPT code (colonoscopy, EGD, ERCP, and flex sig carry very different reimbursement profiles), screening versus diagnostic colonoscopy billing conversion rate (incorrect billing of screening procedures that convert to diagnostic is the largest systematic revenue error in GI billing), ASC versus office procedure revenue split (ASC facility fees change the total revenue picture significantly and should be tracked alongside professional fees), prior authorization denial rate by payer and procedure CPT code (GI procedure denial rates vary significantly by payer and affect cash flow timing), and gastroenterologist wRVU productivity versus MGMA benchmarks (the basis for compensation and staffing decisions in procedure-heavy specialties).",
      },
      {
        question: "How does the dashboard handle screening versus diagnostic colonoscopy billing differences?",
        answer:
          "The screening versus diagnostic tracking is built from the CPT and ICD-10 code combinations recorded in the EHR at the time of billing — specifically tracking cases billed with screening CPT codes (45378 with Z12.11 or equivalent) versus diagnostic codes (45380, 45381, 45382, and others) and identifying cases where the initial order was a screening but the billed code reflects a diagnostic conversion due to a polyp finding; the conversion rate metric quantifies what percentage of scheduled screening colonoscopies are billing as diagnostic, which is both a quality indicator and a billing accuracy checkpoint.",
      },
      {
        question: "Can gastroenterology analytics track ASC performance separately from the main practice?",
        answer:
          "Yes — where the practice's ASC is captured as a separate billing entity or facility in the EHR, Harine Management can build an ASC-specific view within the consolidated dashboard that tracks procedure volume, revenue, payer mix, and denial rates for the ASC separately from the office-based practice; this allows the group to monitor ASC financial performance, compare reimbursement per procedure by setting, and evaluate whether procedure case mix is appropriately allocated between the ASC and the office based on reimbursement optimization.",
      },
    ],
    definitionBlock:
      "Gastroenterology analytics is a data intelligence service that extracts procedure, billing, and productivity data from GI practice EHR systems and delivers daily dashboards covering endoscopic procedure volume by CPT code, screening versus diagnostic colonoscopy billing conversion rates, ASC versus office revenue splits, prior authorization denial rates, and gastroenterologist wRVU productivity — giving GI group practices the real-time financial visibility needed to manage billing accuracy, monitor ASC performance, and track the revenue metrics that drive reimbursement in procedure-intensive gastroenterology.",
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Dermatology Analytics
  // ─────────────────────────────────────────────────────────────
  {
    slug: "dermatology-analytics",
    title: "Dermatology Analytics",
    shortTitle: "Dermatology",
    metaTitle: "Dermatology Data Analytics | Harine Management",
    metaDescription:
      "Medical vs. cosmetic revenue mix, Mohs surgery billing, procedure denial analytics, and provider productivity dashboards for dermatology practices.",
    heroHeadline: "Medical and cosmetic. Two revenue streams. One dashboard.",
    heroSubheadline:
      "Medical versus cosmetic revenue mix, Mohs surgery volume and reimbursement, pathology billing, procedure denial rates by CPT code, and provider productivity — all current, all from your EHR, updated every morning.",
    problemStatement:
      "Dermatology practices operate across two fundamentally different revenue streams — insurance-billed medical dermatology and cash-pay cosmetic services — that most EHR reporting systems cannot cleanly separate, making it nearly impossible for practice administrators to understand the true margin profile of each line of business. Mohs surgery billing is among the most complex in ambulatory care: stage-by-stage CPT coding, pathology revenue, facility fee interactions, and payer-specific coverage policies all interact in ways that generate denial patterns most practices discover only at year-end. Modifier misuse on procedure codes and incorrect linkage of pathology CPT codes to the parent procedure are systematic billing accuracy problems in dermatology that no one is watching in real time.",
    solutionStatement:
      "Harine Management builds dermatology-specific analytics dashboards that separate medical and cosmetic revenue by provider and service category, track Mohs surgery volume and revenue by stage and payer, monitor procedure and pathology denial rates by CPT code, and surface provider productivity against MGMA dermatology benchmarks — connected directly to your EHR and updated daily in Power BI. Practice administrators and managing physicians get the financial clarity to manage both revenue streams, catch billing accuracy problems early, and understand the true margin contribution of each provider and service line.",
    deliverables: [
      "Medical versus cosmetic revenue split by provider, service category, and month",
      "Mohs surgery volume and revenue by stage, CPT code, and payer",
      "Pathology CPT billing volume and revenue with match rate to parent procedure",
      "Procedure denial rate by CPT code and payer with modifier usage analysis",
      "Dermatologist wRVU productivity with MGMA dermatology specialty benchmarking",
      "New patient volume and referral source tracking by provider and location",
    ],
    outcomes: [
      { value: "Medical", label: "vs. cosmetic revenue split visible by provider in real time" },
      { value: "Mohs", label: "Stage-by-stage revenue and denial tracking — not just totals" },
      { value: "Daily", label: "Provider productivity refresh — not quarterly compensation guesswork" },
    ],
    faqItems: [
      {
        question: "How does analytics work for dermatology practices?",
        answer:
          "Dermatology analytics connects to the practice's EHR — Athenahealth, eClinicalWorks, or other platforms — and extracts encounter, procedure, billing, and payer data to build dashboards covering the revenue metrics specific to dermatology groups; the system separates medical and cosmetic revenue by provider and service type, tracks Mohs surgery volume and reimbursement by stage and payer, monitors procedure and pathology denial rates by CPT code, and surfaces dermatologist wRVU productivity — with a daily data refresh so practice administrators have current revenue intelligence across both lines of business without manual report assembly.",
      },
      {
        question: "What metrics matter most for dermatology practices?",
        answer:
          "The highest-impact metrics for dermatology group practices are medical versus cosmetic revenue mix by provider (the margin profile and management priorities differ substantially between the two lines of business), Mohs surgery volume and reimbursement by stage and payer (Mohs is among the highest-revenue and highest-complexity billing categories in dermatology), procedure denial rate by CPT code and payer (modifier misuse and incorrect pathology linkage are the two most common systematic billing errors in dermatology and accumulate silently), pathology revenue match rate (tracks whether pathology CPT codes are being billed correctly and consistently against the procedures that generate them), and dermatologist wRVU productivity versus MGMA benchmarks (the basis for provider compensation and hiring decisions).",
      },
      {
        question: "Can dermatology analytics separate insurance-billed and cosmetic cash-pay revenue?",
        answer:
          "Yes — where cosmetic services are recorded with a distinct fee schedule, service category, or payer designation in the EHR (typically as a cash-pay or cosmetic payer class), Harine Management's dermatology dashboard tracks medical insurance-billed and cosmetic cash-pay revenue separately by provider, service type, and month; this allows practice administrators to see the true revenue contribution and volume trend for each line of business independently — including seasonal patterns in cosmetic demand and the margin impact of changes in the medical-to-cosmetic provider mix.",
      },
      {
        question: "How is Mohs surgery tracked in dermatology billing analytics?",
        answer:
          "Mohs surgery analytics are built from the CPT-level billing data recorded at each case, tracking the number of stages billed per case (CPT codes 17311 for first stage, 17312 for each additional stage), reimbursement per stage by payer, denial rates on Mohs CPT codes by payer and denial reason, and total Mohs revenue versus other procedure revenue by physician; the dashboard surfaces whether denial rates on Mohs cases are driven by payer medical necessity policies, documentation gaps in the operative note, or stage count discrepancies — giving the billing team specific, actionable information rather than a summary denial rate that cannot be acted upon.",
      },
    ],
    definitionBlock:
      "Dermatology analytics is a data intelligence service that extracts procedure, billing, and productivity data from dermatology EHR systems and delivers daily dashboards separating medical and cosmetic revenue by provider, tracking Mohs surgery volume and reimbursement by stage and payer, monitoring procedure and pathology denial rates by CPT code, and benchmarking dermatologist productivity against MGMA specialty standards — giving dermatology practices the financial clarity to manage both their insurance-billed and cash-pay revenue streams without manual reporting.",
  },
];

export function getSpecialtyBySlug(slug: string): Specialty | undefined {
  return specialties.find((s) => s.slug === slug);
}
