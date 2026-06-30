import Image from "next/image";
import { CaseStudySection } from "../types/caseStudy.types";
import BodyText from "@/components/typography/BodyText";

// 1. Define the props using your exported type
interface ChallengeSectionProps {
  challange: CaseStudySection;
}

// 2. Define the types for our text-parsing blocks
type HeadingBlock = { type: "heading"; text: string };
type ListBlock = { type: "list"; items: string[] };
type TextBlock = { type: "text"; text: string };

type Block = HeadingBlock | ListBlock | TextBlock;

export default function ChallengeSection({ challange }: ChallengeSectionProps) {
  // 3. Group the descriptions into formatted blocks
  const blocks: Block[] = [];
  let currentList: string[] | null = null;

  challange.description.forEach((des: string) => {
    if (des.includes("•")) {
      if (!currentList) currentList = [];
      currentList.push(des.replace("• ", "").trim());
    } else {
      if (currentList) {
        blocks.push({ type: "list", items: currentList });
        currentList = null;
      }

      if (des.includes("---")) {
        blocks.push({ type: "heading", text: des.replace(/-/g, "").trim() });
      } else {
        blocks.push({ type: "text", text: des });
      }
    }
  });

  if (currentList) {
    blocks.push({ type: "list", items: currentList });
  }

  // 4. Render the component
  return (
      <div className="flex flex-col mt-content-gap gap-[1ch]">
        {blocks.map((block: Block, index: number) => {
          if (block.type === "heading") {
            return (
              <h4
                key={index}
                className="font-semibold text-[clamp(16px,2vw,22px)] leading-[calc(clamp(16px,2vw,22px)+12px)]"
              >
                {block.text}
              </h4>
            );
          }

          if (block.type === "list") {
            return (
              <ul key={index} className="list-disc list-inside">
                {block.items.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="text-content-font leading-[calc(var(--content-font-size)+12px)] font-poppins text-secondary-color not-last-of-type:py-2 "
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          // TypeScript automatically knows block is a TextBlock here
          return <BodyText key={index} className="mt-0">{block.text}</BodyText>;
        })}
      </div>
    
  );
}
