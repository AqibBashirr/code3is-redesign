import { getPayload } from "payload";
import config from "@payload-config";

export async function getSelectedWorks() {
  const payload = await getPayload({
    config,
  });

  const result = await payload.find({
    collection: "selected-works",
    where: {
      featured: {
        equals: true,
      },
    },
    sort: "sortOrder",
    limit: 6,
  });

  return result.docs;
}
