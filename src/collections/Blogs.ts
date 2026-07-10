import { CollectionConfig, FieldHook } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

// 1. A utility function to format strings into URL-safe slugs
const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

// 2. The Payload Hook that checks the field or falls back to the title
const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    // If the user manually typed a slug, just ensure it is formatted correctly
    if (typeof value === "string" && value !== "") {
      return format(value);
    }
    
    // If the slug is blank, grab the data from the fallback field (e.g., 'title')
    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (fallbackData && typeof fallbackData === "string") {
      return format(fallbackData);
    }

    return value;
  };

export const Blogs: CollectionConfig = {
  slug: "blogs",
  admin: { useAsTitle: "title" },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    // Useful for showing a short summary on your main /blog page
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({}),
      required: true,
    },
    // SEO Fields grouped together
    {
      name: "meta",
      type: "group",
      admin: {
        position: "sidebar",
      },
      fields: [
        { name: "title", type: "text", label: "SEO Title" },
        { name: "description", type: "textarea", label: "SEO Description" },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "OpenGraph Image",
        },
      ],
    },
  ],
};
