import { Arrow2 } from "@/components/icons";
import { CASE_STUDY } from "@/constants/casestudy";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

type Process = (typeof CASE_STUDY.processes)[number];

export function ProcessCard({ process }: { process: Process & {href:string} }) {
  const Icon = process.icon;

  return (
    <Link
      href={`${process.href}/#${process.title.toLowerCase()}`}
      className="block group"
      aria-label={process.title}
    >
      <article className="card bg-[radial-gradient(circle,#3D3D3D,#1F1F1F)] rounded-lg px-x-card py-y-card max-w-[449px] text-off-white-text-color flex justify-between gap-6.5 transition-all duration-300  hover:shadow-xl hover:shadow-black/20">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex ">
            <div className="flex-1">
              {process.icon && (
                <Icon className="text-highlight-text-color w-[clamp(30px,6vw,38px)] h-[clamp(30px,6vw,38px)] stroke-1 mb-6 transition-transform duration-300 group-hover:scale-110" />
              )}

              <h4 className="text-highlight-text-color font-light text-[22px] leading-7 transition-colors duration-300 group-hover:text-white">
                {process.title}
              </h4>
            </div>
            <Arrow2 className="w-7.5 h-fit md:hidden transition-transform duration-300 group-hover:translate-x-2" />
          </div>

          {"description" in process && (
            <p className="border-t-[0.01px] pt-2 border-b-white">
              {process.description}
            </p>
          )}

          {"items" in process && (
            <ul>
              {process.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 items-center transition-transform duration-300 "
                >
                  <CircleCheckBig className="text-highlight-text-color h-3.25" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="self-end hidden md:block">
          <Arrow2 className="w-11 transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </article>
    </Link>
  );
}
