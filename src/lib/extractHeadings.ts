// lib/extractHeadings.ts

import { slugify } from "./slugify";

export interface TocHeading {
  id: string;
  text: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// Generic Lexical node
export interface LexicalNode {
  type?: string;
  text?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: LexicalNode[];
  [key: string]: unknown;
}

// Top-level Lexical data
export interface LexicalData {
  root?: {
    children?: LexicalNode[];
  };
}

// Extract all text from a Lexical node
const extractTextFromNode = (node: LexicalNode): string => {
  if (typeof node.text === "string") {
    return node.text;
  }

  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join("");
  }

  return "";
};

export function extractHeadings(lexicalData: LexicalData): TocHeading[] {
  if (!lexicalData?.root?.children) {
    return [];
  }

  const headings: TocHeading[] = [];

  for (const node of lexicalData.root.children) {
    // Only process heading nodes
    if (node.type !== "heading" || !node.tag) {
      continue;
    }

    // Extract heading text
    const text = extractTextFromNode(node).trim();

    // Ignore empty headings
    if (!text) {
      continue;
    }

    headings.push({
      id: slugify(text),
      text,
      tag: node.tag,
    });
  }

  return headings;
}
