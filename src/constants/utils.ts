import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// 1. Create a custom instance of twMerge
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // 2. Tell twMerge that "mt-between-content" belongs to the margin-top ("mt") group
      mt: ["mt-between-content"],

      // (Optional) If you have custom text colors fighting each other, add them here too:
      "text-color": [
        "text-secondary-color",
        "text-offBlack-color",
        "text-highlight-text-color",
      ],
    },
  },
});

// 3. Use your new customTwMerge in your cn() function instead of the default one
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
