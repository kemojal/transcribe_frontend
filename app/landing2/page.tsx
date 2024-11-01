// pages/index.tsx
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import AudioLoader from "@/components/AudioLoader";

const LandingPage = () => {
  return (
    <div className="bg-secondary min-h-screen bg-primary">
      {/* <Header /> */}
      <div className="">
        {" "}
        {/* Add padding to account for fixed header */}
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
      </div>
      <Footer />
      {/* <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 b-red-500">
        <AudioLoader />
        hello there
      </div> */}
    </div>
  );
};

export default LandingPage;
