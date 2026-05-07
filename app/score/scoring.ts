export interface QualifierOption {
  label: string;
}

export interface Qualifier {
  id: string;
  question: string;
  options: QualifierOption[];
}

export interface QuestionOption {
  label: string;
  points: number;
  benchmarkNote?: string;
}

export interface Question {
  id: string;
  category: string;
  question: string;
  options: QuestionOption[];
  maxPoints: number;
}

export interface ScoreBand {
  label: string;
  color: string;
}

export const QUALIFIERS: Qualifier[] = [
  {
    id: "ehr",
    question: "What EHR system does your practice use?",
    options: [
      { label: "Athena Health" },
      { label: "Epic" },
      { label: "eClinicalWorks" },
      { label: "Kareo / Tebra" },
      { label: "Other" },
    ],
  },
  {
    id: "providers",
    question: "How many providers are in your practice?",
    options: [
      { label: "1–2" },
      { label: "3–5" },
      { label: "6–10" },
      { label: "10+" },
    ],
  },
  {
    id: "locations",
    question: "How many locations does your practice operate?",
    options: [
      { label: "1" },
      { label: "2–3" },
      { label: "4+" },
    ],
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "Billing",
    question: "What is your current claim denial rate?",
    options: [
      { label: "I don't know", points: 4 },
      { label: "Above 10%", points: 3 },
      { label: "5–10%", points: 8 },
      { label: "Below 5%", points: 20, benchmarkNote: "Top practices maintain below 5%" },
    ],
    maxPoints: 20,
  },
  {
    id: "q2",
    category: "Billing",
    question: "How many days on average are claims sitting in A/R?",
    options: [
      { label: "I don't know", points: 4 },
      { label: "Over 50 days", points: 3 },
      { label: "36–50 days", points: 8 },
      { label: "22–35 days", points: 14 },
      { label: "Under 22 days", points: 20, benchmarkNote: "Industry benchmark is under 30 days" },
    ],
    maxPoints: 20,
  },
  {
    id: "q3",
    category: "Billing",
    question: "What percentage of denied claims does your practice actually appeal?",
    options: [
      { label: "0–25%", points: 3 },
      { label: "26–50%", points: 8 },
      { label: "51–75%", points: 14 },
      { label: "76–100%", points: 20 },
    ],
    maxPoints: 20,
  },
  {
    id: "q4",
    category: "Billing",
    question: "What is your net collection rate?",
    options: [
      { label: "I don't know", points: 4 },
      { label: "Below 90%", points: 3 },
      { label: "90–94%", points: 10 },
      { label: "95% or above", points: 20, benchmarkNote: "High-performing practices exceed 95%" },
    ],
    maxPoints: 20,
  },
  {
    id: "q5",
    category: "Volume",
    question: "Is patient volume trending up, flat, or down over the last 12 months?",
    options: [
      { label: "Down", points: 3 },
      { label: "Flat", points: 10 },
      { label: "Up", points: 20 },
    ],
    maxPoints: 20,
  },
  {
    id: "q6",
    category: "Volume",
    question: "What percentage of your appointment slots are being filled?",
    options: [
      { label: "I don't know", points: 4 },
      { label: "Below 70%", points: 3 },
      { label: "70–84%", points: 10 },
      { label: "85% or above", points: 20, benchmarkNote: "Target utilization is above 85%" },
    ],
    maxPoints: 20,
  },
  {
    id: "q7",
    category: "Revenue Ops",
    question: "When did you last renegotiate your payer contracts?",
    options: [
      { label: "Never", points: 2 },
      { label: "3+ years ago", points: 5 },
      { label: "1–3 years ago", points: 12 },
      { label: "Within the last year", points: 20 },
    ],
    maxPoints: 20,
  },
  {
    id: "q8",
    category: "Reporting",
    question: "Does your leadership team have a dashboard showing key practice KPIs?",
    options: [
      { label: "No — we rely on manual reports or gut feel", points: 2 },
      { label: "We have some reports but they're not automated", points: 7 },
      { label: "Yes, we review data monthly", points: 12 },
      { label: "Yes, we have a live dashboard we check weekly or more", points: 20 },
    ],
    maxPoints: 20,
  },
  {
    id: "q9",
    category: "Financial",
    question: "What is your practice overhead ratio (total expenses divided by total revenue)?",
    options: [
      { label: "I don't know", points: 4 },
      { label: "Above 65%", points: 5 },
      { label: "50–65%", points: 14 },
      { label: "Below 50%", points: 20, benchmarkNote: "Efficient practices run below 55%" },
    ],
    maxPoints: 20,
  },
  {
    id: "q10",
    category: "Strategic",
    question: "Are you considering a sale, PE partnership, or hospital affiliation in the next 3 years?",
    options: [
      { label: "Actively exploring", points: 5 },
      { label: "Possibly open to it", points: 10 },
      { label: "Not sure", points: 15 },
      { label: "No plans", points: 20 },
    ],
    maxPoints: 20,
  },
];

// Max possible raw score is 173 (calibrated divisor — not all questions can score 20 simultaneously)
export function calculateScore(answers: Record<string, number>): number {
  const total = Object.values(answers).reduce((sum, pts) => sum + pts, 0);
  return Math.round((total / 173) * 100);
}

export function getScoreBand(score: number): ScoreBand {
  if (score >= 80) return { label: "Healthy", color: "#1D9E75" };
  if (score >= 60) return { label: "At Risk", color: "#E8A020" };
  if (score >= 40) return { label: "Critical", color: "#E05C2A" };
  return { label: "Crisis", color: "#C0392B" };
}

export function isHotLead(qualifiers: Record<string, string>, score: number): boolean {
  return qualifiers["ehr"] === "Athena Health" || score < 60;
}

// Q10 points: Actively exploring = 5, Possibly open to it = 10
export function isPELead(answers: Record<string, number>): boolean {
  return answers["q10"] === 5 || answers["q10"] === 10;
}
