export interface GlossaryTerm {
  term: string;
  slug: string;
  /** One sentence, written to be quoted verbatim by AI engines answering "what is X" questions. */
  shortDefinition: string;
  /** 3–5 sentences providing full context. Self-contained — no surrounding page required. */
  fullDefinition: string;
  relatedTerms: string[];
  /** Slugs from data/services.ts */
  relatedServices: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  // ─────────────────────────────────────────────────────────────
  // wRVU
  // ─────────────────────────────────────────────────────────────
  {
    term: "wRVU",
    slug: "wrvu",
    shortDefinition:
      "A work relative value unit (wRVU) is a standardized measure of physician clinical effort assigned by CMS to every CPT procedure code, used as the basis for physician productivity tracking and productivity-based compensation models in ambulatory medicine.",
    fullDefinition:
      "A work relative value unit (wRVU) is a numeric weight assigned by the Centers for Medicare and Medicaid Services (CMS) to each CPT code to quantify the physician work involved — including time, cognitive effort, technical skill, and physical effort — independent of payer reimbursement, practice location, or overhead costs. CMS updates the wRVU schedule annually through Medicare Physician Fee Schedule rulemaking, with new values taking effect each January. In a wRVU-based compensation model, a physician's total production is calculated by summing the wRVU values of all CPT codes documented across their encounters, then multiplying by a dollar-per-wRVU conversion factor set by the practice. wRVU is the preferred productivity metric in ambulatory medicine because it enables fair comparison across providers, specialties, and geographic markets — factors that distort alternative metrics such as collections per visit. The MGMA Physician Compensation and Production Report publishes national and specialty-specific wRVU benchmarks that practices use to establish compensation targets and assess individual provider performance.",
    relatedTerms: ["wrvu-benchmark", "cpt-code", "mgma-benchmark", "net-revenue-per-visit"],
    relatedServices: ["provider-productivity-analytics", "practice-performance-scoring"],
  },

  // ─────────────────────────────────────────────────────────────
  // AR Aging
  // ─────────────────────────────────────────────────────────────
  {
    term: "AR Aging",
    slug: "ar-aging",
    shortDefinition:
      "AR aging (accounts receivable aging) is a breakdown of a medical practice's outstanding claims by how long they have been unpaid — typically segmented into 0–30, 30–60, 60–90, and 90+ day buckets — used to assess billing health and predict collection risk.",
    fullDefinition:
      "AR aging categorizes every open claim or patient balance by the number of days elapsed since service date or claim submission, revealing the distribution of a practice's receivables across standard time buckets: current (0–30 days), 30–60, 60–90, and 90+ days outstanding. Claims in the 90+ day bucket represent the highest collection risk — payer filing limits, exhausted appeal rights, and patient financial hardship all make these balances progressively less recoverable over time. A healthy outpatient practice typically aims to keep AR over 90 days below 20–25% of total AR; concentrations above 30% signal systematic billing workflow problems, payer adjudication issues, or collection process failures. AR aging is not just a snapshot metric — the trend is as important as the current value; a practice whose 90+ day bucket is growing month over month is experiencing a deteriorating billing cycle that will affect cash flow within 60–90 days if unaddressed. Harine Management surfaces AR aging by payer and provider in daily-updated dashboards so finance teams can identify concentration and trend issues before they compound into write-offs.",
    relatedTerms: ["days-in-ar", "denial-rate", "collection-rate", "revenue-cycle"],
    relatedServices: ["revenue-cycle-analytics", "practice-analytics-system"],
  },

  // ─────────────────────────────────────────────────────────────
  // Payer Mix
  // ─────────────────────────────────────────────────────────────
  {
    term: "Payer Mix",
    slug: "payer-mix",
    shortDefinition:
      "Payer mix is the distribution of a medical practice's patient encounters and revenue across insurance categories — commercial, Medicare, Medicaid, and self-pay — which directly determines the practice's average reimbursement rate and revenue per visit.",
    fullDefinition:
      "Payer mix describes what proportion of a practice's patients and revenue comes from each payer class: commercial insurance (employer-sponsored and individual plans), Medicare, Medicaid, and self-pay patients. Because reimbursement rates vary substantially across payer classes — commercial typically paying the highest rates, Medicare paying a regulated schedule, and Medicaid the lowest — payer mix is one of the primary drivers of revenue per encounter and overall financial performance. A shift toward Medicare or Medicaid — driven by patient panel aging, referral network changes, or geographic demographics — compresses revenue per visit even when encounter volume holds steady or grows. For healthcare investors, payer mix is analyzed as a trajectory rather than a current snapshot: a practice with 45% commercial mix that was 55% commercial 24 months ago has a materially different forward revenue outlook than its current-year financials suggest. MGMA benchmarking allows practices and investors to contextualize whether a given payer mix is typical for the specialty or represents concentration risk relative to peers.",
    relatedTerms: ["payer-concentration", "fee-for-service", "capitation", "collection-rate", "net-revenue-per-visit"],
    relatedServices: ["revenue-cycle-analytics", "due-diligence-analytics", "practice-performance-scoring"],
  },

