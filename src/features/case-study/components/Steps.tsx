import Image from "next/image";
import HeadingTextH3 from "@/components/typography/HeadingTextH3";
import HeadingPill from "@/components/typography/headingPill";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@payloadcms/richtext-lexical/react";
// 1. Import Payload's official type for the upload node
import { SerializedUploadNode } from "@payloadcms/richtext-lexical";
// 2. Import 'Media' from your generated types alongside CaseStudy
import { CaseStudy, Media } from "@/types/payload-types";

interface StepsProps {
  dataProject?: CaseStudy;
}

function Steps({ dataProject }: StepsProps) {
  return (
    <>
      {dataProject?.main?.sections?.map((data, index) => {
        return (
          <section
            id={data.pill?.toLowerCase().split(" ")[1]}
            key={data.pill}
            className={`flex flex-col md:flex-row gap-grid-content md:items-start max-w-max mx-auto px-x pb-y scroll-mt-24 ${
              index % 2 == 1
                ? "flex-col md:flex-row-reverse"
                : "flex-col md:flex-row"
            }`}
          >
            <Reveal className="left-side flex-1">
              <HeadingPill>{data.pill}</HeadingPill>
              <HeadingTextH3
                highlightText={data.headingHighlight || ""}
                className="mt-between-content"
              >
                {data.headingTitle}
              </HeadingTextH3>
              <Reveal className="case-study max-w-none">
                {data.content && typeof data.content === "object" && (
                  <RichText
                    data={data.content}
                    converters={({ defaultConverters }) => ({
                      ...defaultConverters,
                      // 3. Use the official SerializedUploadNode type
                      upload: ({ node }: { node: SerializedUploadNode }) => {
                        // 4. Narrow the type: Ensure node.value is a populated object, not just a string/number ID
                        if (
                          typeof node.value === "object" &&
                          node.value !== null
                        ) {
                          // Cast to your exact Media type so TS knows 'url' and 'alt' exist
                          const imgData = node.value as Media;

                          // Payload allows 'url' to be null, so we safely check for truthiness
                          if (!imgData.url) return null;

                          return (
                            <div className="relative w-full aspect-video my-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                              <Image
                                src={imgData.url}
                                alt={imgData.alt || "Inline case study image"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 800px"
                                unoptimized
                              />
                            </div>
                          );
                        }

                        // Return null if the media wasn't populated properly
                        return null;
                      },
                    })}
                  />
                )}
              </Reveal>
            </Reveal>
            {data?.image &&
              typeof data.image === "object" &&
              "url" in data.image &&
              data.image.url && (
                <Reveal
                  y={0}
                  x={index % 2 == 1 ? "-40px" : "40px"}
                  threshold={0.4}
                  className="right-side flex-1 align-top"
                >
                  <Image
                    src={data.image.url}
                    width={600}
                    height={600}
                    className="h-full align-top w-full object-contain rounded-[10px] overflow-hidden"
                    alt={data.image.alt || "Case study image"}
                  />
                </Reveal>
              )}
          </section>
        );
      })}
    </>
  );
}

export default Steps;
