import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const GA_ID = "G-8TQ4ZMDRV0";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harinemanagement.com"),
  title: {
    template: "%s | Harine Management",
    default:
      "Healthcare Data Analytics for Medical Practices & Investors | Harine Management",
  },
  description:
    "Harine Management builds AI-enhanced analytics systems for medical practices and private equity firms doing healthcare due diligence. Based in Atlanta, serving practices nationwide.",
  alternates: {
    canonical: "https://harinemanagement.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Harine Management",
    images: [{ url: "/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://harinemanagement.com/#organization",
  name: "Harine Management",
  url: "https://harinemanagement.com",
  logo: {
    "@type": "ImageObject",
    url: "https://harinemanagement.com/brand-assets/logo.png",
  },
  description:
    "Harine Management builds AI-enhanced analytics systems for medical practices and private equity firms doing healthcare due diligence. Based in Atlanta, serving practices nationwide.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  email: "dev@harinemanagement.com",
  telephone: "+1-682-256-3389",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://harinemanagement.com/#localbusiness",
  name: "Harine Management",
  url: "https://harinemanagement.com",
  description:
    "Harine Management builds AI-enhanced analytics systems for medical practices and private equity firms doing healthcare due diligence.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.749,
    longitude: -84.388,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  priceRange: "$$$$",
  email: "dev@harinemanagement.com",
  telephone: "+1-682-256-3389",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://harinemanagement.com/#devanshu-patel",
  name: "Devanshu Patel",
  jobTitle: "Healthcare Data Analytics Consultant",
  worksFor: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
  url: "https://harinemanagement.com/about",
  sameAs: ["https://www.linkedin.com/in/devanshu-patel"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <JsonLd schema={organizationSchema} />
        <JsonLd schema={localBusinessSchema} />
        <JsonLd schema={personSchema} />
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
