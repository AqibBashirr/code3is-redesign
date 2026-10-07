import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function getSelectedWorks() {
  const fetchCached = unstable_cache(
    async () => {
      const payload = await getPayload({
        config: configPromise,
      });

      const { docs } = await payload.find({
        collection: "selected-works",
        depth: 1,
        limit: 4,
        where: {
          featured: {
            equals: true,
          },
        },
        sort: "sortOrder",
        select: {
          id: true,
          title: true,
          description: true,
          service: true,
          image: true,
          url:true,
          sortOrder: true,
        },
      });

      return docs;
    },
    ["selected-works"],
    {
      tags: ["selected-works"],
    },
  );

  return fetchCached();
}
