
import { HeroSection } from "@/components/home/HeroSection";
import { PractitionerSection } from "@/components/home/PractitionerSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";

const Index = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <PractitionerSection />
      <ServicesSection />
      <AboutPreviewSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default Index;
