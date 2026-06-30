import { cn } from "@/constants/utils";


interface HighlightTextHeroProps {
  HighlightText:string;
  className?:string
}
function HighlightTextHero({HighlightText,className}:HighlightTextHeroProps) {
  return (
    <span
      className={cn(
        "text-highlight-text-color font-bold font-raleway",
        className,
      )}
    >
      {HighlightText}
    </span>
  );
}

export default HighlightTextHero