  // ─────────────────────────────────────────────────────────────
  // Collection Rate
  // ─────────────────────────────────────────────────────────────
  {
    term: "Collection Rate",
    slug: "collection-rate",
    shortDefinition:
      "Collection rate is the percentage of its contractually entitled revenue — net of payer adjustments — that a medical practice actually collects, measuring the overall effectiveness of its billing and collections process.",
    fullDefinition:
      "Net collection rate is calculated by dividing total payments collected by net collectible charges — the amount a practice should receive after contractual write-offs — expressed as a percentage; it is the single most important billing efficiency metric because it isolates how much entitled revenue the practice actually receives versus how much is lost to uncollected patient balances, unpursued denials, and avoidable write-offs. A net collection rate below 95% for most outpatient specialties indicates revenue leakage that warrants investigation; top-quartile practices typically achieve 97–99% per MGMA data. Collection rate should always be tracked by payer — an acceptable aggregate rate can mask a specific payer paying below contract or a patient balance collection process that is failing for a particular visit type. Monthly collection rate data lags the billing cycle by 45–90 days; practices that monitor leading indicators in the billing pipeline — denial rate, first-pass acceptance rate, and prior authorization completion — detect collection rate trends 60–90 days before they appear in financial statements. Harine Management tracks collection rate by payer in daily-updated dashboards that surface directional changes within days of them beginning.",
    relatedTerms: ["ar-aging", "denial-rate", "payer-mix", "net-revenue-per-visit", "revenue-cycle"],
    relatedServices: ["revenue-cycle-analytics", "practice-analytics-system", "practice-performance-scoring"],
  },

  // ─────────────────────────────────────────────────────────────
  // EBITDA Normalization
  // ─────────────────────────────────────────────────────────────
  {
    term: "EBITDA Normalization",
    slug: "ebitda-normalization",
    shortDefinition:
      "EBITDA normalization in a healthcare practice acquisition adjusts reported earnings before interest, taxes, depreciation, and amortization for one-time items, owner compensation anomalies, and discretionary expenses to produce a sustainable run-rate EBITDA that reflects what a new owner would actually earn.",
    fullDefinition:
      "EBITDA normalization removes non-recurring revenue and expense items — a one-time government grant, a litigation settlement, a physician's above-market compensation draw — and adds back costs that would not recur under new ownership, to produce a normalized EBITDA representing the practice's ongoing earning power. In healthcare M&A, normalization adjustments are particularly complex because of physician owner compensation structures: many owners pay themselves both a market-rate physician salary and an owner distribution, and distinguishing fair market value physician compensation from excess owner return requires benchmarking against MGMA specialty standards. Common adjustments in healthcare acquisitions include above- or below-market physician compensation, personal expenses run through the business, one-time equipment purchases, COVID-era relief payments, and non-recurring expansion costs. EHR-level data validation is essential to normalized EBITDA reliability: encounter-level volume and productivity data either confirms or contradicts the adjusted figure, and buyers who skip this validation regularly discover post-close that the normalization assumptions were incorrect. Healthcare practices typically trade at 6–10× trailing normalized EBITDA, making the accuracy of normalization adjustments directly consequential to acquisition price.",
    relatedTerms: ["practice-ebitda", "provider-concentration-risk", "wrvu", "payer-mix", "mgma-benchmark"],
    relatedServices: ["due-diligence-analytics", "practice-performance-scoring", "post-acquisition-intelligence"],
  },

