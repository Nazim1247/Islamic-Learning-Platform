'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaListOl, FaFileAlt } from "react-icons/fa";

const ResultsPage = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch('/api/results/all-results');
      const data = await res.json();
      setResults(data);
    };
    fetchResults();
  }, []);

    return (
        <div className='mt-20 max-w-[1250px] mx-auto p-4'>
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-2">
        All Student Results
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
        Browse through the academic performance of our students. Each result card contains essential details including name, class, roll, and final outcome.
        </p>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    {results.map((result) => (
      
        <div key={result?._id} className="bg-color shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
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
     
    ))}
    </div>
    </div>
    );
};

export default ResultsPage;