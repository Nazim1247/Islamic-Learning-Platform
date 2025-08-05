"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await fetch("/api/reviews/all-reviews");
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

  return (
    <section className="mt-20 max-w-[1250px] mx-auto p-4" id="reviews">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">All Student's Reviews</h2>
        <p className="text-center mb-4 max-w-xl mx-auto">
          What our students are saying about their learning experience!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            
              <div key={review._id} className="bg-color rounded-xl p-6 shadow-md hover:shadow-lg transition-all h-full">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src={review.image || "/images/user.png"}
                    alt={review.name}
                    width={70}
                    height={70}
                    className="w-18 h-18 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-orange-500">{review.name}</h3>
                    <p className="text-sm"> {review.email}</p>
                    <p className="text-yellow-500 text-sm">⭐ {review.rating}/5</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">❝ {review.comment} ❞</p>
              </div>
            
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewList;
