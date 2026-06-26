import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { BusinessAreas } from "@/components/BusinessAreas";
import { Projects } from "@/components/Projects";
import { Organization } from "@/components/Organization";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <BusinessAreas />
      <Projects />
      <Organization />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
