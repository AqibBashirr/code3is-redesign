import { extractHeadings } from "@/lib/extractHeadings";
import { Blog } from "@/types/payload-types";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import BlogToc from "./BlogToc";
import BlogProgress from "./BlogProgress";
import { converters } from "./RichtextContent";

interface BlogPageProps {
  Blog: Blog;
}

function BlogPage({ Blog }: BlogPageProps) {
  const headings = extractHeadings(Blog.content);

  const logoSrc =
    typeof Blog.heroImage === "string"
      ? Blog.heroImage
      : (Blog.heroImage?.thumbnailURL ?? "");

  const logoAlt =
    typeof Blog.heroImage === "string"
      ? (Blog.slug?.replace(/\s/g, " ").toUpperCase() ?? "")
      : (Blog.heroImage?.alt ??
        Blog.slug?.replace(/\s/g, " ").toUpperCase() ??
        "");

  return (
    <div>
      <div className="max-h-135 pt-4 px-5.5">
        <Image
          src={logoSrc}
          width={1400}
          height={540}
          alt={logoAlt}
          className="h-full max-h-135 w-full rounded-[10px] border border-[#3A3B3A] object-cover"
        />
      </div>

      <div className="mx-auto flex max-w-max items-start gap-[clamp(38px,5vw,78px)] px-x py-y">
        {/* Left Sidebar */}
        <BlogToc headings={headings} />

        {/* Main Content */}
        <article id="main-content" className="flex-1">
          <h1 className="font-raleway text-[clamp(28px,3vw,40px)] font-semibold capitalize leading-[calc(clamp(28px,3vw,40px)+12px)] ">
            {Blog.title}
          </h1>

          <div className="blog-content mt-between-content">
            <RichText data={Blog.content} converters={converters} />
          </div>
        </article>

        {/* Right Sidebar */}
        <aside id="right-sidebar" className="w-51 sticky top-[70dvh]">
          <BlogProgress />
        </aside>
      </div>
    </div>
  );
}

export default BlogPage;
