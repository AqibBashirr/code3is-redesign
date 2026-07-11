import AvailService from "@/features/home/components/Availservice";
import Contact from "@/features/home/components/contact";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AvailService />
      <Contact />
    </>
  );
}

export default Layout