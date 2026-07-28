import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

type DocWithSlug = {
  slug?: string | null;
};

export function makeRevalidateHooks(
  collectionTag: string,
  itemTagPrefix: string,
) {
  const revalidate = ({ doc }: { doc?: DocWithSlug }) => {
    revalidateTag(collectionTag, "max");

    if (doc?.slug) {
      revalidateTag(`${itemTagPrefix}-${doc.slug}`, "max");
    }

    revalidateTag("sitemap", "max");
  };

  return {
    afterChange: [revalidate] as CollectionAfterChangeHook[],
    afterDelete: [revalidate] as CollectionAfterDeleteHook[],
  };
}
