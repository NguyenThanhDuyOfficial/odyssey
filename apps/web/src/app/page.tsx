"use client";

import Header from "@/components/page/Header";
import Footer from "@/components/page/Footer";
import HeroSection from "@/components/page/HeroSection";
import FeatureSection from "@/components/page/FeatureSection";
import ReviewSection from "@/components/page/ReviewSection";
import AboutSection from "@/components/page/AboutSection";
import MoreSection from "@/components/page/MoreSection";
import FadeIn from "@/components/animation/FadeIn";

export default function Home() {
  return (
    <>
      <Header />
      <div className="">
        <HeroSection />
        <FadeIn>
          <FeatureSection />
        </FadeIn>
        <FadeIn>
          <ReviewSection />
        </FadeIn>
        <FadeIn>
          <AboutSection />
        </FadeIn>
        <FadeIn>
          <MoreSection />
        </FadeIn>
      </div>
      <Footer />
    </>
  );
}
