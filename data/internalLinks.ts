/**
 * Keyword → internal path mapping used by the autoLink utility.
 * Keys are matched case-insensitively against post body text.
 * Longer keywords are applied before shorter ones to prevent subset collisions.
 */
export const INTERNAL_LINKS: Record<string, string> = {
  "urgent care analytics": "/specialties/urgent-care-analytics",
  "practice analytics": "/services/practice-analytics-system",
  "multi-location": "/specialties/multi-location-practice-analytics",
  "revenue cycle": "/services/revenue-cycle-analytics",
  "due diligence": "/services/due-diligence-analytics",
  "collection rate": "/services/revenue-cycle-analytics",
  "AI insights": "/services/ai-insights-layer",
  "AR aging": "/services/revenue-cycle-analytics",
  "wRVU": "/services/provider-productivity-analytics",
};

export interface PageMeta {
  label: string;
  description: string;
}

/**
 * Display metadata for every URL that appears as a value in INTERNAL_LINKS.
 * Used by the RelatedServices component to render linked service cards.
 */
export const PAGE_LABELS: Record<string, PageMeta> = {
  "/services/provider-productivity-analytics": {
    label: "Provider Productivity Analytics",
    description:
      "Patients seen per day, new patients, and work RVUs against the benchmarks you already set.",
  },
  "/services/due-diligence-analytics": {
    label: "Due Diligence Analytics",
    description:
      "EHR-level practice analysis for healthcare investors — revenue integrity, provider concentration, and payer mix, scoped to the deal calendar.",
  },
  "/services/revenue-cycle-analytics": {
    label: "Revenue Cycle Analytics",
    description:
      "Charges, denials, and AR from the billing reports you already export. Part of the Core Build, and not described as finished.",
  },
  "/services/practice-analytics-system": {
    label: "Core Build",
    description:
      "Three Power BI dashboards from the athenahealth or eClinicalWorks reports you already export. $8,500, or $9,500 for five or more locations.",
  },
  "/specialties/multi-location-practice-analytics": {
    label: "Multi-Location Practice Analytics",
    description:
      "The same SharePoint and Power BI workflow for outpatient groups with more than one location.",
  },
  "/specialties/urgent-care-analytics": {
    label: "Urgent Care Analytics",
    description:
      "Throughput, volume, and revenue cycle analytics built for the operational pace of urgent care.",
  },
  "/services/ai-insights-layer": {
    label: "AI Insights",
    description:
      "Not a current offer. Harine Management builds Power BI dashboards from the reports a practice already exports.",
  },
};
