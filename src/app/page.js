import About from "@/components/About";
import FeaturedCourses from "@/components/FeaturedCourses";
import HeroSection from "@/components/HeroSection";
import TeachersSlider from "@/components/TeachersSection";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto">
      
      <div className="min-h-40">
        <HeroSection />
        <About />
        <WhyChooseUs />
        <FeaturedCourses />
        <TeachersSlider />
      </div>
      
    </div>
  );
}
