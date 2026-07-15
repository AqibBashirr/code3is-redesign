import { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

export const Stacks: CollectionConfig = {
  slug: "stacks",

  admin: {
    useAsTitle: "name",
  },

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  hooks: {
    afterChange: [
      async () => {
        revalidateTag("stacks", "max");
        revalidateTag("projects", "max");
      },
    ],
    afterDelete: [
      async () => {
        revalidateTag("stacks", "max");
        revalidateTag("projects", "max");
      },
    ],
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: 'E.g., "Next.js", "Figma", "React"',
      },
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload an SVG or PNG logo for this technology",
      },
    },
    {
      name: "url",
      type: "text",
      admin: {
        description: "Optional: Link to the official website of the tech",
      },
    },
  ],
};
