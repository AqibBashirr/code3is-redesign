import { CaseStudySection } from "../types/caseStudy.types";
import BodyText from "@/components/typography/BodyText";

// 1. Define the props using your exported type
interface ChallengeSectionProps {
  challange: CaseStudySection;
}

// 2. Define the types for our text-parsing blocks
type HeadingBlock = { type: "heading"; text: string };
type HeadingH5Block = { type: "headingh5"; text: string };
type ListBlock = { type: "list"; items: string[] };
type TextBlock = { type: "text"; text: string };

type Block = HeadingBlock | HeadingH5Block | ListBlock | TextBlock;

export default function ChallengeSection({ challange }: ChallengeSectionProps) {
  // 3. Group the descriptions into formatted blocks
  const blocks: Block[] = [];
  let currentList: string[] | null = null;

  challange.description.forEach((des: string) => {
    if (des.includes("•")) {
      if (!currentList) currentList = [];
      currentList.push(des.replace("•", "").trim());
    } else {
      // If we were building a list, push it and reset
      if (currentList) {
        blocks.push({ type: "list", items: currentList });
        currentList = null;
      }

      // FIX: Use an if / else if / else chain so a string only gets pushed once
      if (des.includes("----")) {
        // 5 dashes = H5
        blocks.push({ type: "headingh5", text: des.replace(/-/g, "").trim() });
      } else if (des.includes("---")) {
        // 4 dashes = H4
        blocks.push({ type: "heading", text: des.replace(/-/g, "").trim() });
      } else {
        // Normal text
        blocks.push({ type: "text", text: des });
      }
    }
  });

  // Catch any remaining list items at the end of the array
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

        if (block.type === "headingh5") {
          return (
            <h5
              key={index}
              className="font-semibold text-[clamp(14px,2vw,18px)] leading-[calc(clamp(14px,2vw,18px)+12px)]"
            >
              {block.text}
            </h5>
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
        return (
          <BodyText key={index} className="mt-0">
            {block.text}
          </BodyText>
        );
      })}
    </div>
  );
}
