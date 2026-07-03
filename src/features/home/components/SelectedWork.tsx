import BodyText from "@/components/typography/BodyText";
import ButtonLink from "@/components/Buttons/ButtonLink";
import { Arrow2 } from "@/components/icons";
import { SELECTED_SERVICES } from "@/constants/selectedWork";
import HeadingText from "@/components/typography/headingText";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";

function SelectedWork() {
  return (
    <section className="py-y max-w-max mx-auto px-x">
      <Reveal
        scale={0.9}
        duration=".8s"
        threshold={0.9}
        className="overflow-hidden"
      >
        <HeadingText
          highlightText="Performs"
          highlightClassName="italic"
          className="text-center "
        >
          Selected Work That
        </HeadingText>

        <BodyText className="text-center capitalize">
          Real projects. Real results.
        </BodyText>
      </Reveal>
      <div
        className="pt-content-gap grid grid-cols-1 md:grid-cols-2 justify-center gap-[clamp(24px,3vw,40px)] px-0 2xl:px-10"
        role="list"
        aria-label="Selected Services"
      >
        {SELECTED_SERVICES.map((services, i) => (
          <Reveal
            key={services.title}
            scale={0.9}
            delay={i * 0.4}
            threshold={0.2}
            className="w-full"
            role="listitem" /* Tells the screen reader this is a list item */
          >
            <div className="group w-full mx-auto rounded-lg border transition-all duration-300 ease-in-out border-card-color bg-white shadow-[-4px_4px_0_0px_#3a3a3a] hover:shadow-highlight-text-color max-w-[clamp(330px,38vw,524px)] relative overflow-hidden box">
              {/* THE HIDDEN RADIAL GRADIENT LAYER */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle,#3D3D3D,#1F1F1F)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              />

              {/* THE BADGE */}
              <span className="z-20 bg-secondary-background px-5.5 py-2 text-center absolute right-0 top-0 text-highlight-text-color uppercase font-raleway text-xs sm:text-sm tracking-widest">
                {services.service}
              </span>

              {/* THE MAIN CONTENT LINK */}
              <Link
                href={`/case-study/${services.title.toLowerCase().replaceAll(" ", "-")}`}
                className="relative z-10 flex flex-col h-full p-[clamp(7px,2vw,11px)] pb-[clamp(18px,2vw,31px)]"
              >
                {/* VISUAL PLACEHOLDER - Hidden from screen readers */}
                <Image
                  src={services.image.src}
                  alt={services.image.alt}
                  width={524}
                  height={389}
                  quality={100}
                  aria-hidden="true"
                  className="w-full rounded-md mb-4 h-[clamp(242px,27vw,389px)] bg-[#E3E3E3]"
                ></Image>

                <div className="flex flex-1 justify-between items-end gap-[clamp(10px,2vw,40px)] px-2 sm:px-3.5">
                  <div>
                    <h3 className="transition-colors text-h3-font font-semibold duration-300 text-offBlack-color group-hover:text-white font-raleway">
                      {services.title}
                    </h3>

                    <BodyText className="mt-1.5 group-hover:text-white transition-colors duration-300">
                      {services.description}
                    </BodyText>
                  </div>

                  {/* ARROW ICON - Hidden from screen readers */}
                  <div className="mb-2 shrink-0" aria-hidden="true">
                    <Arrow2 className="w-[clamp(24px,3.5vw,38px)] transition-colors duration-300 text-secondary-color group-hover:text-highlight-text-color" />
                  </div>
                </div>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="text-center">
        <ButtonLink href="#" variant="dark" className="mt-13.75">
          Start a Project
        </ButtonLink>
      </div>
    </section>
  );
}

export default SelectedWork;
