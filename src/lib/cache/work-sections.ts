import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { WorkSection } from "@/types/payload-types";

export async function getWorkSections(): Promise<WorkSection[]> {
  const fetchCached = unstable_cache(
    async () => {
      const payload = await getPayload({
        config: configPromise,
      });

      const { docs } = await payload.find({
        collection: "work-sections",
        sort: "order",
        depth: 3, // Depth 3 ensures sections -> projects -> stacks/images are fully populated
      });

      return docs as WorkSection[];
    },
    ["work-sections-list"],
    {
      tags: ["work-sections"],
    },
  );

  return fetchCached();
}
