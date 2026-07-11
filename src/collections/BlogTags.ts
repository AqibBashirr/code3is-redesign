import { slugify } from "@/lib/slugify";
import { CollectionConfig, FieldHook } from "payload";

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    // If the user manually typed a slug, just ensure it is formatted correctly
    if (typeof value === "string" && value !== "") {
      return slugify(value);
    }
    
    // If the slug is blank, grab the data from the fallback field (e.g., 'title')
    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (fallbackData && typeof fallbackData === "string") {
      return slugify(fallbackData);
    }

    return value;
  };

export const BlogTags: CollectionConfig = {
  slug: "blog-tags",

  admin: {
    useAsTitle: "title",
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
  ],
};
