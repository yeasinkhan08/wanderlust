import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <CtaSection />
      <Footer />
    </>
  );
}