  // ─────────────────────────────────────────────────────────────
  // Provider Concentration Risk
  // ─────────────────────────────────────────────────────────────
  {
    term: "Provider Concentration Risk",
    slug: "provider-concentration-risk",
    shortDefinition:
      "Provider concentration risk is the degree to which a medical practice's revenue depends on one or a few individual physicians, creating acquisition and operational risk if those physicians retire, depart, or reduce hours after the ownership transition.",
    fullDefinition:
      "Provider concentration risk quantifies how much of a practice's revenue is attributable to specific individual physicians — typically modeled as revenue at risk if the top one, two, or three providers departed. In ambulatory medicine, revenue is generated by individual physicians whose patient relationships, referral networks, and clinical skills are personal assets that do not transfer with the legal entity; when a physician departs, their production follows them or disappears. A practice where a single physician accounts for 40% or more of revenue, or where the top two together account for more than 60%, carries concentration risk that must be explicitly modeled in any acquisition analysis. Mitigation strategies include multi-year employment agreements with retention incentives tied to post-close production, non-compete agreements calibrated to the relevant market, and earnout provisions that tie a portion of deal consideration to the physician's continued engagement. Provider concentration risk analysis requires wRVU-level EHR data trended over 36 months — not aggregate financials — to accurately attribute revenue to individuals and model the departure scenarios that matter most.",
    relatedTerms: ["wrvu", "ebitda-normalization", "practice-ebitda", "wrvu-benchmark"],
    relatedServices: ["due-diligence-analytics", "post-acquisition-intelligence", "provider-productivity-analytics"],
  },

  // ─────────────────────────────────────────────────────────────
  // Revenue Cycle
  // ─────────────────────────────────────────────────────────────
  {
    term: "Revenue Cycle",
    slug: "revenue-cycle",
    shortDefinition:
      "The revenue cycle in a medical practice is the end-to-end process by which clinical services are converted into collected payments — spanning patient scheduling and insurance verification through charge capture, claim submission, payer adjudication, denial management, and final collection.",
    fullDefinition:
      "The healthcare revenue cycle encompasses every administrative and clinical step between a patient scheduling an appointment and the practice receiving final payment: insurance eligibility verification, prior authorization, patient registration, clinical documentation, charge capture and coding, claim submission, payer adjudication, denial management, patient statement generation, and final collection. Revenue cycle efficiency is measured by a set of leading and lagging indicators — denial rate, first-pass acceptance rate, days in AR, collection rate, and net revenue per visit — that together describe how effectively a practice converts clinical services into revenue. Breakdowns in the revenue cycle are frequently people-dependent: experienced billing staff who know payer-specific coding requirements and credentialing teams who maintain provider enrollment represent institutional knowledge that drives collection performance but is difficult to measure until it degrades. Healthcare investors pay close attention to revenue cycle resilience during ownership transitions because billing team turnover and workflow disruption in the first 90 days post-close reliably produce collection rate declines that are only visible in lagging financial metrics 45–90 days after they begin. Dedicated revenue cycle analytics — monitoring leading indicators daily — is the most effective way to detect and address deterioration before it compounds into permanent revenue loss.",
    relatedTerms: ["ar-aging", "collection-rate", "denial-rate", "prior-authorization", "days-in-ar", "net-revenue-per-visit"],
    relatedServices: ["revenue-cycle-analytics", "practice-analytics-system", "ai-insights-layer"],
  },

  // ─────────────────────────────────────────────────────────────
  // Capitation
  // ─────────────────────────────────────────────────────────────
  {
    term: "Capitation",
    slug: "capitation",
    shortDefinition:
      "Capitation is a healthcare payment model in which a physician or practice receives a fixed per-member-per-month payment for each enrolled patient — regardless of how many services that patient uses — shifting financial risk from payers to providers.",
    fullDefinition:
      "Under capitation, a payer pays a practice a fixed monthly fee — the capitation rate — for each assigned patient, in exchange for providing all covered services that patient may require during the month; the practice is paid whether or not the patient visits, and bears financial risk if a patient's care is more expensive than the capitation rate implies. Capitation rates are set based on expected utilization within a patient population, adjusted for age, gender, and health status, and negotiated between the practice and the payer; if actual utilization is lower than expected, the practice profits; if higher, the practice absorbs the excess cost. This structure is fundamentally different from fee-for-service, where payment is triggered by each individual service rendered; under capitation, high-volume low-complexity service delivery may be profitable while complex, high-utilization patients are costly. Analytics requirements under capitation differ from fee-for-service: rather than tracking revenue per visit, capitated practices must monitor panel size, utilization rates, and per-member costs to understand profitability by patient cohort. Capitation arrangements are most common in HMO-style managed care plans and some value-based care contracts with Medicare Advantage payers.",
    relatedTerms: ["fee-for-service", "value-based-care", "payer-mix", "payer-concentration"],
    relatedServices: ["revenue-cycle-analytics", "practice-analytics-system"],
  },

