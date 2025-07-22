"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to load reviews", err);
      }
    };

    getReviews();
  }, []);

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
    <section className="py-8" id="reviews">
      <div className="px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">Student Reviews</h2>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
          What our students are saying about their learning experience!
        </p>

        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="p-4">
              <div className="bg-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all h-full">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src={review.image || "/images/user.png"}
                    alt={review.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover border border-gray-300"
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                    <p className="text-yellow-500 text-sm">⭐ {review.rating}/5</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">❝ {review.comment} ❞</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ReviewList;
