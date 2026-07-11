import path from "path";
import { fileURLToPath } from "url";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { cloudinaryStorage } from "payload-cloudinary";

// Your collections
import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { TrustedLogos } from "@/collections/TrustedLogos";
import { CaseStudies } from "@/collections/CaseStudies";
import { Blogs } from "@/collections/Blogs";
import { BlogTags } from "@/collections/BlogTags";
import { BlogCategories } from "@/collections/BlogCategories";

// Create safe ES Module paths
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "fallback-secret-key-for-local-dev",
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor({}),

  typescript: {
    outputFile: path.resolve(dirname, "src/types/payload-types.ts"),
  },

  collections: [
    Users,
    Media,
    TrustedLogos,
    CaseStudies,
    Blogs,
    BlogTags,
    BlogCategories
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  plugins: [
    cloudinaryStorage({
      collections: {
        media: true,
        "trusted-logos": true,
      },
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
        api_key: process.env.CLOUDINARY_API_KEY || "",
        api_secret: process.env.CLOUDINARY_API_SECRET || "",
      },
    }),
  ],
});
