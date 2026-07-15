import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customHeights = ["slider"];

const customColors = [
  "background",
  "foreground",
  "secondary-background",
  "highlight-color",
  "off-white-color",
  "footer-bg-color",
  "card-color",
  "overlay-card",
  "primary-color",
  "secondary-color",
  "highlight-text-color",
  "off-white-text-color",
  "offBlack-color",
  "footer-text",
  "big-text-font-color",
  "form-text-color",
];

const customSpacing = [
  "content-gap",
  "between-content",
  "x",
  "y",
  "card-x",
  "card-y",
  "x-card",
  "y-card",
];

const customFonts = ["raleway", "poppins", "inter", "bebas_neue"];
const customFontSizes = ["content-font", "h3-font", "form-text-size"];

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: customFontSizes }],
      "font-family": [{ font: customFonts }],
      leading: [{ leading: ["content-font"] }],
      "text-color": [{ text: customColors }],
      "bg-color": [{ bg: customColors }],
      "border-color": [{ border: customColors }],
      p: [{ p: customSpacing }],
      px: [{ px: customSpacing }],
      py: [{ py: customSpacing }],
      pt: [{ pt: customSpacing }],
      pb: [{ pb: customSpacing }],
      pl: [{ pl: customSpacing }],
      pr: [{ pr: customSpacing }],
      m: [{ m: customSpacing }],
      mx: [{ mx: customSpacing }],
      my: [{ my: customSpacing }],
      mt: [{ mt: customSpacing }],
      mb: [{ mb: customSpacing }],
      ml: [{ ml: customSpacing }],
      mr: [{ mr: customSpacing }],
      gap: [{ gap: customSpacing }],
      h: [{ h: customHeights }],
      "gap-x": [{ "gap-x": customSpacing }],
      "gap-y": [{ "gap-y": customSpacing }],
      "max-w": [{ "max-w": ["max"] }],
      animate: [{ animate: ["services-scroll"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
