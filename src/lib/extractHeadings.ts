// lib/extractHeadings.ts

import { slugify } from "./slugify";

export interface TocHeading {
  id: string;
  text: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// 1. Define the shape of a generic Lexical node
export interface LexicalNode {
  type?: string;
  text?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: LexicalNode[];
  [key: string]: unknown; // Allows for other Lexical properties without complaining
}

// 2. Define the shape of the top-level Lexical data
export interface LexicalData {
  root?: {
    children?: LexicalNode[];
  };
}


const extractTextFromNode = (node: LexicalNode): string => {
  if (typeof node.text === "string") return node.text;

  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join("");
  }

  return "";
};

// 4. Replaced 'any' with our new 'LexicalData' interface
export function extractHeadings(lexicalData: LexicalData): TocHeading[] {
  if (!lexicalData?.root?.children) return [];

  const headings: TocHeading[] = [];

  for (const node of lexicalData.root.children) {
    // Added a check to ensure node.tag exists to satisfy TypeScript
    if (node.type === "heading" && node.tag) {
      const text = extractTextFromNode(node);

      if (!text.trim()) continue;

      headings.push({
        id: slugify(text),
        text,
        tag: node.tag,
      });
    }
  }

  return headings;
}