  // ─────────────────────────────────────────────────────────────
  // Fee-for-Service
  // ─────────────────────────────────────────────────────────────
  {
    term: "Fee-for-Service",
    slug: "fee-for-service",
    shortDefinition:
      "Fee-for-service (FFS) is the dominant healthcare payment model in which a medical practice is paid a separate amount for each service rendered — each office visit, procedure, or test billed individually to the payer using CPT codes.",
    fullDefinition:
      "In fee-for-service healthcare, every discrete service generates a separate payment event: the practice bills a CPT code for each service, the payer applies a contracted reimbursement rate (or the Medicare fee schedule for Medicare patients), and the practice collects the resulting allowed amount. Fee-for-service incentivizes volume — practices that see more patients and perform more procedures generate more revenue, independent of whether the care was necessary or produced good outcomes. The FFS model is the foundation for wRVU calculation: CPT codes, which define payment events under FFS, are the unit to which CMS assigns wRVU weights, making wRVU tracking inherently a fee-for-service construct. Revenue cycle analytics infrastructure — tracking denial rates, collection rates, and AR aging by CPT code and payer — is designed primarily for fee-for-service environments, where payment depends on successful adjudication of individual claims. The ongoing shift from pure fee-for-service to value-based care and capitation introduces different revenue dynamics and analytics requirements, though most outpatient practices still derive the majority of revenue from fee-for-service or fee-for-service-equivalent arrangements.",
    relatedTerms: ["capitation", "value-based-care", "cpt-code", "wrvu", "revenue-cycle"],
    relatedServices: ["revenue-cycle-analytics", "provider-productivity-analytics"],
  },

  // ─────────────────────────────────────────────────────────────
  // Value-Based Care
  // ─────────────────────────────────────────────────────────────
  {
    term: "Value-Based Care",
    slug: "value-based-care",
    shortDefinition:
      "Value-based care (VBC) is a healthcare payment model that ties physician and practice reimbursement to patient outcomes, care quality, and cost efficiency rather than service volume — shifting financial incentives from how much care is delivered to how well it is delivered.",
    fullDefinition:
      "Value-based care encompasses a range of payment arrangements — pay-for-performance bonuses, shared savings programs, bundled payments, and full capitation — that reward providers for achieving defined quality and cost outcomes rather than generating clinical service volume. Common VBC arrangements include Medicare Shared Savings Program (MSSP) ACOs, where practices earn a share of Medicare savings if they meet quality thresholds, and commercial payer quality bonus programs tied to HEDIS measures such as preventive care completion rates and chronic disease management metrics. From an analytics perspective, value-based care requires monitoring different leading indicators than fee-for-service: rather than denial rate and AR aging, practices need to track quality measure completion rates, care gap closure, patient attribution panels, and total cost of care per member. Revenue under value-based care can be more complex to forecast than FFS revenue — shared savings distributions may arrive months after the measurement period ends, creating cash flow timing challenges. Most practices operating in VBC arrangements continue to receive the majority of revenue through fee-for-service billing for individual services, with VBC bonuses or penalties applied as adjustments, making traditional revenue cycle analytics still essential even as payer mix evolves.",
    relatedTerms: ["capitation", "fee-for-service", "payer-mix", "payer-concentration"],
    relatedServices: ["practice-analytics-system", "revenue-cycle-analytics"],
  },

