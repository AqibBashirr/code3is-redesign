import { CollectionConfig, FieldHook } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { slugify } from "payload/shared";
import { revalidatePath, revalidateTag } from "next/cache";

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === "string" && value.length > 0) {
      return slugify(value);
    }

    const fallbackData = data?.[fallback] ?? originalDoc?.[fallback];

    if (typeof fallbackData === "string") {
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
        // Clears all paginated lists (Page 1, Page 2, etc.)
        revalidateTag("blogs",'max');

        // Clears the specific blog article that was just updated
        if (doc?.slug) {
          revalidateTag(`blog-${doc.slug}`,'max');
        }

        // FIXES YOUR SITEMAP: Clears the cached sitemap.xml
        revalidatePath("/sitemap.xml");
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        revalidateTag("blogs",'max');

        if (doc?.slug) {
          revalidateTag(`blog-${doc.slug}`,'max');
        }

        revalidatePath("/sitemap.xml");
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
      required: true,
      unique: true,
      index: true,

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

    {
      name: "meta",
      type: "group",

      admin: {
        position: "sidebar",
      },

      fields: [
        {
          name: "title",
          type: "text",
          label: "SEO Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "SEO Description",
        },
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
