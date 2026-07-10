import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    // Email and Password fields are automatically injected by 'auth: true'.
    // We will just add a Name field so you know who is logged in.
    {
      name: "name",
      type: "text",
    },
  ],
};
