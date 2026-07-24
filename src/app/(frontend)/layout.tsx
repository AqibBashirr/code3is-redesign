import type { Metadata } from "next";
import {
  Bebas_Neue,
  Inter,
  Montserrat,
  Poppins,
  Raleway,
} from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Layout/Header/Header";
import Aside from "@/components/Layout/Aside/Aside";
import Footer from "@/components/Layout/Footer/Footer";
import VersionChecker from "@/components/VersionChecker";
import WhatsAppButton from "@/components/WhatsAppButton";

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas_neue",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.code3is.com"),
  title: {
    // Broadened to capture your full tech and marketing stack
    default: "Code3IS | Web Apps, Branding, Ads & Automation",
    template: "%s | Code3IS",
  },
  description:
    "Code3IS builds, designs, and scales businesses. We deliver custom web apps, brand identity, SEO, Meta/Google Ads, and automation from Kashmir to the world.",
  keywords: [
    "web development company Kashmir",
    "custom web apps",
    "branding agency India",
    "performance marketing agency",
    "SEO services Kashmir",
    "UI/UX design agency",
    "Google and Meta ads management",
    "business automation and integration",
    "digital marketing agency",
    "remote software development team",
  ],
  authors: [{ name: "Code3 Innovative Solutions" }],
  creator: "Code3 Innovative Solutions",
  publisher: "Code3 Innovative Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.code3is.com",
    siteName: "Code3IS",
    title: "Code3IS | Web Apps, Branding, Ads & Automation",
    description:
      "We build scalable systems, design corporate identities, and run ad campaigns for businesses in Kashmir, India, the UAE, and beyond.",
    images: [
      {
        url: "/og/og-default.jpg", // 1200x630, add this file to /public/og/
        width: 1200,
        height: 630,
        alt: "Code3IS — Web Apps, Branding & Performance Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code3IS | Web Apps, Branding, Ads & Automation",
    description:
      "We build, design, and scale businesses with custom web apps, brand identity, SEO, and automation.",
    images: ["/og/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.code3is.com",
  },
  // verification: {
  //   google: "PASTE_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE_HERE",
  // },
};

// Organization schema — appears on every page via the root layout
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.code3is.com/#organization",
  name: "Code3 Innovative Solutions",
  alternateName: "Code3IS",
  url: "https://www.code3is.com/",
  logo: "https://www.code3is.com/logos/company-logos/code3is-logo.svg",
  telephone: "+91-9419225147",
  email: "contactc3@c3is.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Batamaloo",
    addressLocality: "Srinagar",
    addressRegion: "Jammu and Kashmir",
    postalCode: "190009",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.0818386,
    longitude: 74.7926128,
  },
  sameAs: [
    "https://www.facebook.com/code3is",
    "https://x.com/code3is",
    "https://www.linkedin.com/company/code3is",
    "https://www.instagram.com/code3is",
  ],
  areaServed: ["India", "Jammu and Kashmir", "United Arab Emirates"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${raleway.variable} ${montserrat.variable} ${bebas_neue.variable} h-full antialiased scrollbar-none`}
    >
      <body className="min-h-full flex flex-col scrollbar-none pt-3 md:pt-5 ">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <VersionChecker />
        <Header />
        <Aside />
        <main className="flex-1 ">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
