import { Media } from "@/types/payload-types";

export type CloudinaryMedia = Media & {
  cloudinary?: {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
  };
};