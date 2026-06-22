import HeaderNavLinks from "./HeaderNavLinks";

export default function DesktopNav() {

  return (
    <nav className="hidden md:flex items-center gap-8">
      <HeaderNavLinks />      
    </nav>
  );
}
