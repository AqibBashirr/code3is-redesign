import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Button from "@/components/Buttons/Button";
import Link from "next/link";


export default function Header() {
  return (
    <header className="bg-secondary-background text-off-white-color [anchor-name:--header] font-inter sticky top-0 z-100">
      <div className="mx-auto flex  max-w-max items-center justify-between px-x py-3.75">
        <Link href="/" className="flex items-center gap-2">
          <Logo loading="eager" />
        </Link>

        <DesktopNav />

          <Button href="/contact" className="hidden lg:inline-flex">
            Start a Project
          </Button>
        <div className="flex md:hidden items-center gap-4">

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
