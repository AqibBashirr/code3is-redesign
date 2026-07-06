import { QUICK_LINKS } from "@/constants/QuickLinks";
import Logo from "./Logo";
import Link from "next/link";
import { CONTACT_DETAILS } from "@/constants/contact";
import { SOCIALS } from "@/constants/socials";
import { CURRENT_YEAR } from "@/lib/date";
import {
  Facebook,
  Instagram,
  Linkedin,
  Location,
  Mail,
  Phone,
  X,
} from "@/components/icons";
import { Reveal } from "@/components/Reveal";

const Icons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  x: X,
  phone: Phone,
  address: Location,
  email: Mail,
};

function Footer() {
  return (
    <Reveal threshold={0.4}>
      <footer className="bg-black text-[clamp(14px,4vw,16px)] text-footer-text font-normal leading-7 ">
        <div className="mx-auto max-w-max">
          <div className=" flex justify-between flex-wrap gap-9 sm:gap-20 py-y px-x">
            <div className="order-1">
              <Logo />
            </div>

            {/* Quick Links */}
            {/* SEMANTIC FIX: Changed <div> to <nav> and added aria-label */}
            <nav aria-label="Quick Links" className="order-3 md:order-2">
              <h2 className="underline mb-2.5 text-[clamp(14px,2vw,18px)] leading-[calc(clamp(14px,2vw,18px)*2)] font-semibold">
                Quick Links
              </h2>
              <ul className="">
                {QUICK_LINKS.map((link) => {
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-highlight-text-color focus:text-highlight-color focus:bg-highlight-text-color"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            {/* Quick LInks end */}

            {/* Contact DEtails */}
            <address className="max-w-75 order-2 md:order-3 not-italic">
              <ul className="grid grid-cols-[24px_1fr] gap-2.5 md:gap-5 ">
                {CONTACT_DETAILS.map((detail) => {
                  const Icon =
                    Icons[detail.type.toLowerCase() as keyof typeof Icons];
                  return (
                    <li
                      key={detail.type}
                      className="col-span-2 grid grid-cols-subgrid gap-2 items-center group"
                    >
                      <Icon className="w-[clamp(16px,2vw,22px)] transition-colors duration-300 group-hover:text-highlight-text-color group-active:text-highlight-text-color group-focus:text-highlight-color" />

                      <a
                        href={detail.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group-hover:text-highlight-text-color group-active:text-highlight-text-color group-focus:text-highlight-text-color focus:text-highlight-color focus:bg-highlight-text-color"
                      >
                        {detail.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </address>
            {/* Contact Details End */}

            {/* social media links */}
            {/* SEMANTIC FIX: Changed <div> to <nav> and added aria-label */}
            <nav
              aria-label="Social Media"
              className="flex flex-row lg:flex-col gap-5 order-4 items-end"
            >
              {SOCIALS.map((social) => {
                // 'as keyof typeof Social' tells TypeScript this string is a valid key in your Social object
                const Icon =
                  Icons[social.label.toLowerCase() as keyof typeof Icons];

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Code3is ${social.label} page`}
                    className="inline-block group active:text-highlight-text-color focus:text-highlight-color"
                  >
                    <Icon className="w-5 sm:w-7.5 transition-colors duration-300 group-hover:text-highlight-text-color group-active:text-highlight-text-color group-focus:text-highlight-text-color focus:text-highlight-color" />
                  </a>
                );
              })}
            </nav>
            {/* social media links end */}
          </div>
        </div>

        {/* SEMANTIC FIX: Changed nested <footer> to <div> */}
        <div className=" bg-footer-bg-color  py-4.5">
          <div className="mx-auto max-w-max px-x flex justify-center lg:justify-between gap-2.5 md:gap-6 items-center font-thin leading-7.5 flex-wrap">
            <p className="flex flex-col sm:flex-row gap-0 sm:gap-1 items-center">
              <span>Copyright © {CURRENT_YEAR} </span>{" "}
              <span>Code3 Innovative Solutions pvt. Ltd</span>
            </p>

            {/* SEMANTIC FIX: Added aria-label to distinguish from Quick Links nav */}
            <nav
              aria-label="Legal"
              className="flex flex-col sm:flex-row gap-2.5 md:gap-6 items-center font-light "
            >
              <Link
                href="/terms-conditions"
                className="underline hover:text-highlight-text-color focus:text-highlight-color focus:bg-highlight-text-color"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="underline hover:text-highlight-text-color focus:text-highlight-color focus:bg-highlight-text-color"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </Reveal>
  );
}

export default Footer;
