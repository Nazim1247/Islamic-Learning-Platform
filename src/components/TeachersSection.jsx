"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const teachers = [
  {
    name: "Mufti Abdullah Al-Madani",
    subject: "Hadith & Fiqh",
    bio: "Senior scholar with 15+ years teaching classical Hadith and Islamic jurisprudence.",
    image: "/images/teachers/abdullah.jpg",
  },
  {
    name: "Maulana Rafiq Hasan",
    subject: "Quran & Tajweed",
    bio: "Expert in Tajweed and Quran memorization. Guided 300+ students globally.",
    image: "/images/teachers/rafiq.jpg",
  },
  {
    name: "Ustadha Fatima Zahra",
    subject: "Arabic & Tafsir",
    bio: "Qualified Arabic & Tafsir teacher passionate about educating sisters.",
    image: "/images/teachers/fatima.jpg",
  },
  {
    name: "Sheikh Ahmad Noman",
    subject: "Aqeedah & Seerah",
    bio: "Teaches Aqeedah & Seerah with spiritual depth and historical context.",
    image: "/images/teachers/ahmad.jpg",
  },
  {
    name: "Mufti Shakil Rahman",
    subject: "Fiqh & Usul",
    bio: "Specialist in Hanafi Fiqh and Usul. Leads advanced Islamic law classes.",
    image: "/images/teachers/shakil.jpg",
  },
  {
    name: "Ustadh Kareem Ullah",
    subject: "Quran Translation",
    bio: "Teaches Quran with translation and practical understanding.",
    image: "/images/teachers/kareem.jpg",
  },
  {
    name: "Ustadha Zaynab Binte Ali",
    subject: "Tafsir & Tazkiyah",
    bio: "Focuses on purification of heart and understanding Quran deeply.",
    image: "/images/teachers/zaynab.jpg",
  },
  {
    name: "Maulana Imran Qasmi",
    subject: "Arabic Grammar",
    bio: "Expert in Nahw & Sarf. Taught hundreds of Arabic grammar learners.",
    image: "/images/teachers/imran.jpg",
  },
];

const TeachersSlider = () => {
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
    <section className="py-8" id="teachers">
      <div className="px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-4">
          Meet Our Scholars
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Our experienced and qualified Islamic scholars are here to guide you through authentic and structured Islamic knowledge with sincerity, wisdom, and care.
        </p>

        <Slider {...settings}>
          {teachers.map((teacher, idx) => (
            <div key={idx} className="p-3">
              <div className="bg-white rounded-2xl shadow-md p-5 h-full hover:shadow-lg transition-all duration-300 text-center">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
                <p className="text-sm text-green-700 font-medium mb-1">{teacher.subject}</p>
                <p className="text-sm text-gray-600">{teacher.bio}</p>
              </div>
            </div>
          ))}
        </Slider>
        <div className="mt-10">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-2 rounded-xl text-lg shadow-md animate-pulse">
            Enroll Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeachersSlider;
