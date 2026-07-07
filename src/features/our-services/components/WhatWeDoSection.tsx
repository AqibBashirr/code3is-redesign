import ButtonLink from "@/components/Buttons/ButtonLink";
import ImageBgContainer from "@/components/common/ImageBgContainer";
import BodyText from "@/components/typography/BodyText";
import HeadingTextH3 from "@/components/typography/HeadingTextH3";

// Renamed the type to be more descriptive since we aren't using the "children" prop
export type SectionDataProps =
  | {
      heading: {
        text?: string;
        highlight: string;
      };
      description: string[];
      image?: never;
    }
  | {
      heading: {
        text: string;
        highlight?: never;
      };
      image: {
        alt: string;
        src: string;
      };
      description?: never;
    };

interface WhatWeDoSectionsProps {
  data: SectionDataProps; // Renamed from children
  index: number;
}

function WhatWeDoSection({ data, index }: WhatWeDoSectionsProps) {
  return (
    <>
      {data.description && (
        <article>
          {data.heading.highlight && (
            <HeadingTextH3 highlightText={data.heading.highlight}>
              {data.heading.text}
            </HeadingTextH3>
          )}

          <div className="mt-between-content flex flex-col gap-space-content">
            {data.description.map((des) => {
              return <BodyText key={des} >{des}</BodyText>;
            })}
          </div>

          <ButtonLink
            href="/#contact"
            variant="dark"
            className={`mt-content-gap ${index === 2 ? "" : "md:hidden"}`}
          >
            Start A Project
          </ButtonLink>
        </article>
      )}

      {data.image && (
        <ImageBgContainer
          src={data.image.src}
          alt={data.heading.text} // Fixed: Now accesses the text string
          width={578}
          height={315}
          bgClass=""
        />
      )}
    </>
  );
}

export default WhatWeDoSection;