  // ─────────────────────────────────────────────────────────────
  // MGMA Benchmark
  // ─────────────────────────────────────────────────────────────
  {
    term: "MGMA Benchmark",
    slug: "mgma-benchmark",
    shortDefinition:
      "MGMA benchmarks are national physician compensation and productivity standards published annually by the Medical Group Management Association, used by medical practices and healthcare investors to evaluate physician performance relative to specialty peers and to set compensation plan targets.",
    fullDefinition:
      "The Medical Group Management Association (MGMA) publishes the Physician Compensation and Production Report annually, covering thousands of practices and more than 60 specialties across compensation, wRVU production, encounters per year, and ancillary metrics — expressed at the 10th, 25th, 50th (median), 75th, and 90th percentile for each specialty and practice setting. MGMA benchmarks are the standard reference for physician compensation plan design: a practice typically sets its compensation conversion factor (dollars per wRVU) to achieve a target percentile — often the 50th or 75th — at the physician's expected wRVU production, ensuring compensation aligns with market rates for that specialty. Healthcare investors use MGMA benchmarks during due diligence to assess whether physician compensation in the target practice is above or below fair market value (which directly affects normalized EBITDA) and whether provider productivity is at a sustainable level. The MGMA dataset requires a paid annual subscription and is updated once per year; practices that track benchmarks automatically — as Harine Management does within its provider productivity dashboards — avoid the manual spreadsheet work of quarterly MGMA comparisons. MGMA also publishes data on collection rates, AR aging, denial rates, and revenue per visit by specialty, enabling full operational benchmarking beyond productivity alone.",
    relatedTerms: ["wrvu-benchmark", "wrvu", "practice-ebitda", "ebitda-normalization", "provider-concentration-risk"],
    relatedServices: ["provider-productivity-analytics", "practice-performance-scoring", "due-diligence-analytics"],
  },

  // ─────────────────────────────────────────────────────────────
  // CPT Code
  // ─────────────────────────────────────────────────────────────
  {
    term: "CPT Code",
    slug: "cpt-code",
    shortDefinition:
      "A CPT code (Current Procedural Terminology code) is a standardized five-digit numeric code maintained by the AMA that identifies a specific medical service or procedure, used by physicians to document what was done in an encounter, trigger a billing event, and calculate the wRVU value of the service.",
    fullDefinition:
      "CPT codes cover the full range of physician services — from evaluation and management office visits (99202–99215) to surgical procedures, diagnostic imaging, laboratory services, and preventive care — and are updated annually by the American Medical Association (AMA). In the billing workflow, the physician or a coder assigns CPT codes to document the services rendered; the practice submits these codes on a claim to the payer, which uses them to determine the appropriate reimbursement based on the applicable fee schedule. CPT codes are the fundamental unit of wRVU calculation: CMS assigns a specific wRVU value to each code in the Medicare Physician Fee Schedule, and a physician's productivity is calculated by summing the wRVU values of all CPT codes they generate across patient encounters. For revenue cycle analytics, CPT code-level data is essential — denial rates segmented by CPT code reveal whether rejections are concentrated in specific procedure types, and realization rate variance by CPT code identifies whether specific services are being reimbursed below contracted rates. EHR data extraction for analytics purposes begins at the CPT level: without encounter-level CPT data, productivity, revenue cycle, and due diligence analyses lack the granularity to be actionable.",
    relatedTerms: ["wrvu", "prior-authorization", "denial-rate", "ehr-data-extraction"],
    relatedServices: ["provider-productivity-analytics", "revenue-cycle-analytics", "due-diligence-analytics"],
  },

  // ─────────────────────────────────────────────────────────────
  // Prior Authorization
  // ─────────────────────────────────────────────────────────────
  {
    term: "Prior Authorization",
    slug: "prior-authorization",
    shortDefinition:
      "Prior authorization (PA) is the process by which a physician or practice must obtain advance approval from an insurer before providing a specific service or procedure — failure to obtain it before the service date typically results in a claim denial that is difficult or impossible to overturn.",
    fullDefinition:
      "Prior authorization requirements are set by individual payers and vary by plan, service type, and diagnosis: most commercial insurers require PA for specialist referrals, advanced imaging (MRI, CT), high-cost medications, elective procedures, and durable medical equipment; Medicare Advantage plans have significantly expanded PA requirements relative to traditional Medicare. The PA process requires the practice to submit clinical documentation supporting medical necessity, await payer review (which can take 3–14 business days or be expedited for urgent cases), and receive written approval with an authorization number before the service is rendered. A prior authorization denial — when a service was performed without approved PA — is among the most difficult revenue cycle problems to resolve because payers typically cite the lack of pre-authorization as absolute grounds for non-payment, regardless of clinical appropriateness. Tracking prior authorization completion rates — the percentage of scheduled services requiring PA where authorization is confirmed before the service date — is a leading revenue cycle indicator; practices that monitor this metric weekly catch authorization gaps before services are rendered rather than after claims are denied. PA management is one of the highest administrative burden areas in medical practice operations and a frequent contributor to provider burnout and avoidable revenue loss.",
    relatedTerms: ["denial-rate", "revenue-cycle", "cpt-code", "collection-rate"],
    relatedServices: ["revenue-cycle-analytics", "practice-analytics-system"],
  },

