import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Navbar />
      <div className="min-h-40">
        <HeroSection />
        <h1>Home Page</h1>
      </div>
      <Footer />
    </div>
  );
}
