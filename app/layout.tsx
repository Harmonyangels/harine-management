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
    default: "Power BI Dashboards for Medical Practices | Harine Management",
  },
  description:
    "Power BI dashboards for outpatient practices on athenahealth or eClinicalWorks. Reporting Diagnostic $2,500, free for our first 10 clients. Core Build $8,500. Atlanta.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Harine Management",
    title: "Power BI Dashboards for Medical Practices | Harine Management",
    description:
      "Power BI dashboards for outpatient practices. Export athenahealth or eClinicalWorks reports into SharePoint. Reporting Diagnostic $2,500, free for our first 10 clients.",
    url: "https://harinemanagement.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power BI Dashboards for Medical Practices | Harine Management",
    description:
      "Power BI dashboards for outpatient practices on athenahealth or eClinicalWorks. Atlanta.",
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
    "Harine Management LLC is a solo healthcare reporting consultancy in Atlanta. Devanshu Patel builds Power BI dashboards for outpatient practices on athenahealth or eClinicalWorks from the report exports those practices already run.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  email: "dev@harinemanagement.com",
  telephone: "+1-470-231-7674",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://harinemanagement.com/#localbusiness",
  name: "Harine Management LLC",
  url: "https://harinemanagement.com",
  image: "https://harinemanagement.com/logo.png",
  description:
    "Solo healthcare reporting consultancy in Atlanta. Power BI dashboards from athenahealth or eClinicalWorks report exports dropped into the client's SharePoint folder.",
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
  areaServed: [
    { "@type": "City", name: "Atlanta" },
    { "@type": "State", name: "Georgia" },
    { "@type": "AdministrativeArea", name: "Southeast United States" },
  ],
  email: "dev@harinemanagement.com",
  telephone: "+1-470-231-7674",
  priceRange: "$$",
  founder: {
    "@id": "https://harinemanagement.com/#devanshu-patel",
  },
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