  // ─────────────────────────────────────────────────────────────
  // Net Revenue Per Visit
  // ─────────────────────────────────────────────────────────────
  {
    term: "Net Revenue Per Visit",
    slug: "net-revenue-per-visit",
    shortDefinition:
      "Net revenue per visit is the average amount a medical practice actually collects per patient encounter after all payer adjustments and write-offs — a composite metric that integrates reimbursement rates, payer mix, visit complexity, and billing efficiency into a single per-encounter figure.",
    fullDefinition:
      "Net revenue per visit (also called net revenue per encounter) is calculated by dividing total collected revenue by total completed patient encounters for a defined period; it integrates multiple revenue cycle drivers — payer mix, contracted reimbursement rates, average visit complexity (CPT code mix), and billing collection efficiency — into a single number that reflects what the practice actually receives on average for each patient seen. A declining net revenue per visit is one of the most useful early warning signals in practice financial management because it can reflect payer mix shift, reimbursement rate compression, visit complexity changes, or billing efficiency deterioration — and becomes visible 30–45 days before the impact appears in bottom-line EBITDA. Net revenue per visit should be tracked by payer and by visit type, not only in aggregate: the aggregate can mask significant deterioration in one payer's reimbursement that is obscured by strong commercial performance in the same period. For PE firms underwriting healthcare acquisitions, net revenue per visit trended monthly over 36 months — segmented by payer — is one of the clearest signals of whether revenue quality has been stable, improving, or deteriorating over the evaluated period. MGMA specialty benchmarks for revenue per visit are available and allow comparison to peer practices for context.",
    relatedTerms: ["collection-rate", "payer-mix", "wrvu", "ar-aging", "denial-rate"],
    relatedServices: ["revenue-cycle-analytics", "practice-performance-scoring", "due-diligence-analytics"],
  },

  // ─────────────────────────────────────────────────────────────
  // Days in AR
  // ─────────────────────────────────────────────────────────────
  {
    term: "Days in AR",
    slug: "days-in-ar",
    shortDefinition:
      "Days in AR (days in accounts receivable, or DAR) is the average number of days it takes a medical practice to collect payment after services are rendered, calculated by dividing the total AR balance by average daily net revenue — a measure of billing cycle speed and efficiency.",
    fullDefinition:
      "Days in AR is calculated by dividing the outstanding accounts receivable balance by average daily net revenue (total collected revenue over a period divided by the number of days in that period); a result of 40 days means the practice has, on average, 40 days of revenue outstanding and waiting to be received. Industry benchmarks vary by specialty: primary care practices typically target 30–35 days, specialty practices 35–45 days, and surgical specialties can run 40–55 days depending on procedure mix and payer complexity; sustained days in AR above the 90th percentile for the specialty indicates systemic billing cycle problems. Days in AR is most meaningful as a trend rather than a point-in-time value: a practice at 40 days that has risen from 33 days over the past quarter is experiencing a billing slowdown that will impact cash flow within 45–60 days; a practice at 40 days declining from 48 days is improving, even though the current number looks identical. Common drivers of elevated days in AR include high denial rates that push claims into multiple submission cycles, slow payer processing, inadequate denial follow-up staffing, and patient balance collection failures. Harine Management tracks days in AR as a weekly trend line, surfacing directional changes within days of them beginning rather than weeks after they appear in monthly financial statements.",
    relatedTerms: ["ar-aging", "collection-rate", "denial-rate", "revenue-cycle"],
    relatedServices: ["revenue-cycle-analytics", "practice-analytics-system", "ai-insights-layer"],
  },

