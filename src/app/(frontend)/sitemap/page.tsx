// app/sitemap/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";

import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Browse every page on Code3IS — services, case studies, blog articles, and company information.",
  alternates: {
    canonical: `${SITE_URL}/sitemap`,
  },
};

const getCachedSitemapPageData = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });

    const [blogs, caseStudies] = await Promise.all([
      payload.find({
        collection: "blogs",
        pagination: false,
        depth: 0,
        select: { title: true, slug: true },
      }),
      payload.find({
        collection: "case-studies",
        pagination: false,
        depth: 0,
        select: { title: true, slug: true },
      }),
    ]);

    return { blogs, caseStudies };
  },
  ["sitemap-page"],
  { tags: ["sitemap", "sitemap"] },
);

interface SitemapLink {
  label: string;
  href: string;
}

interface SitemapSection {
  title: string;
  links: SitemapLink[];
}

export default async function SitemapPage() {
  const { blogs, caseStudies } = await getCachedSitemapPageData();

  const sections: SitemapSection[] = [
    {
      title: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [{ label: "Our Services", href: "/our-services" }],
    },
    {
      title: "Work",
      links: [{ label: "Our Work", href: "/our-work" }],
    },
    {
      title: "Case Studies",
      links: [
        { label: "All Case Studies", href: "/case-studies" },
        ...caseStudies.docs
          .filter((c) => c.slug)
          .map((c) => ({
            label: c.title ?? c.slug!,
            href: `/case-studies/${c.slug}`,
          })),
      ],
    },
    {
      title: "Blog",
      links: [
        { label: "All Blog Posts", href: "/blogs" },
        ...blogs.docs
          .filter((b) => b.slug)
          .map((b) => ({
            label: b.title ?? b.slug!,
            href: `/blogs/${b.slug}`,
          })),
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms and Conditions", href: "/terms-and-conditions" },
      ],
    },
  ];

  return (
    <main className="mx-auto max-w-max px-x py-y">
      <h1 className="font-raleway text-[clamp(28px,3vw,40px)] font-semibold">
        Sitemap
      </h1>
      <p className="mt-2 text-secondary-color">
        A complete list of every page on Code3IS.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-raleway text-lg font-semibold">
              {section.title}
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-color underline-offset-4 hover:text-black hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
