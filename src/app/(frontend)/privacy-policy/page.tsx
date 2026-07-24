import Hero from "@/components/common/hero";
import BodyText from "@/components/typography/BodyText";
import HeadingText from "@/components/typography/headingText";
import BlogToc from "@/features/blogs/components/BlogToc";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { getAbsoluteUrl } from "@/lib/url"; // Imported to handle OG images

export const metadata: Metadata = {
  // Fixed: Removed the trailing space
  title: "Privacy Policy",
  description:
    "How Code3IS collects, uses, and protects your personal data and information when you use our web development, branding, and marketing services.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How Code3IS collects, uses, and protects your personal information.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/og/og-default.png"),
        width: 1200,
        height: 630,
        alt: "Code3IS Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description:
      "How Code3IS collects, uses, and protects your personal information.",
    images: [getAbsoluteUrl("/og/og-default.png")],
  },
  robots: {
    // Fixed: Changed to true. Indexing legal pages builds domain trust with Google.
    index: true,
    follow: true,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy",
      item: `${SITE_URL}/privacy-policy`,
    },
  ],
};

export default function PrivacyPolicyPage() {
  const headings = [
    { id: "section-1", text: "1. Introduction", tag: "h2" },
    { id: "section-2", text: "2. Definitions", tag: "h2" },
    { id: "section-3", text: "3. Information We Collect", tag: "h2" },
    { id: "section-4", text: "4. How We Use Information", tag: "h2" },
    { id: "section-5", text: "5. Legal Basis for Processing", tag: "h2" },
    { id: "section-6", text: "6. Cookies & Tracking Technologies", tag: "h2" },
    { id: "section-7", text: "7. Google Analytics", tag: "h2" },
    { id: "section-8", text: "8. Embedded Content", tag: "h2" },
    { id: "section-9", text: "9. Third-Party Services", tag: "h2" },
    { id: "section-10", text: "10. Data Sharing", tag: "h2" },
    { id: "section-11", text: "11. Data Retention", tag: "h2" },
    { id: "section-12", text: "12. Data Security", tag: "h2" },
    { id: "section-13", text: "13. International Data Transfers", tag: "h2" },
    { id: "section-14", text: "14. Children's Privacy", tag: "h2" },
    { id: "section-15", text: "15. Your Rights", tag: "h2" },
    { id: "section-16", text: "16. Marketing Communications", tag: "h2" },
    { id: "section-17", text: "17. Links to Third-Party Websites", tag: "h2" },
    { id: "section-18", text: "18. Changes to this Privacy Policy", tag: "h2" },
    { id: "section-19", text: "19. Contact Information", tag: "h2" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Hero
        title={
          <>
            Privacy{" "}
            <span className="text-highlight-text-color font-bold">Policy</span>
          </>
        }
        subtitle={
          <>
            <strong>Effective Date:</strong> 17/07/2026
          </>
        }
        subTitleClass="text-sm text-gray-500 mb-8"
        buttons={{
          firstButton: { href: "", disabled: true },
          secondButton: { href: "", disabled: true },
        }}
      />

      <div className="max-w-max mx-auto px-x py-y flex gap-10">
        {/* Your custom BlogToc component */}
        <BlogToc headings={headings} className="hidden md:block w-[25%]" />

        <div className="space-y-6 flex-1">
          <div id="section-1">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              1. Introduction
            </HeadingText>
            <BodyText>
              Welcome to Code3 Innovative Solutions Pvt. Ltd.
              (&quot;Code3is&quot;, &quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;). We respect your privacy and are committed to
              protecting your personal data. This Privacy Policy outlines how we
              collect, use, process, and safeguard your information when you
              visit our website (https://www.code3is.com/) and engage with our
              web development, branding, and performance marketing services.
            </BodyText>
          </div>

          <div id="section-2">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              2. Definitions
            </HeadingText>
            <ul className="list-disc pl-6 space-y-1 ">
              <li>
                <strong>Company:</strong> Code3 Innovative Solutions Pvt. Ltd.
              </li>
              <li>
                <strong>Website:</strong> https://www.code3is.com/
              </li>
              <li>
                <strong>User/You:</strong> Any individual or business entity
                accessing the Website.
              </li>
              <li>
                <strong>Personal Data:</strong> Any information relating to an
                identified or identifiable natural person.
              </li>
            </ul>
          </div>

          <div id="section-3">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              3. Information We Collect
            </HeadingText>
            <ul className="list-disc pl-6 space-y-1 ">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, and company name when you voluntarily provide it
                to us.
              </li>
              <li>
                <strong>Contact Form Information:</strong> Details submitted via
                our &quot;Start A Project&quot; or contact forms.
              </li>
              <li>
                <strong>Business Enquiries:</strong> Information related to your
                business requirements, existing systems, and project goals.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser
                type, operating system, and Internet Service Provider (ISP).
              </li>
              <li>
                <strong>Device Information:</strong> Device type, screen
                resolution, and unique device identifiers.
              </li>
              <li>
                <strong>Cookies:</strong> Small data files stored on your device
                that track usage patterns.
              </li>
              <li>
                <strong>Analytics Data:</strong> Navigational data, page views,
                and clickstream data.
              </li>
            </ul>
          </div>

          <div id="section-4">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              4. How We Use Information
            </HeadingText>
            <ul className="list-disc pl-6 space-y-1 ">
              <li>Respond to project enquiries and provide quotations.</li>
              <li>
                Deliver web development, branding, and marketing services.
              </li>
              <li>
                Improve website functionality, design, and user experience.
              </li>
              <li>Analyze traffic and user interactions.</li>
              <li>
                Communicate updates or promotional material (with consent).
              </li>
              <li>
                Prevent fraud, ensure security, and comply with legal
                obligations.
              </li>
            </ul>
          </div>

          <div id="section-5">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              5. Legal Basis for Processing
            </HeadingText>
            <ul className="list-disc pl-6 space-y-1 ">
              <li>
                <strong>Consent:</strong> You have provided explicit consent for
                specific processing.
              </li>
              <li>
                <strong>Contractual Necessity:</strong> Processing is necessary
                to fulfill a contract or take pre-contractual steps.
              </li>
              <li>
                <strong>Legitimate Interests:</strong> To improve our services,
                ensure security, and conduct standard business operations.
              </li>
            </ul>
          </div>

          <div id="section-6">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              6. Cookies & Tracking Technologies
            </HeadingText>
            <BodyText>
              Our Website uses cookies and similar tracking technologies to
              enhance user experience. You can control cookie preferences
              through your browser settings. Disabling cookies may affect your
              ability to use certain features of our Website.
            </BodyText>
          </div>

          <div id="section-7">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              7. Google Analytics
            </HeadingText>
            <BodyText>
              We may use Google Analytics to monitor and analyze web traffic.
              Google Analytics collects data such as your IP address and pages
              visited. You can opt-out by installing the Google Analytics
              Opt-out Browser Add-on.
            </BodyText>
          </div>

          <div id="section-8">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              8. Embedded Content
            </HeadingText>
            <BodyText>
              Articles or portfolios on this Website may include embedded
              content (e.g., videos, images, case studies). Embedded content
              from other websites behaves exactly as if the visitor has visited
              the other website, which may collect data, use cookies, and
              monitor your interaction.
            </BodyText>
          </div>

          <div id="section-9">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              9. Third-Party Services
            </HeadingText>
            <BodyText>
              We may utilize third-party service providers for hosting,
              automation, and analytics (e.g., Meta/Google Ads platforms). These
              third parties have access to your Personal Data only to perform
              these tasks on our behalf and are obligated not to disclose or use
              it for other purposes.
            </BodyText>
          </div>

          <div id="section-10">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              10. Data Sharing
            </HeadingText>
            <BodyText>
              We do not sell, trade, or rent your personal information. We may
              share your information:
            </BodyText>
            <ul className="list-disc pl-6 space-y-1 mt-2 ">
              <li>With trusted third-party vendors operating on our behalf.</li>
              <li>
                To comply with a legal obligation, court order, or requirement.
              </li>
              <li>In the event of a merger, acquisition, or asset sale.</li>
            </ul>
          </div>

          <div id="section-11">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              11. Data Retention
            </HeadingText>
            <BodyText>
              We retain your Personal Data only for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, including
              resolving disputes, providing services, and complying with legal
              obligations.
            </BodyText>
          </div>

          <div id="section-12">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              12. Data Security
            </HeadingText>
            <BodyText>
              We implement industry-standard security measures to protect your
              data from unauthorized access, alteration, disclosure, or
              destruction. However, no internet transmission or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </BodyText>
          </div>

          <div id="section-13">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              13. International Data Transfers
            </HeadingText>
            <BodyText>
              Your information may be transferred to — and maintained on —
              servers located outside of your state, province, or country where
              data protection laws may differ. By submitting your information,
              you consent to this transfer.
            </BodyText>
          </div>

          <div id="section-14">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              14. Children&apos;s Privacy
            </HeadingText>
            <BodyText>
              Our Website and services are intended for a B2B audience and are
              not directed at individuals under the age of 18. We do not
              knowingly collect personal data from children.
            </BodyText>
          </div>

          <div id="section-15">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              15. Your Rights
            </HeadingText>
            <BodyText>
              Depending on your jurisdiction, you may have the right to:
            </BodyText>
            <ul className="list-disc pl-6 space-y-1 mt-2 ">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your personal data.</li>
              <li>Opt-out of marketing communications.</li>
            </ul>
          </div>

          <div id="section-16">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              16. Marketing Communications
            </HeadingText>
            <BodyText>
              If you have opted in, we may send you newsletters or promotional
              materials regarding digital marketing, SEO, and web development
              services. You can unsubscribe at any time using the link provided
              in the emails.
            </BodyText>
          </div>

          <div id="section-17">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              17. Links to Third-Party Websites
            </HeadingText>
            <BodyText>
              Our Website may contain links to external sites (e.g., client
              websites in our portfolio). We are not responsible for the privacy
              practices or the content of these third-party websites.
            </BodyText>
          </div>

          <div id="section-18">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              18. Changes to this Privacy Policy
            </HeadingText>
            <BodyText>
              We reserve the right to update this Privacy Policy at any time.
              Any changes will be posted on this page with an updated
              &quot;Effective Date.&quot; Continued use of the Website after
              modifications constitutes acceptance of the revised policy.
            </BodyText>
          </div>

          <div id="section-19">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding-y)">
              19. Contact Information
            </HeadingText>
            <BodyText>
              For any questions regarding this Privacy Policy, please contact
              us:
            </BodyText>
            <ul className="list-none space-y-1 mt-2 ">
              <li>
                <strong>Company:</strong> Code3 Innovative Solutions Pvt. Ltd
              </li>
              <li>
                <strong>Email:</strong> contactc3@c3is.in
              </li>
              <li>
                <strong>Phone:</strong> +91 9419225147
              </li>
              <li>
                <strong>Address:</strong> Batamaloo, Srinagar, Jammu & Kashmir
                190009, India
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