  // ─────────────────────────────────────────────────────────────
  // Denial Rate
  // ─────────────────────────────────────────────────────────────
  {
    term: "Denial Rate",
    slug: "denial-rate",
    shortDefinition:
      "Denial rate is the percentage of medical claims submitted to an insurer that are denied payment — either on initial submission or after appeal — and is one of the primary leading indicators of revenue cycle health when segmented by payer, CPT code, and denial reason.",
    fullDefinition:
      "Denial rate is calculated by dividing the number (or dollar value) of denied claims by total claims submitted for a given period; it is a primary revenue cycle leading indicator because denials create avoidable revenue loss, administrative follow-up burden, and — if unworked promptly — permanent write-offs when appeal windows expire. A total denial rate below 5% is generally considered strong for most outpatient specialties; rates between 5–10% indicate improvement opportunities; rates above 10% signal systemic billing quality or prior authorization process failures. Denial rate is most actionable when segmented: an aggregate 8% rate driven by a 24% denial rate on a specific CPT code from a specific payer almost certainly has a specific, fixable cause — a coding change the practice missed, a payer policy update, or a credentialing lapse — that aggregate analysis cannot reveal. Denial reasons are categorized by standard codes: common categories include authorization or referral required, patient not eligible on date of service, duplicate claim, coding error, and timely filing limit exceeded — each implying a different root cause and corrective action. First-pass denial rates (claims denied on initial submission before any appeal) are the most actionable subset, as they are nearly always attributable to billing workflow or coding quality issues rather than payer discretion.",
    relatedTerms: ["ar-aging", "collection-rate", "prior-authorization", "cpt-code", "revenue-cycle"],
    relatedServices: ["revenue-cycle-analytics", "practice-analytics-system", "ai-insights-layer"],
  },

  // ─────────────────────────────────────────────────────────────
  // Payer Concentration
  // ─────────────────────────────────────────────────────────────
  {
    term: "Payer Concentration",
    slug: "payer-concentration",
    shortDefinition:
      "Payer concentration is the degree to which a medical practice's revenue depends on one or a small number of insurance payers, creating financial and negotiating risk when a dominant payer reduces reimbursement rates, narrows its network, or terminates a contract.",
    fullDefinition:
      "Payer concentration measures the proportion of a practice's revenue attributable to its top payers: a practice where a single commercial insurer accounts for 45% of revenue has high concentration that creates material leverage risk in contract negotiations — the payer knows that terminating or reducing reimbursement would be financially devastating to the practice. High payer concentration is particularly risky in markets where a single health system owns the dominant commercial plan, or where state Medicaid managed care organizations are consolidated into one or two plans that most of the market must contract with. Payer concentration risk is distinct from payer mix risk: payer mix describes the composition of revenue across categories (commercial, Medicare, Medicaid, self-pay), while payer concentration describes dependence on a specific insurer within those categories. Healthcare investors evaluate payer concentration during due diligence by reviewing the commercial payer contract portfolio for term dates, reimbursement rates relative to Medicare, and the practice's alternative options if a specific payer terminates. A practice with three commercial payers each representing 15–20% of revenue has significantly better negotiating leverage and risk diversification than one where a single payer represents 50%+ of commercial volume.",
    relatedTerms: ["payer-mix", "collection-rate", "net-revenue-per-visit", "ebitda-normalization"],
    relatedServices: ["due-diligence-analytics", "revenue-cycle-analytics", "practice-performance-scoring"],
  },

  // ─────────────────────────────────────────────────────────────
  // Practice EBITDA
  // ─────────────────────────────────────────────────────────────
  {
    term: "Practice EBITDA",
    slug: "practice-ebitda",
    shortDefinition:
      "Practice EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is the operating cash flow measure used as the primary valuation basis in medical practice acquisitions, calculated from net revenue minus operating expenses and normalized for physician owner compensation adjustments.",
    fullDefinition:
      "Practice EBITDA is calculated as net revenue minus all operating expenses excluding interest, taxes, depreciation, and amortization — representing the practice's cash-generating capacity as a business enterprise, independent of its capital structure and tax situation. In healthcare M&A, reported EBITDA from a physician-owned practice requires normalization before it is meaningful: physician owners often pay themselves above or below fair market value compensation that must be adjusted to a market-equivalent level, and personal expenses or one-time costs are frequently embedded in the operating expense structure. Normalized EBITDA is the standard valuation basis; healthcare practices typically trade at 6–10× trailing normalized EBITDA, with specialty, growth trajectory, and market position determining where within that range a specific deal prices. EHR-level data validation is critical to EBITDA reliability: if the clinical encounter volume and productivity data in the EHR does not support the revenue figures in the P&L — due to coding anomalies, revenue recognition timing, or one-time collection events — the normalized EBITDA is suspect regardless of how accountants have presented it. Post-acquisition, practice EBITDA trajectory is the primary KPI that PE portfolio management tracks against the investment thesis.",
    relatedTerms: ["ebitda-normalization", "provider-concentration-risk", "payer-mix", "collection-rate"],
    relatedServices: ["due-diligence-analytics", "practice-performance-scoring", "post-acquisition-intelligence"],
  },

