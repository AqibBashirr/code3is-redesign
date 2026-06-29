import type { Metadata } from "next";
import {
  Bebas_Neue,
  Inter,
  Montserrat,
  Poppins,
  Raleway,
} from "next/font/google";
import Header from "@/components/Layout/Header/Header";
import Aside from "@/components/Layout/Aside/Aside";
import Footer from "@/components/Layout/Footer/Footer";
import "./globals.css";

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas_neue",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
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
      className={`${inter.variable} ${poppins.variable} ${raleway.variable} ${montserrat.variable} ${bebas_neue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col scrollbar-thin">
        <Header />
        <Aside />
        <main className="flex-1 ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
