import { getPayload } from "payload";
import Hero from "@/components/common/hero";
import configPromise  from "@payload-config";
import Sections from "@/features/our-work/components/sections";

async function Page() {
  // Initialize the Payload local API
  const payload = await getPayload({  config: configPromise });

  // Fetch sections sorted by display order
  const workSectionsData = await payload.find({
    collection: "work-sections",
    sort: "order",
    depth: 3, // Depth 3 ensures sections -> projects -> stacks/images are fully populated
  });

  return (
    <>
      <Hero
        title={
          <>
            Ideas Made{" "}
            <span className="text-highlight-text-color font-bold">Visible</span>
          </>
        }
        buttons={{
          firstButton: { text: "Start A Project", href: "/#contact" },
          secondButton: {
            text: "View Our Work",
            href: "#website",
            arrow: false,
            variant: "outline",
          },
        }}
        subtitle="A collection of websites, brands, campaigns & creative assets crafted for businesses across industries"
      />
      {/* Pass the retrieved documents array to your Sections component */}
      <Sections sections={workSectionsData.docs} />
    </>
  );
}

export default Page;
