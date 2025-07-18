import About from "@/components/About";
import FeaturedCourses from "@/components/FeaturedCourses";
import HeroSection from "@/components/HeroSection";


export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto">
      
      <div className="min-h-40">
        <HeroSection />
        <About />
        <FeaturedCourses />
      </div>
      
    </div>
  );
}
