import { CollectionConfig, FieldHook } from "payload";

// 1. Hook: Auto-increment the project number
const autoIncrementNumber: FieldHook = async ({ req, operation, value }) => {
  if (operation === "create" && (value === undefined || value === null)) {
    const lastCaseStudy = await req.payload.find({
      collection: "case-studies",
      sort: "-number",
      limit: 1,
      depth: 0,
    });

    const highestNumber =
      typeof lastCaseStudy.docs[0]?.number === "number"
        ? lastCaseStudy.docs[0].number
        : 0;

    return highestNumber + 1;
  }
  return value;
};

// 2. Hook: Auto-generate a URL-friendly slug from the title
const formatSlug: FieldHook = ({ value, data }) => {
  const fallbackData = (data?.title + ' ' + data?.titleHighlight ||
    data?.id) as string;
  const stringToFormat = value || fallbackData;

  if (typeof stringToFormat === "string") {
    return stringToFormat
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s-]+/g, "-");
  }
  return value;
};

// 3. The Main Collection Configuration
export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    // --- SIDEBAR FIELDS (Always Visible) ---
    {
      name: "number",
      type: "number",
      hooks: {
        beforeChange: [autoIncrementNumber],
      },
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "Auto-generates the next sequential number.",
      },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [formatSlug],
      },
      admin: {
        position: "sidebar",
        description:
          "Auto-generated from the title for the URL. (e.g., my-project-name)",
      },
    },

    // --- TABBED INTERFACE ---
    {
      type: "tabs",
      tabs: [
        {
          label: "Content", // First Tab
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "titleHighlight",
              type: "text",
              admin: {
                description: "The colored/highlighted word in the main heading",
              },
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
              admin: {
                description: "The main hero image showing all the screens",
              },
            },
            {
              name: "main",
              type: "group",
              fields: [
                {
                  name: "projectAtAGlance",
                  type: "textarea",
                  admin: { description: "Brief summary of the project" },
                },
                {
                  name: "sections",
                  type: "array",
                  minRows: 1,
                  fields: [
                    {
                      name: "pill",
                      type: "text",
                      admin: {
                        description: "e.g., The Challenge, The Approach",
                      },
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
          label: "SEO", // Second Tab
          fields: [
            {
              name: "metaTitle",
              type: "text",
              admin: {
                description:
                  "Title used for search engines and browser tabs. Ideal length: 50-60 characters.",
              },
            },
            {
              name: "metaDescription",
              type: "textarea",
              admin: {
                description:
                  "Description used for search engine results. Ideal length: 150-160 characters.",
              },
            },
            {
              name: "metaImage",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Image used when sharing this case study on social media platforms (Open Graph).",
              },
            },
          ],
        },
      ],
    },
  ],
};
