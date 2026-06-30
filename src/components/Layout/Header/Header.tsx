import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ButtonLink from "@/components/Buttons/ButtonLink";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-secondary-background text-off-white-color [anchor-name:--header] font-inter sticky top-0 z-100">
      <div className="mx-auto flex  max-w-max items-center justify-between px-x py-3.75">
        <Link
          href="/"
          className="flex items-center gap-2"
          popoverTarget="mobile-menu"
          popoverTargetAction="toggle"
        >
          <Logo loading="eager" />
        </Link>

        <DesktopNav />

        <ButtonLink href="/contact" className="hidden lg:inline-flex">
          Start a Project
        </ButtonLink>
        <div className="flex md:hidden items-center gap-4">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
