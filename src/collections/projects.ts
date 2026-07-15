import { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

export const Projects: CollectionConfig = {
  slug: "projects",

  admin: {
    useAsTitle: "title",
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
        revalidateTag("projects", "max");
        // Also revalidate sections since they contain projects
        revalidateTag("work-sections", "max");
      },
    ],
    afterDelete: [
      async () => {
        revalidateTag("projects", "max");
        revalidateTag("work-sections", "max");
      },
    ],
  },

  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "category",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "badge",
              type: "text",
              admin: {
                description: 'Optional tag like "FEATURED"',
              },
            },
            {
              name: "stacks",
              type: "relationship",
              relationTo: "stacks", // This links it to the new collection
              hasMany: true, // Allows selecting multiple stacks (e.g., Next.js AND Figma)
              admin: {
                position: "sidebar", // Moving this to the sidebar makes the UI cleaner for editors
                description: "Select the technologies used in this project",
              },
            },
            {
              name: "cta",
              type: "group",
              fields: [
                { name: "label", type: "text" },
                { name: "href", type: "text" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
