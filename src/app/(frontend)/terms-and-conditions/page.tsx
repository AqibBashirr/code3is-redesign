import Hero from "@/components/common/hero";
import BodyText from "@/components/typography/BodyText";
import HeadingText from "@/components/typography/headingText";
import BlogToc from "@/features/blogs/components/BlogToc";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { getAbsoluteUrl } from "@/lib/url"; // Imported to handle OG images

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms and conditions that govern the use of Code3IS services, web development, branding, and this website.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  openGraph: {
    title: "Terms and Conditions",
    description:
      "The terms and conditions that govern the use of Code3IS services and this website.",
    url: `${SITE_URL}/terms-and-conditions`,
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/og/og-default.png"),
        width: 1200,
        height: 630,
        alt: "Code3IS Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions",
    description:
      "The terms and conditions that govern the use of Code3IS services and this website.",
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
      name: "Terms and Conditions",
      item: `${SITE_URL}/terms-and-conditions`,
    },
  ],
};

export default function TermsAndConditionsPage() {
  const headings = [
    { id: "section-1", text: "1. Acceptance of Terms", tag: "h2" },
    { id: "section-2", text: "2. About Code3 Innovative Solutions", tag: "h2" },
    { id: "section-3", text: "3. Website Purpose", tag: "h2" },
    { id: "section-4", text: "4. Eligibility", tag: "h2" },
    { id: "section-5", text: "5. Permitted Use", tag: "h2" },
    { id: "section-6", text: "6. Prohibited Activities", tag: "h2" },
    { id: "section-7", text: "7. Intellectual Property", tag: "h2" },
    { id: "section-8", text: "8. Project Information Disclaimer", tag: "h2" },
    {
      id: "section-9",
      text: "9. Quotations & Estimates Disclaimer",
      tag: "h2",
    },
    { id: "section-10", text: "10. Accuracy of Information", tag: "h2" },
    { id: "section-11", text: "11. Third-Party Links", tag: "h2" },
    { id: "section-12", text: "12. User Communications", tag: "h2" },
    { id: "section-13", text: "13. Limitation of Liability", tag: "h2" },
    { id: "section-14", text: "14. Disclaimer of Warranties", tag: "h2" },
    { id: "section-15", text: "15. Indemnification", tag: "h2" },
    { id: "section-16", text: "16. Termination of Website Access", tag: "h2" },
    { id: "section-17", text: "17. Governing Law", tag: "h2" },
    { id: "section-18", text: "18. Jurisdiction", tag: "h2" },
    { id: "section-19", text: "19. Force Majeure", tag: "h2" },
    { id: "section-20", text: "20. Changes to Terms", tag: "h2" },
    { id: "section-21", text: "21. Contact Information", tag: "h2" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Hero
        title={
          <>
            Terms &{" "}
            <span className="text-highlight-text-color font-bold">
              Conditions
            </span>
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

      <div className="max-w-max mx-auto px-x py-y flex gap-6">
        {/* Your custom BlogToc component */}
        <BlogToc headings={headings} className="hidden md:block w-[25%]" />

        <div className="space-y-10 flex-1">
          <div id="section-1">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              1. Acceptance of Terms
            </HeadingText>
            <BodyText>
              By accessing or using the website https://www.code3is.com/ (the
              &quot;Website&quot;), you agree to comply with and be bound by
              these Terms & Conditions. If you do not agree with any part of
              these terms, you must not use our Website.
            </BodyText>
          </div>

          <div id="section-2">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              2. About Code3 Innovative Solutions
            </HeadingText>
            <BodyText>
              Code3 Innovative Solutions Pvt. Ltd (&quot;Code3is&quot;,
              &quot;we&quot;, &quot;us&quot;) is a digital agency specializing
              in web development, branding, graphic design, and performance
              marketing (SEO, Google/Meta Ads). We are registered and operate
              out of Srinagar, Jammu & Kashmir, India.
            </BodyText>
          </div>

          <div id="section-3">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              3. Website Purpose
            </HeadingText>
            <BodyText>
              The Website serves as a corporate portfolio and lead-generation
              platform. It provides information regarding our services,
              showcases case studies (e.g., Harmain Service Platform, Turey Agri
              Identity System), and allows users to submit project inquiries.
            </BodyText>
          </div>

          <div id="section-4">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              4. Eligibility
            </HeadingText>
            <BodyText>
              The Website and our services are intended solely for businesses
              and individuals aged 18 years or older who have the legal capacity
              to enter into binding contracts.
            </BodyText>
          </div>

          <div id="section-5">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              5. Permitted Use
            </HeadingText>
            <BodyText>
              You are granted a non-exclusive, non-transferable, revocable
              license to access and use the Website strictly for legitimate
              business purposes, such as learning about our services, reading
              our blogs, and initiating project requests.
            </BodyText>
          </div>

          <div id="section-6">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              6. Prohibited Activities
            </HeadingText>
            <BodyText>You agree not to:</BodyText>
            <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-600">
              <li>Use the Website for any unlawful purpose.</li>
              <li>
                Attempt to gain unauthorized access to our servers, underlying
                infrastructure, or contact databases.
              </li>
              <li>
                Scrape, extract, or mine data from our Website or portfolio.
              </li>
              <li>Transmit malware, viruses, or any harmful code.</li>
              <li>
                Misrepresent your identity or corporate affiliation when
                requesting a project quote.
              </li>
            </ul>
          </div>

          <div id="section-7">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              7. Intellectual Property
            </HeadingText>
            <BodyText>
              All content on this Website, including but not limited to text,
              graphics, logos, UI/UX designs, case studies, images, and
              software, is the property of Code3 Innovative Solutions Pvt. Ltd
              or its respective clients and is protected by intellectual
              property laws. Unauthorized reproduction or distribution is
              strictly prohibited.
            </BodyText>
          </div>

          <div id="section-8">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              8. Project Information Disclaimer
            </HeadingText>
            <BodyText>
              Case studies, portfolio items, and outcomes presented on this
              Website represent past performance. We do not guarantee identical
              results for your specific business, as outcomes depend on various
              independent market factors and operational variables.
            </BodyText>
          </div>

          <div id="section-9">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              9. Quotations & Estimates Disclaimer
            </HeadingText>
            <BodyText>
              Any estimates, timelines, or conceptual budgets discussed via our
              &quot;Start A Project&quot; form are preliminary. They do not
              constitute a binding contract until a formal Statement of Work
              (SOW) or Master Services Agreement (MSA) is executed by both
              parties.
            </BodyText>
          </div>

          <div id="section-10">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              10. Accuracy of Information
            </HeadingText>
            <BodyText>
              While we strive to ensure that all information on the Website is
              accurate and up-to-date, we do not warrant the completeness,
              reliability, or accuracy of the service descriptions, blog posts,
              or marketing material provided.
            </BodyText>
          </div>

          <div id="section-11">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              11. Third-Party Links
            </HeadingText>
            <BodyText>
              Our Website may contain links to third-party websites, including
              client websites we have built. Code3is does not endorse or assume
              responsibility for the content, terms, or privacy policies of
              these external sites.
            </BodyText>
          </div>

          <div id="section-12">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              12. User Communications
            </HeadingText>
            <BodyText>
              By submitting information through our contact forms, you consent
              to being contacted by our team regarding your digital, branding,
              or web development needs. You agree that all information provided
              is accurate and truthful.
            </BodyText>
          </div>

          <div id="section-13">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              13. Limitation of Liability
            </HeadingText>
            <BodyText>
              To the maximum extent permitted by applicable law, Code3
              Innovative Solutions Pvt. Ltd shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              or any loss of profits or revenues, whether incurred directly or
              indirectly, arising from your use of the Website.
            </BodyText>
          </div>

          <div id="section-14">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              14. Disclaimer of Warranties
            </HeadingText>
            <BodyText>
              The Website is provided on an &quot;AS-IS&quot; and
              &quot;AS-AVAILABLE&quot; basis. We disclaim all warranties,
              express or implied, including but not limited to implied
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement.
            </BodyText>
          </div>

          <div id="section-15">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              15. Indemnification
            </HeadingText>
            <BodyText>
              You agree to indemnify and hold harmless Code3 Innovative
              Solutions Pvt. Ltd, its directors, employees, and agents from any
              claims, damages, liabilities, and expenses arising out of your
              misuse of the Website or violation of these Terms.
            </BodyText>
          </div>

          <div id="section-16">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              16. Termination of Website Access
            </HeadingText>
            <BodyText>
              We reserve the right, in our sole discretion, to terminate or
              restrict your access to the Website without notice or liability,
              for any reason, including but not limited to a breach of these
              Terms & Conditions.
            </BodyText>
          </div>

          <div id="section-17">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              17. Governing Law
            </HeadingText>
            <BodyText>
              These Terms & Conditions and your use of the Website shall be
              governed by and construed in accordance with the laws of India,
              specifically applicable within the jurisdiction of Jammu &
              Kashmir, without regard to its conflict of law principles.
            </BodyText>
          </div>

          <div id="section-18">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              18. Jurisdiction
            </HeadingText>
            <BodyText>
              Any legal disputes or claims arising out of or related to these
              Terms & Conditions or the use of the Website shall be subject to
              the exclusive jurisdiction of the competent courts located in
              Srinagar, Jammu & Kashmir, India.
            </BodyText>
          </div>

          <div id="section-19">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              19. Force Majeure
            </HeadingText>
            <BodyText>
              Code3is shall not be held liable for any delay or failure in
              performance resulting directly or indirectly from acts of nature,
              forces, or causes beyond our reasonable control, including but not
              limited to internet failures, server outages, natural disasters,
              or governmental actions.
            </BodyText>
          </div>

          <div id="section-20">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              20. Changes to Terms
            </HeadingText>
            <BodyText>
              We reserve the right to modify these Terms & Conditions at any
              time. Updated versions will be posted on this page with the
              &quot;Effective Date&quot; amended. Your continued use of the
              Website post-modification constitutes acceptance of the new terms.
            </BodyText>
          </div>

          <div id="section-21">
            <HeadingText className="text-2xl font-semibold mb-2 scroll-mt-(--padding)">
              21. Contact Information
            </HeadingText>
            <BodyText>
              If you have any questions or concerns about these Terms &
              Conditions, please contact us:
            </BodyText>
            <ul className="list-none space-y-1 mt-2 text-gray-600">
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
