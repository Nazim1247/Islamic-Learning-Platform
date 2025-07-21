"use client";
import About from "@/components/About";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import HeroSection from "@/components/HeroSection";
import StudentsPage from "@/components/StudentsList";
import StudentTestimonials from "@/components/StudentTestimonials";
import TeachersList from "@/components/TeachersList";
import TeachersSlider from "@/components/TeachersSection";
import UsersList from "@/components/UsersList";
import WhyChooseUs from "@/components/WhyChooseUs";
import Slider from "react-slick";


export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 10000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-[1250px] mx-auto">
      
      <div className="min-h-40 mt-20">
        <HeroSection />
        
        <div className="flex">
          <UsersList />
          <TeachersList />
          <StudentsPage />
        </div>
        
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
