'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaListOl, FaFileAlt } from "react-icons/fa";
import Slider from 'react-slick';

export default function ResultsList() {
    const [results, setResults] = useState([]);
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

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/results');
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        console.error("Invalid data format:", data);
      }
      } catch (err) {
        console.error("Failed to load results", err);
      } 
    };
    fetchResults();
  }, []);

  return (
    <div className='my-8'>
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-2">
        Student Results
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
        Browse through the academic performance of our students. Each result card contains essential details including name, class, roll, and final outcome.
        </p>

    <div className="p-4 -mx-2">
  <Slider {...settings}>
    {results.map((result) => (
      <div key={result?._id} className="px-2">
        <div className="bg-color shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300 mb-4">
          <Image
            src={result.imageUrl}
            alt={result.name}
            width={200} height={200}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2">
            <FaUserGraduate className="text-blue-600" />
            {result.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 flex items-center gap-2 mt-2">
            <FaChalkboardTeacher className="text-green-600" />
            Class: <span className="font-medium">{result.class}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-400 flex items-center gap-2 mt-1">
            <FaListOl className="text-purple-600" />
            Roll: <span className="font-medium">{result.roll}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-400 flex items-center gap-2 mt-1">
            <FaFileAlt className="text-orange-600" />
            Result: <span className="font-medium">{result.result}</span>
          </p>
        </div>
      </div>
    ))}
  </Slider>
</div>

<div className='text-center mt-4'>
  <Link href="/results">
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded shadow transition animate-pulse">
      See All Results
    </button>
  </Link>
</div>
    </div>
  );
}