  // ─────────────────────────────────────────────────────────────
  // wRVU Benchmark
  // ─────────────────────────────────────────────────────────────
  {
    term: "wRVU Benchmark",
    slug: "wrvu-benchmark",
    shortDefinition:
      "A wRVU benchmark is a specialty-specific standard for physician annual productivity in work relative value units, published by MGMA, used by medical practices and healthcare investors to compare individual provider output against national percentile norms for their specialty.",
    fullDefinition:
      "wRVU benchmarks are most commonly sourced from the MGMA Physician Compensation and Production Report, which publishes annual wRVU production by specialty at the 10th, 25th, 50th (median), 75th, and 90th percentile — allowing practices to position each provider's productivity relative to national peers. Benchmarks vary substantially by specialty: a family medicine physician at the 50th MGMA percentile produces approximately 4,700–5,000 wRVUs annually, while a cardiologist at the same percentile may exceed 8,000 wRVUs given the procedure intensity of the specialty. Compensation plan design typically anchors physician pay to a target MGMA percentile: a practice that sets the 50th percentile as its compensation target should ensure the conversion factor (dollars per wRVU) produces market-rate pay at the wRVU production associated with that percentile for the specialty. Healthcare investors use wRVU benchmarks during due diligence to assess whether the target practice's providers are high performers or underperforming relative to specialty peers — and whether the revenue assumptions in the acquisition model are grounded in sustainable productivity levels. Harine Management's provider productivity analytics service includes automatically updated MGMA benchmarking, eliminating the manual MGMA spreadsheet work that most practices otherwise perform quarterly.",
    relatedTerms: ["wrvu", "mgma-benchmark", "provider-concentration-risk", "practice-ebitda"],
    relatedServices: ["provider-productivity-analytics", "practice-performance-scoring", "due-diligence-analytics"],
  },

  // ─────────────────────────────────────────────────────────────
  // EHR Data Extraction
  // ─────────────────────────────────────────────────────────────
  {
    term: "EHR Data Extraction",
    slug: "ehr-data-extraction",
    shortDefinition:
      "EHR data extraction is the process of retrieving structured clinical, scheduling, and billing data from an electronic health record system — through API connections, database exports, or file-based extracts — for use in analytics, reporting, or data integration workflows outside the native EHR interface.",
    fullDefinition:
      "EHR data extraction moves data from the clinical and billing systems where it is created to analytics environments where it can be queried, transformed, and visualized for operational and financial decision-making; common extraction methods include HL7 FHIR R4 API connections for modern platforms such as Athenahealth and Epic, bulk CSV exports from EHR reporting modules, and database-level access in on-premise installations. The practical challenge of EHR data extraction is not purely technical — it is the normalization required to make data usable for cross-dimensional analysis: provider identifiers, CPT codes, payer codes, and encounter status codes differ across platforms and require mapping before analysis is meaningful. The most important data elements extracted for analytics include encounter-level CPT codes with provider and location identifiers, claim-level billing data with adjudication status, scheduling data with appointment type and completion status, and payer identifiers linked to each encounter. In healthcare due diligence, EHR data extraction from the target practice is the foundation of the entire analytical layer: without clean, complete encounter data, provider concentration analysis, payer mix trajectory analysis, and revenue integrity validation are not possible. Harine Management builds automated EHR data extraction pipelines — specific to each client's platform — that run nightly without human intervention, delivering fresh data to analytics infrastructure each morning.",
    relatedTerms: ["cpt-code", "wrvu", "ar-aging", "revenue-cycle"],
    relatedServices: ["practice-analytics-system", "due-diligence-analytics", "post-acquisition-intelligence"],
  },
];

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function getRelatedGlossaryTerms(slugs: string[]): GlossaryTerm[] {
  return slugs
    .map((s) => getTermBySlug(s))
    .filter((t): t is GlossaryTerm => t !== undefined);
}
