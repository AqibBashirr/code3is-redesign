import HeadingPill from "@/components/typography/headingPill";
import { WHAT_WE_DO_DATA } from "@/constants/what-we-do";
import WhatWeDoSection from "./WhatWeDoSection";


function WhatWeDoSections() {
  return (
    <>
      {WHAT_WE_DO_DATA.map((WHAT_WE_DO) => {
        return (
          <section
            id={WHAT_WE_DO.title.toLowerCase()}
            key={WHAT_WE_DO.title}
            className="max-w-max mx-auto px-x ]"
          >
            <div className="py-y border-b last-of-type:border-b-0 border-[#BDBDBD] ">
              <HeadingPill>{WHAT_WE_DO.title}</HeadingPill>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 lg:gap-25 mt-between-content">
                {WHAT_WE_DO.childrens.map((item, index) => {
                  return (
                    <WhatWeDoSection
                      key={`${item.heading.text}-${index}`}
                      index={index}
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

export default WhatWeDoSections