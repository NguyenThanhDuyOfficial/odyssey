"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/page/HeroSection";
import FeatureSection from "@/components/page/FeatureSection";
import ReviewSection from "@/components/page/ReviewSection";
import AboutSection from "@/components/page/AboutSection";
import MoreSection from "@/components/page/MoreSection";

export default function Home() {
  return (
    <>
      <Header />
      <div className="">
        <HeroSection />
        <FeatureSection />
        <ReviewSection />
        <AboutSection />
        <MoreSection />
      </div>
      <Footer />
    </>
  );
}
