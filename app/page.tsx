import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { heroText, orgName } from "@/langData";
import { Metadata } from "next";
import Map from "@/components/Maps";
import HeaderUz from "@/components/Header";

export const metadata: Metadata = {
  title: orgName.uz,
  description: heroText.uz,
  // other metadata
};

export default function Home() {
  return (
    <>
      <HeaderUz/>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />

      <AboutSectionOne />
      <AboutSectionTwo />
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      {/* <Blog /> */}
      {/* <Contact /> */}
      <Brands />
      <Map />
    </>
  );
}
