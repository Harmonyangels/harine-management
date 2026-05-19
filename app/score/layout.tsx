import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://harinemanagement.com/score",
  },
};

export default function ScoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
