"use client";
import Slider from "react-slick";

const features = [
  {
    title: "Qualified Scholars",
    description:
      "Our courses are led by certified scholars with years of teaching and Islamic knowledge experience.",
    icon: "📚",
  },
  {
    title: "Flexible Schedule",
    description:
      "Attend classes at your convenience with our flexible morning and evening batches.",
    icon: "⏰",
  },
  {
    title: "One-on-One Class",
    description:
      "Get personalized guidance with our dedicated one-on-one learning sessions.",
    icon: "👨‍🏫",
  },
  {
    title: "Certificates Provided",
    description:
      "Get recognized with certificates after successful completion of your course.",
    icon: "📜",
  },
  {
    title: "Sisters' Separate Batch",
    description:
      "We offer separate batches for sisters to ensure a comfortable and private learning environment.",
    icon: "🧕",
  },
  {
    title: "Affordable Pricing",
    description:
      "Our pricing is designed to be affordable for everyone, with quality never compromised.",
    icon: "💰",
  },
  {
    title: "Recorded Classes",
    description:
      "Missed a class? No worries! Get access to class recordings anytime.",
    icon: "🎥",
  },
  {
    title: "Supportive Community",
    description:
      "Join a supportive group of learners and grow together with motivation and brotherhood.",
    icon: "🤝",
  },
];

const WhyChooseUs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="pb-8">
      <div className="px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-4">Why Choose Us?</h2>
        <p className="text-gray-600 mb-8 px-4 max-w-5xl mx-auto">
          Discover how our Islamic Learning Platform blends traditional scholarship with flexible online education to serve students around the world. With expert teachers, one-on-one support, and a wide range of courses — we aim to make authentic Islamic knowledge accessible, affordable, and deeply impactful for everyone.
        </p>

        <Slider {...settings}>
          {features.map((feature, index) => (
            <div key={index} className="p-4">
              <div className="bg-white rounded-2xl shadow-md p-6 h-[200px] flex flex-col justify-start items-center hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-4">{feature.description}</p>
              </div>
            </div>
          ))}
        </Slider>

      </div>
    </section>
  );
};

export default WhyChooseUs;
