export default function RelatedBlogsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 px-x mx-auto max-w-max">
      {Array.from({ length: 3 }).map((_, index) => (
        <article
          key={index}
          className="overflow-hidden rounded-[14px] border border-[#2A2A2A]"
        >
          {/* Image */}
          <div className="aspect-[16/10] animate-pulse bg-[#2A2A2A]" />

          <div className="space-y-4 p-5">
            {/* Category */}
            <div className="h-4 w-24 animate-pulse rounded bg-[#2A2A2A]" />

            {/* Title */}
            <div className="space-y-2">
              <div className="h-6 w-full animate-pulse rounded bg-[#2A2A2A]" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-[#2A2A2A]" />
            </div>

            {/* Excerpt */}
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full animate-pulse rounded bg-[#2A2A2A]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#2A2A2A]" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-[#2A2A2A]" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4">
              <div className="h-4 w-24 animate-pulse rounded bg-[#2A2A2A]" />
              <div className="h-4 w-16 animate-pulse rounded bg-[#2A2A2A]" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
