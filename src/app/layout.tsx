import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Montserrat, Poppins, Raleway } from "next/font/google";
import Header from "@/components/Layout/Header/Header";
import Aside from "@/components/Layout/Aside/Aside";
import Footer from "@/components/Layout/Footer/Footer";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montserrat = Montserrat({
  variable: "--font-poppins",
  subsets: ["latin"],
});
const vanguard = localFont({
  src: "./fonts/vanguard.otf",
});

export const metadata: Metadata = {
  title: "Code3 Innovative Solutions",
  description:
    "CODE3IS is a software development company that specializes in creating innovative solutions for businesses. We are dedicated to helping our clients achieve their goals through the use of cutting-edge technology and creative problem-solving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${raleway.variable} ${montserrat.variable} ${vanguard.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <Aside />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
