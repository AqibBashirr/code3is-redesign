import { CollectionConfig, FieldHook } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidateTag } from "next/cache";
import { slugify } from "payload/shared";

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === "string" && value !== "") {
      return slugify(value);
    }

    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (fallbackData && typeof fallbackData === "string") {
      return slugify(fallbackData);
    }

    return value;
  };

export const Blogs: CollectionConfig = {
  slug: "blogs",

  admin: {
    useAsTitle: "title",
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidateTag("blogs", "max");
        revalidateTag(`blog-${doc.slug}`,'max');
      },
    ],

    afterDelete: [
      async ({ doc }) => {
        revalidateTag("blogs", "max");
        revalidateTag(`blog-${doc.slug}`,'max');
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
      name: "category",
      type: "relationship",
      relationTo: "blog-categories",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "blog-tags",
      hasMany: true,
      admin: {
        position: "sidebar",
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
