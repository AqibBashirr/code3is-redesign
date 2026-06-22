import Button from "@/components/Buttons/Button";
import { Arrow2 } from "@/components/icons";
import { SERVICES_OVERVIEW } from "@/constants/services";

function Service() {
  return (
    <section className="pb-y max-w-max mx-auto px-x">
      <h2 className="font-raleway font-semibold text-center text-[clamp(28px,3vw,40px)]">
        Our{" "}
        <span className="underline underline-offset-7 decoration-highlight-text-color">
          Services
        </span>
      </h2>

      <p className="text-center mt-3.5 text-secondary-color">
        Real projects. Real results.
      </p>

      <ul className="pt-content-gap grid grid-cols-1 sm:grid-cols-2 gap-[clamp(24px,3vw,40px)]">
        {SERVICES_OVERVIEW.map((services) => (
          <li
            key={services.title}
            className={`group rounded-lg border transition-all duration-300 ${
              services.title === "Design"
                ? "border-card-color bg-[radial-gradient(circle,#3D3D3D,#1F1F1F)] shadow-[-3px_3px_0_0px_#bbfd58] sm:shadow-[-4px_4px_0_0px_#bbfd58] hover:bg-[linear-gradient(white,white)] hover:shadow-[-4px_4px_0_0px_#3a3a3a]"
                : "border-card-color shadow-[-4px_4px_0_0px_#3a3a3a] hover:bg-[radial-gradient(circle,#3D3D3D,#1F1F1F)] bg-[linear-gradient(white,white)]  hover:shadow-highlight-text-color"
            }`}
          >
            <a
              href={`/services/${services.title.toLowerCase()}`}
              className="block h-full py-card-y px-card-x"
            >
              <div className="flex justify-between  items-end h-full">
                <div>
                  {/* INNER TEXT LOGIC: H3 */}
                  <h3
                    className={`transition-colors duration-300 text-h3-font ${
                      services.title === "Design"
                        ? "text-highlight-text-color group-hover:text-offBlack-color"
                        : "text-offBlack-color group-hover:text-highlight-text-color"
                    }`}
                  >
                    {services.title}
                  </h3>

                  <ul className="mt-4 flex flex-col gap-2">
                    {services.services.map((service) => {
                      const Icon = service.icon;

                      return (
                        <li
                          key={service.label}
                          className={`flex gap-[clamp(10px,2vw,15px)] items-center font-medium transition-colors duration-300 ${
                            services.title === "Design"
                              ? "text-off-white-text-color group-hover:text-offBlack-color"
                              : "text-offBlack-color group-hover:text-off-white-text-color"
                          }`}
                        >
                          <Icon className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] transition-transform group-hover:scale-110" />
                          <span className="font-medium  text-content-font leading-content-font">
                            {service.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* ARROW ICON */}
                <div className="mb-2">
                  <Arrow2
                    className={`w-[clamp(26px,3.5vw,45px)] transition-colors duration-300 ${
                      services.title === "Design"
                        ? "text-highlight-text-color group-hover:text-secondary-color"
                        : "text-secondary-color group-hover:text-highlight-text-color"
                    }`}
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <Button
          href="#"
          variant="dark"
          className="mt-[calc(var(--content-gap)+5px)]"
        >
          Start a Project
        </Button>
      </div>
    </section>
  );
}

export default Service;
