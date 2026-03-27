import Banner from "@/components/home/Banner";
import CallToAction from "@/components/home/CallToAction";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
}
