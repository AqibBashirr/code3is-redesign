import { CollectionConfig, FieldHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import { slugify } from "payload/shared";

const autoIncrementNumber: FieldHook = async ({ req, operation, value }) => {
  if (operation !== "create") return value;

  if (typeof value === "number") {
    return value;
  }

  const last = await req.payload.find({
    collection: "case-studies",
    limit: 1,
    sort: "-number",
    depth: 0,
    select: {
      number: true,
    },
  });

  return (last.docs[0]?.number ?? 0) + 1;
};

const formatSlug: FieldHook = ({ value, data, originalDoc }) => {
  if (typeof value === "string" && value.length > 0) {
    return slugify(value);
  }

  const title = data?.title ?? originalDoc?.title ?? "";

  const highlight = data?.titleHighlight ?? originalDoc?.titleHighlight ?? "";

  return slugify(`${title} ${highlight}`);
};

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",

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
      async ({ doc }) => {
        // Add "max" as the second argument to fix the Next.js 16 TS error
        revalidateTag("case-studies", "max");

        if (doc?.slug) {
          revalidateTag(`case-study-${doc.slug}`, "max");
        }
        revalidatePath("/sitemap.xml");
      },
    ],

    afterDelete: [
      async ({ doc }) => {
        revalidateTag("case-studies", "max");

        if (doc?.slug) {
          revalidateTag(`case-study-${doc.slug}`, "max");
        }
          revalidatePath("/sitemap.xml");
      },
    ],
  },

  fields: [
    {
      name: "number",
      type: "number",

      hooks: {
        beforeChange: [autoIncrementNumber],
      },

      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },

    {
      name: "slug",
      type: "text",
      unique: true,
      required: true,
      index: true,

      hooks: {
        beforeValidate: [formatSlug],
      },

      admin: {
        position: "sidebar",
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
            },

            {
              name: "titleHighlight",
              type: "text",
            },

            {
              name: "description",
              type: "textarea",
            },

            {
              name: "logo",
              type: "upload",
              relationTo: "media",
            },

            {
              name: "mainImage",
              type: "upload",
              relationTo: "media",
            },

            {
              name: "main",
              type: "group",

              fields: [
                {
                  name: "projectAtAGlance",
                  type: "textarea",
                },

                {
                  name: "sections",
                  type: "array",

                  minRows: 1,

                  fields: [
                    {
                      name: "pill",
                      type: "text",
                    },

                    {
                      name: "headingTitle",
                      type: "text",
                    },

                    {
                      name: "headingHighlight",
                      type: "text",
                    },

                    {
                      name: "content",
                      type: "richText",
                    },

                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          label: "SEO",

          fields: [
            {
              name: "metaTitle",
              type: "text",
            },

            {
              name: "metaDescription",
              type: "textarea",
            },

            {
              name: "metaImage",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
      ],
    },
  ],
};
