import Button from "@/components/Buttons/Button";
import { Arrow2 } from "@/components/icons";
import { SELECTED_SERVICES } from "@/constants/selectedWork";


function SelectedWork() {
  return (
    <section className="py-y max-w-max mx-auto px-x">
      <h2 className="font-raleway font-semibold text-center text-[clamp(28px,3vw,40px)]">
        Selected Work That{" "}
        <span className="underline underline-offset-7 decoration-highlight-text-color italic">
          Performs
        </span>
      </h2>

      <p className="text-center mt-3.5 text-secondary-color">
        Real projects. Real results.
      </p>

      <ul className="pt-content-gap grid grid-cols-1 md:grid-cols-2 justify-items-center place-content-center gap-[clamp(24px,3vw,40px)] px-0 2xl:px-10">
        {SELECTED_SERVICES.map((services) => (
          <li
            key={services.title}
            className="group flex-1 rounded-lg border transition-all duration-300 border-card-color shadow-[-4px_4px_0_0px_#3a3a3a] hover:bg-[radial-gradient(circle,#3D3D3D,#1F1F1F)] hover:shadow-highlight-text-color max-w-[clamp(330px,38vw,524px)] relative overflow-hidden"
          >
            <span className="bg-secondary-background min-w-[calc(50%+20px)] px-2.5 py-1 text-center absolute right-0 top-0 text-highlight-text-color uppercase font-raleway text-xs sm:text-sm tracking-widest">{services.service}</span>
            <a
              href={`/services/${services.title.toLowerCase().replaceAll(' ','-')}`}
              className="flex flex-col h-full p-[clamp(7px,2vw,11px)] pb-[clamp(18px,2vw,31px)]"
            >
              {/* 3. FIXED: Changed w-[clamp...] to w-full so it perfectly matches the card's padding, kept the height clamp, and added mb-4 for spacing */}
              <div className="w-full rounded-md mb-4 h-[clamp(242px,27vw,389px)] bg-[#E3E3E3]"></div>

              {/* 4. FIXED: Added 'flex-1' so this section takes up the remaining height, pushing the arrow perfectly to the bottom */}
              <div className="flex flex-1 justify-between items-end gap-[clamp(10px,2vw,40px)] px-2 sm:px-3.5">
                <div>
                  {/* INNER TEXT LOGIC: H3 */}
                  <h3 className="transition-colors text-h3-font font-semibold duration-300 text-offBlack-color group-hover:text-highlight-text-color">
                    {services.title}
                  </h3>

                  {/* Added mt-2 just to give the description a tiny bit of breathing room from the title */}
                  <p className="mt-2 text-content-font group-hover:text-off-white-text-color transition-colors duration-300">
                    {services.description}
                  </p>
                </div>

                {/* ARROW ICON */}
                {/* 5. FIXED: Added 'shrink-0' so a really long description doesn't squish your arrow! */}
                <div className="mb-2 shrink-0">
                  <Arrow2 className="w-[clamp(24px,3.5vw,38px)] transition-colors duration-300 text-secondary-color group-hover:text-highlight-text-color" />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="text-center">
                <Button href="#" variant="dark" className="mt-13.75">Start a Project</Button>
            </div>
    </section>
  );
}

export default SelectedWork;
