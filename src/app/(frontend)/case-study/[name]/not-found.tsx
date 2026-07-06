import ButtonLink from "@/components/Buttons/ButtonLink";

export default function CaseStudyNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      {/* Decorative background element for a modern aesthetic */}
      <span
        aria-hidden="true"
        className="font-bebas_neue text-[clamp(80px,15vw,150px)] leading-none text-big-text-font-color opacity-10 select-none pointer-events-none absolute"
      >
        404
      </span>

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="font-bebas_neue text-[clamp(32px,5vw,56px)] uppercase tracking-wide mb-4">
          Project Not Found
        </h2>

        <p className="font-inter text-content-font max-w-125 mb-10">
          We couldn&apos;t find the case study you were looking for. It may have
          been moved, renamed, or doesn&apos;t exist.
        </p>

        <ButtonLink href="/case-studies" variant="primary" arrow={true}>
          View All Projects
        </ButtonLink>
      </div>
    </div>
  );
}
