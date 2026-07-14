import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    // 1. Convert everything to WebP to save massive amounts of storage
    formatOptions: {
      format: "webp",
      options: {
        quality: 80, // Adjust 0-100
      },
    },
    // 2. Prevent users from uploading unnecessarily huge 4K/8K images
    resizeOptions: {
      width: 1920,
      withoutEnlargement: true, // Won't scale up small images
    },
    // (Optional) Generate specific sizes like thumbnails
    // imageSizes: [
    //   {
    //     name: 'thumbnail',
    //     width: 400,
    //     height: 300,
    //   },
    // ],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "textarea",
    },
  ],
};
