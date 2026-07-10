import { CollectionConfig } from "payload"; 

export const TrustedLogos: CollectionConfig = {
  slug: "trusted-logos",
  upload: true,
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
    },
  ],
};
