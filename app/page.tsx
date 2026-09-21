import FeatureAccordionShowcase from "@/components/sections/features";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white font-sans dark:bg-black dark:text-white overflow-x-hidden">
      <Hero />
      <FeatureAccordionShowcase />
      <Footer />
    </div>
  );
}
