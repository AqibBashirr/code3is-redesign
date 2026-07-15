import { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

export const WorkSections: CollectionConfig = {
  slug: "work-sections",

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
        revalidateTag("work-sections", "max");
      },
    ],
    afterDelete: [
      async () => {
        revalidateTag("work-sections", "max");
      },
    ],
  },

  fields: [
    {
      name: "order",
      type: "number",
      required: true,
      admin: {
        position: "sidebar",
        description: "Controls the display order on the frontend (1, 2, 3...)",
      },
    },
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
              admin: {
                description: 'The small category label (e.g., "WEBSITE")',
              },
            },
            {
              name: "heading",
              type: "group",
              fields: [
                {
                  name: "text",
                  type: "text",
                  required: true,
                },
                {
                  name: "highlight",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "description",
              type: "array",
              required: true,
              minRows: 1,
              fields: [
                {
                  name: "paragraph",
                  type: "textarea",
                },
              ],
            },
            {
              name: "projects",
              type: "relationship",
              relationTo: "projects",
              hasMany: true,
              required: true,
              admin: {
                description:
                  "Select the slides/projects to display in this section.",
              },
            },
          ],
        },
      ],
    },
  ],
};
