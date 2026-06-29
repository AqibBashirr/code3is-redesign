import BodyText from "@/components/typography/BodyText";
import ButtonLink from "@/components/Buttons/ButtonLink";
import HeadingText from "@/components/typography/headingText";
import { Arrow2 } from "@/components/icons";
import { SERVICES_OVERVIEW } from "@/constants/services";

function Service() {
  return (
    <section className="pb-y max-w-max mx-auto px-x">
      <HeadingText highlightText="Services" className="text-center">
        Our
      </HeadingText>

      <BodyText className="text-center">Real projects. Real results.</BodyText>

      <ul className="pt-content-gap grid grid-cols-1 sm:grid-cols-2 gap-[clamp(24px,3vw,40px)]">
        {SERVICES_OVERVIEW.map((services) => (
          <li
            key={services.title}
            // 1. ADDED: relative overflow-hidden (to contain the gradient)
            // 2. REMOVED: hover:bg-[#1f1f1f] (since we use the radial layer now)
            className="group relative overflow-hidden rounded-lg border border-card-color bg-white shadow-[-4px_4px_0_0px_#3a3a3a] transition-all duration-300 ease-in-out hover:shadow-highlight-text-color"
          >
            {/* THE HIDDEN RADIAL GRADIENT LAYER */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle,#3D3D3D,#1F1F1F)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />

            <a
              href={`/services/${services.title.toLowerCase()}`}
              // 3. ADDED: relative z-10 (keeps content above the background)
              className="relative z-10 block h-full py-card-y px-card-x"
            >
              <div className="flex justify-between items-end h-full">
                <div>
                  {/* INNER TEXT LOGIC: H3 */}
                  <h3
                    // FIXED TYPO: Added space between text-h3-font and text-offBlack-color
                    className="transition-colors duration-300 text-h3-font text-offBlack-color group-hover:text-highlight-text-color"
                  >
                    {services.title}
                  </h3>

                  <ul className="mt-4 flex flex-col gap-2">
                    {services.services.map((service) => {
                      const Icon = service.icon;

                      return (
                        <li
                          key={service.label}
                          className="flex gap-[clamp(10px,2vw,15px)] items-center font-medium transition-colors duration-300 text-offBlack-color group-hover:text-off-white-text-color"
                        >
                          <Icon className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] transition-transform group-hover:scale-110" />
                          <span className="font-medium text-content-font leading-content-font">
                            {service.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* ARROW ICON */}
                <div className="mb-2">
                  <Arrow2 className="w-[clamp(26px,3.5vw,45px)] transition-colors duration-300 text-secondary-color group-hover:text-highlight-text-color" />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <ButtonLink
          href="#"
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
