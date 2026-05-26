import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "RCM Benchmarking Scorecard for Medical Practices | Harine Management",
  description:
    "Compare your practice billing metrics against MGMA and HFMA benchmarks across 8 key indicators. Free instant scorecard.",
  alternates: {
    canonical: "https://harinemanagement.com/tools/rcm-scorecard",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
