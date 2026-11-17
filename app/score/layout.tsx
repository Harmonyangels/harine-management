import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Practice Health Check",
  description:
    "A short self-assessment for medical practice reporting and revenue cycle. Atlanta healthcare consulting follow-up is a 30-minute call, not a sales sequence.",
  alternates: {
    canonical: "/score",
  },
  openGraph: {
    title: "Free Practice Health Check | Harine Management",
    description:
      "A short self-assessment for medical practice reporting and revenue cycle. Follow up by emailing dev@harinemanagement.com.",
    url: "https://harinemanagement.com/score",
  },
};

export default function ScoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
