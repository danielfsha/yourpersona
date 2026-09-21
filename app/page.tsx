import FeatureAccordionShowcase from "@/components/sections/features";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <Hero />
      <FeatureAccordionShowcase />
      <Footer />
    </div>
  );
}
