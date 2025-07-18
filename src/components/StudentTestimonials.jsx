"use client";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Abdullah",
    feedback:
      "I’ve learned so much about the Qur’an and Hadith through this platform. The explanations are clear and easy to follow. Alhamdulillah!",
    image: "/images/students/mamun.jpg",
  },
  {
    name: "Fatema Noor",
    feedback:
      "Being able to study Islam from home is a blessing. The teachers are kind, respectful, and very knowledgeable.",
    image: "/images/students/fatema.jpg",
  },
  {
    name: "Rashidul Islam",
    feedback:
      "The Arabic Grammar course helped me understand the Qur’an better. Lessons were practical and well-structured.",
    image: "/images/students/rashid.jpg",
  },
  {
    name: "Tahmina Akter",
    feedback:
      "I loved the flexibility of recorded sessions and live classes. It helped me stay consistent with my learning.",
    image: "/images/students/tahmina.jpg",
  },
  {
    name: "Nashit Hasan",
    feedback:
      "The one-on-one sessions were incredibly effective. I received full attention and guidance from my teacher.",
    image: "/images/students/nashit.jpg",
  },
  {
    name: "Samira Rahman",
    feedback:
      "Alhamdulillah, I finally found an Islamic institute where women can learn comfortably and effectively.",
    image: "/images/students/samira.jpg",
  },
  {
    name: "Imran Chowdhury",
    feedback:
      "The Certificate at the end of the course really motivated me to complete every module. Great learning experience!",
    image: "/images/students/imran.jpg",
  },
  {
    name: "Lubaba Islam",
    feedback:
      "The platform is well organized. Teachers are well-qualified and the support system is great. Highly recommended!",
    image: "/images/students/lubaba.jpg",
  },
];

const StudentTestimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    responsive: [{ breakpoint: 1024, settings: { slidesToShow: 1 } }],
  };

  return (
    <section className="py-8" id="testimonials">
      <div className="px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-4">Student Testimonials</h2>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
          Hear what our students have to say about their learning journey at our Islamic platform.
        </p>

        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="p-4">
              <div className="bg-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all h-full">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover border border-gray-300"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">❝ {t.feedback} ❞</p>
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

export default StudentTestimonials;
