import BodyText from "@/components/typography/BodyText";
import ButtonLink from "@/components/Buttons/ButtonLink";
import HeadingText from "@/components/typography/headingText";
import { Arrow2 } from "@/components/icons";
import { SERVICES_OVERVIEW } from "@/constants/services";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

function Service() {
  return (
    <section className="pb-y max-w-max mx-auto px-x">
      <Reveal scale={0.9} duration=".8s" threshold={0.9}>
        <HeadingText highlightText="Services" className="text-center">
          Our
        </HeadingText>

        <BodyText className="text-center">
          Real projects. Real results.
        </BodyText>
      </Reveal>
      <div
        className="pt-content-gap grid grid-cols-1 sm:grid-cols-2 gap-[clamp(24px,3vw,40px)]"
        role="list"
        aria-label="Services Overview"
      >
        {SERVICES_OVERVIEW.map((services, i) => (
          <Reveal
            key={services.title}
            y={"30px"}
            delay={i * 0.15} // Creates the staggered waterfall effect
            threshold={0.4}
            className="w-full h-full"
            role="listitem"
          >
            <div className="group relative h-full overflow-hidden rounded-lg border border-card-color bg-white shadow-[-4px_4px_0_0px_#3a3a3a] transition-all duration-300 ease-in-out hover:shadow-highlight-text-color">
              {/* THE HIDDEN RADIAL GRADIENT LAYER - Hidden from screen readers */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle,#3D3D3D,#1F1F1F)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              />

              <Link
                href={`/what-we-do#${services.title.toLowerCase()}`}
                className="relative z-10 block h-full py-card-y px-card-x"
              >
                <div className="flex justify-between items-end h-full">
                  <div>
                    {/* INNER TEXT LOGIC: H3 */}
                    <h3 className="transition-colors duration-300 text-h3-font text-offBlack-color group-hover:text-highlight-text-color font-raleway">
                      {services.title}
                    </h3>

                    {/* INNER LIST: This is perfectly valid HTML since it doesn't have a Reveal component breaking it */}
                    <ul className="mt-4 flex flex-col gap-2">
                      {services.services.map((service) => {
                        const Icon = service.icon;

                        return (
                          <li
                            key={service.label}
                            className="flex gap-[clamp(10px,2vw,15px)] items-center font-medium transition-colors duration-300 text-offBlack-color group-hover:text-off-white-text-color"
                          >
                            {/* Icon hidden from screen readers to prevent redundant announcements */}
                            <Icon
                              aria-hidden="true"
                              className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] transition-transform group-hover:scale-110 shrink-0"
                            />
                            <span className="font-medium text-content-font leading-content-font">
                              {service.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* ARROW ICON - Hidden from screen readers */}
                  <div className="mb-2 shrink-0" aria-hidden="true">
                    <Arrow2 className="w-[clamp(26px,3.5vw,45px)] transition-colors duration-300 text-secondary-color group-hover:text-highlight-text-color" />
                  </div>
                </div>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="text-center">
        <ButtonLink
          href="#contact"
          variant="dark"
          className="mt-[calc(var(--content-gap)+5px)]"
        >
          Start a Project
        </ButtonLink>
      </div>
    </section>
  );
}

export default Service;
