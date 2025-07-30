'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const TeachersListSlide = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await fetch('/api/teachers');
      const data = await res.json();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

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
    <div className="px-4 my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-4">
          Meet Our Scholars
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Our experienced and qualified Islamic scholars are here to guide you through authentic and structured Islamic knowledge with sincerity, wisdom, and care.
        </p>
      <Slider {...settings}>
        {teachers.map((teacher) => (
          <div key={teacher._id} className="px-2 py-4">
            <div className="bg-white shadow-lg hover:shadow-xl rounded-md p-4 text-center">
              <Image src={teacher.image} width={200} height={200} alt={teacher.name} className="w-24 h-24 rounded-full mx-auto mb-3" />
              <h3 className="text-xl font-bold">{teacher.name}</h3>
              <p className="text-orange-500">{teacher.email}</p>
              <p className="text-gray-700 mt-1">{teacher.phone}</p>
              <p className="text-gray-700 mt-1">{teacher.qualification}</p>
              <p className="text-sm text-gray-600">{teacher.teachingSubjects}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TeachersListSlide;
