import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const SelectedWorks: CollectionConfig = {
  slug: "selected-works",

  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "service", "featured", "sortOrder", "updatedAt"],
  },

  hooks: {
    afterChange: [
      async () => {
        revalidateTag("selected-works", "max");
      },
    ],

    afterDelete: [
      async () => {
        revalidateTag("selected-works", "max");
      },
    ],
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "description",
      type: "textarea",
      required: true,
    },

    {
      name: "service",
      type: "text",
      required: true,
      admin: {
        description: "Example: Web Development, Branding, UI/UX Design",
      },
    },

    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Show this project in the Selected Work section.",
      },
    },
    {
      name: "url",
      required: true,
      type: "text",
      admin: {
        description: "Link to the project or case study.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first.",
      },
    },
  ],
};
