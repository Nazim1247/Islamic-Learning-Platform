import About from "@/components/About";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import HeroSection from "@/components/HeroSection";
import StudentTestimonials from "@/components/StudentTestimonials";
import TeachersSlider from "@/components/TeachersSection";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div className="max-w-[1250px] mx-auto">
      
      <div className="min-h-40 mt-20">
        <HeroSection />
        <About />
        <WhyChooseUs />
        <FeaturedCourses />
        <TeachersSlider />
        <StudentTestimonials />
        <BlogSection />
        <FAQSection />
        <ContactSection />
      </div>
      
    </div>
  );
}
