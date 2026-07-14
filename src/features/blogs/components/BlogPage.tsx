import { extractHeadings } from "@/lib/extractHeadings";
import { Blog } from "@/types/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import BlogToc from "./BlogToc";
import BlogProgress from "./BlogProgress";
import { converters } from "./RichtextContent";
import { formatDate } from "@/lib/formatDate";
import RelatedBlogs from "./RelatedBlogs ";
import { Suspense } from "react";
import RelatedBlogsSkeleton from "./RelatedBlogsSkeleton";
import AdvanceImage from "@/components/AdvancedImage";

interface BlogPageProps {
  Blog: Blog;
}

function BlogPage({ Blog }: BlogPageProps) {
  const headings = extractHeadings(Blog.content);


  const logoAlt =
    typeof Blog.heroImage === "string"
      ? (Blog.slug?.replace(/\s/g, " ").toUpperCase() ?? "")
      : (Blog.heroImage?.alt ??
        Blog.slug?.replace(/\s/g, " ").toUpperCase() ??
        "");

  return (
    <div>
      <div className=" pt-4 px-5.5 max-w-max mx-auto">
        <AdvanceImage
          src={Blog.heroImage}
          width={1400}
          height={540}
          sizes="hero"
          alt={logoAlt}
          className="
            w-full
            h-55
            sm:h-80
            md:h-105
            lg:h-135
            rounded-[10px]
            border border-[#3A3B3A]
            object-cover
            object-top
          "
        />
      </div>
      <div className="mx-auto flex flex-col-reverse md:flex-row max-w-max items-start gap-[clamp(38px,5vw,78px)] px-x py-y relative">
        {/* Left Sidebar */}
        <BlogToc
          headings={headings}
          className="hidden md:flex flex-col gap-4"
        />

        {/* Main Content */}
        <article id="main-content" className="flex-1">
          <time
            dateTime={Blog.createdAt}
            className=" uppercase text-[clamp(12px,1.5vw,16px)] leading-[calc(clamp(12px,1.5vw,16px)+12px)] tracking-[10%]"
          >
            {formatDate(Blog.createdAt, true)}
          </time>
          <h1 className="font-raleway text-[clamp(28px,3vw,40px)] font-semibold capitalize leading-[calc(clamp(28px,3vw,40px)+12px)] ">
            {Blog.title}
          </h1>

          <div className="blog-content mt-between-content">
            <RichText data={Blog.content} converters={converters} />
          </div>
        </article>

        {/* Right Sidebar */}
        <aside
          id="right-sidebar"
          className="w-full pointer-events-none md:w-51 sticky top-[76svh] md:top-[70dvh] md:mt-0 -mt-32 flex justify-end"
        >
          <BlogProgress />
        </aside>
      </div>
      <Suspense fallback={<RelatedBlogsSkeleton />}>
        <RelatedBlogs
          currentBlogId={Blog.id}
          categoryId={
            typeof Blog.category === "object" ? Blog.category.id : Blog.category
          }
        />
      </Suspense>
    </div>
  );
}

export default BlogPage;
