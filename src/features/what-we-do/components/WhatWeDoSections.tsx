import HeadingPill from "@/components/typography/headingPill";
import { WHAT_WE_DO_DATA } from "@/constants/what-we-do";
import WhatWeDoSection from "./WhatWeDoSection";

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
            className="max-w-max mx-auto px-x "
          >
            {/* Conditionally apply the border if it's NOT the last item */}
            <div
              className={`py-y ${!isLast ? "border-b border-[#BDBDBD]" : ""}`}
            >
              <HeadingPill>{WHAT_WE_DO.title}</HeadingPill>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 lg:gap-25 mt-between-content">
                {WHAT_WE_DO.childrens.map((item, childIndex) => {
                  return (
                    <WhatWeDoSection
                      key={`${item.heading.text}-${childIndex}`}
                      index={childIndex}
                      data={item}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default WhatWeDoSections;
