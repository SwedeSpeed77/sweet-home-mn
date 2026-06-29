import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AwardsStrip from "@/components/AwardsStrip";
import ProductsSection from "@/components/ProductsSection";
import WhereWhenSection from "@/components/WhereWhenSection";
import AboutSection from "@/components/AboutSection";
import CustomOrdersCTA from "@/components/CustomOrdersCTA";
import Footer from "@/components/Footer";
import DemoBar from "@/components/DemoBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AwardsStrip />
        <ProductsSection />
        <WhereWhenSection />
        <AboutSection />
        <CustomOrdersCTA />
      </main>
      <Footer />
      <DemoBar />
    </>
  );
}
