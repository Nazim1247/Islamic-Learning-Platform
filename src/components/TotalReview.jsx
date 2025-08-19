'use client';

import { useEffect, useState } from "react";

const TotalReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("/api/reviews/all-reviews");
      const data = await res.json();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  return (
    <div className="max-w-52 mx-auto py-2 px-8 shadow text-center my-2 rounded bg-orange-500 text-white">
        <h2 className="text-xl font-bold">Total Reviews</h2>
        <p className="text-lg font-semibold">+ {reviews?.length}</p>
    </div>
  );
};

export default TotalReview;
