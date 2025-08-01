"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (Array.isArray(data)) {
        setReviews(data);
      } else {
        console.error("Invalid data format:", data);
      }
      } catch (err) {
        console.error("Failed to load reviews", err);
      }
    };

    getReviews();
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
    <section className="" id="reviews">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">Student Reviews</h2>
        <p className="text-center text-gray-600 mb-4 max-w-xl mx-auto">
          What our students are saying about their learning experience!
        </p>

        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id} className="p-4">
              <div className="bg-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all h-full">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={70}
                    height={70}
                    className="w-18 h-18 rounded-full object-cover border border-gray-300"
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                    <p className="text-gray-600 text-sm"> {review.email}</p>
                    <p className="text-yellow-500 text-sm">⭐ {review.rating}/5</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">❝ {review.comment} ❞</p>
              </div>
            </div>
          ))}
        </Slider>

        <div className='text-center mt-8'>
  <Link href="/reviews">
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded shadow transition animate-pulse">
      See All Reviews
    </button>
  </Link>
</div>
      </div>
    </section>
  );
};

export default ReviewList;
