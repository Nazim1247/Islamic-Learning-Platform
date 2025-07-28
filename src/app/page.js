"use client";
import About from "@/components/About";
import BlogSection from "@/components/BlogSection";
import ClassesList from "@/components/ClassesList";
import ContactSection from "@/components/ContactSection";
import CoursesList from "@/components/CoursesList";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import ResultsList from "@/components/ResultList";
import ReviewsList from "@/components/ReviewsList";
import StudentsPage from "@/components/StudentsList";
import TeachersList from "@/components/TeachersList";
import TeachersListSlide from "@/components/TeachersListSlide";
import UsersList from "@/components/UsersList";
import WhyChooseUs from "@/components/WhyChooseUs";
import Slider from "react-slick";


export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 10000,
    slidesToShow: 5,
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
      
      <div className="min-h-40 mt-16">
        <HeroSection />

        <Slider {...settings}>
        <div>
          <UsersList /> 
        </div>
        <div>
          <TeachersList />
        </div>
        <div>
          <StudentsPage />
        </div>
        <div>
          <ClassesList />
        </div>
        <div>
          <CoursesList />
        </div>
        </Slider>

        <ResultsList />
        <About />
        <WhyChooseUs />
        <ReviewsList />
        <TeachersListSlide />
        <BlogSection />
        <FAQSection />
        <ContactSection />
      </div>
      
    </div>
  );
}
