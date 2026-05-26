import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Revenue Leakage Calculator for Medical Practices",
  description:
    "Calculate how much revenue your medical practice is losing to denials, slow collections, and A/R delays. Free, instant estimate.",
  alternates: {
    canonical: "https://harinemanagement.com/tools/revenue-leakage-calculator",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
