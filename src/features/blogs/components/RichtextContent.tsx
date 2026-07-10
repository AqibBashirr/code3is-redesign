import { slugify } from "@/lib/slugify";
import { type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import React from "react";

export const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  heading: ({ node, nodesToJSX }) => {
    // Preserve all children (bold, italic, links, etc.)
    const children = nodesToJSX({
      nodes: node.children,
    });

    // Generate the same slug your TOC uses
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;

      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }

      if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
        return extractText(node.props.children);
      }

      return "";
    };

    const text = extractText(children);

    const id = slugify(text);

    switch (node.tag) {
      case "h1":
        return (
          <h1
            id={id}
            className="font-raleway font-semibold text-[clamp(28px,3vw,40px)] leading-[calc(clamp(28px,3vw,40px)+12px)] capitalize"
          >
            {children}
          </h1>
        );

      case "h2":
        return (
          <h2
            id={id}
            className="font-raleway text-(size:--text-h3-font) leading-(--leading-font-h3) font-semibold"
          >
            {children}
          </h2>
        );

      case "h3":
        return (
          <h3
            id={id}
            className="text-(size:--h4-font-size) leading-(--h4-line-height) "
          >
            {children}
          </h3>
        );

      case "h4":
        return (
          <h4
            id={id}
            className="text-(size:--h5-font-size) leading-(--h5-line-height) font-medium"
          >
            {children}
          </h4>
        );

      case "h5":
        return (
          <h5
            id={id}
            className="text-(size:--h5-font-size) leading-(--h5-line-height) font-medium"
          >
            {children}
          </h5>
        );

      case "h6":
        return (
          <h6
            id={id}
            className="text-(size:--h5-font-size) leading-(--h5-line-height) font-medium"
          >
            {children}
          </h6>
        );

      default: {
        return React.createElement(node.tag, { id }, children);
      }
    }
  },
});
