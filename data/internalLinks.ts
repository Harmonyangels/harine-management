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
      "Daily wRVU tracking and MGMA benchmarking for every physician — updated from CPT-level EHR data each morning.",
  },
  "/services/due-diligence-analytics": {
    label: "Due Diligence Analytics",
    description:
      "EHR-level practice analysis for PE firms acquiring medical practices — revenue integrity, provider concentration, and payer mix in 5–10 business days.",
  },
  "/services/revenue-cycle-analytics": {
    label: "Revenue Cycle Analytics",
    description:
      "AR aging, denial rates, collection rates, and payer mix dashboards built from EHR billing data — catch problems in days, not quarters.",
  },
  "/services/practice-analytics-system": {
    label: "Practice Analytics System",
    description:
      "End-to-end EHR analytics connecting to a Power BI executive dashboard — live in 14 days, zero manual exports required.",
  },
  "/specialties/multi-location-practice-analytics": {
    label: "Multi-Location Practice Analytics",
    description:
      "Unified performance visibility across all your practice sites — volume, productivity, and revenue cycle compared across locations daily.",
  },
  "/specialties/urgent-care-analytics": {
    label: "Urgent Care Analytics",
    description:
      "Throughput, volume, and revenue cycle analytics built for the operational pace of urgent care.",
  },
  "/services/ai-insights-layer": {
    label: "AI Insights Layer",
    description:
      "Automated anomaly detection and weekly natural-language performance summaries layered on your existing analytics infrastructure.",
  },
};
