
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Link from 'next/link';

export default function HeroSection() {
  const slides = [
    {
      title: 'Learn Quran with Tajweed',
      subtitle: 'From certified Islamic scholars',
      image: '/images/quran-learning.jpeg',
      buttonText: 'Start Learning',
    },
    {
      title: 'Master Arabic Language',
      subtitle: 'Understand the Quran directly',
      image: '/images/arabic-course.jpeg',
      buttonText: 'Explore Course',
    },
    {
      title: 'Daily Hadith & Tafsir Lessons',
      subtitle: 'Strengthen your Imaan daily',
      image: '/images/hadith-tafsir.jpeg',
      buttonText: 'Join Now',
    },
  ];

  return (
    <div className="w-full h-[500px] relative p-4">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000 }}
        loop
        navigation
        className="w-full h-full rounded-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
  <div className="h-full w-full relative">
    {/* Blurred Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${slide.image})`,
        filter: 'blur(4px) brightness(0.5)',
        transform: 'scale(1.05)',
        zIndex: 0,
      }}
    ></div>

    {/* Foreground Content */}
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="bg-opacity-50 p-6 rounded-xl text-white text-center max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
        <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
        <Link href={'/courses'}>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition">
          {slide.buttonText}
        </button>
        </Link>
      </div>
    </div>
  </div>
</SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
}
