import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ButtonLink from "@/components/Buttons/ButtonLink";
import Link from "next/link";
import HeaderScrollWrapper from "./HeaderScrollWrapper";

export default function Header() {
  return (
    <HeaderScrollWrapper>
      <div className="mx-auto flex max-w-max items-center justify-between px-x py-3.75">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Logo fetchPriority="high"  />
        </Link>

        <DesktopNav />

        <ButtonLink href="/#contact" className="hidden lg:inline-flex">
          Start a Project
        </ButtonLink>

        <div className="flex md:hidden items-center gap-4">
          <MobileNav />
        </div>
      </div>
    </HeaderScrollWrapper>
  );
}
