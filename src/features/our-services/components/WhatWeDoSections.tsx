import HeadingPill from "@/components/typography/headingPill";
import { WHAT_WE_DO_DATA } from "@/constants/our-services";
import WhatWeDoSection from "./WhatWeDoSection";
import { Reveal } from "@/components/Reveal";

function WhatWeDoSections() {
  return (
    <>
      {WHAT_WE_DO_DATA.map((WHAT_WE_DO, index) => {
        // Check if this is the last item in the array
        const isLast = index === WHAT_WE_DO_DATA.length - 1;

        return (
          <section
            id={WHAT_WE_DO.title.toLowerCase()}
            key={WHAT_WE_DO.title}
            className="max-w-max mx-auto px-x scroll-mt-(--padding-y)"
          >
            {/* Conditionally apply the border if it's NOT the last item */}
            <Reveal
              y={0}
              opacity={0}
              threshold={0.1}
              className={`py-y ${!isLast ? "border-b border-[#BDBDBD]" : ""}`}
            >
              <HeadingPill>{WHAT_WE_DO.title}</HeadingPill>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 lg:gap-25 mt-between-content">
                {WHAT_WE_DO.childrens.map((item, childIndex) => {
                  return (
                    <Reveal
                      y={0}
                      opacity={0}
                      threshold={0.6}
                      key={`${item.heading.text}-${childIndex}`}
                    >
                      <WhatWeDoSection index={childIndex} data={item} />
                    </Reveal>
                  );
                })}
              </div>
            </Reveal>
          </section>
        );
      })}
    </>
  );
}

export default WhatWeDoSections;
