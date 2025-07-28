'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EducationPage() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/classes');
        const result = await res.json();
        if (result.success) {
          setClasses(result.data);
        } else {
          console.error("Failed to fetch classes");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="mt-20 p-4 max-w-[1250px] mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-4">All Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((item, index) => (
          <div key={index} className="rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
  <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2 mb-2">
    📚 {item.className}
  </h2>

  <p className="text-gray-800 mb-1">
    <strong className="text-indigo-600">📖 Books:</strong> {item.books}
  </p>

  <p className="text-gray-800 mb-1">
    <strong className="text-indigo-600">👥 Students:</strong> {item.students}
  </p>

  <p className="text-gray-800 mb-1">
    <strong className="text-indigo-600">⏰ Time:</strong> {item.time}
  </p>

  <p className="text-gray-800 mb-1">
    <strong className="text-indigo-600">📍 Location:</strong> {item.location}
  </p>

  <div className="mt-3">
    <strong className="text-indigo-600">👨‍🏫 Teachers:</strong>
    <ul className="list-disc list-inside text-gray-700 mt-1">
      {item.teachers?.map((teacher, i) => (
        <li key={i}>🎓 {teacher.name} - <span className="text-sm text-gray-600">{teacher.subject}</span></li>
      ))}
    </ul>
  </div>

  <div className="mt-3">
    <strong className="text-indigo-600">📅 Days:</strong> <span className="text-gray-800">{item.days?.join(', ')}</span>
  </div>

  {item.notes && (
    <div className="mt-3 text-sm text-gray-700 border-t pt-2">
      <strong className="text-indigo-600">📝 Notes:</strong> {item.notes}
    </div>
  )}

  {/* Fees Section */}
  <div className="mt-3 text-gray-800 space-y-1">
    <p><strong className="text-indigo-600">💰 Admit Fee:</strong> {item.admitFee ? `৳${item.admitFee}` : 'N/A'}</p>
    <p><strong className="text-indigo-600">📆 Monthly Fee:</strong> {item.monthlyFee ? `৳${item.monthlyFee}` : 'N/A'}</p>
  </div>

  <div className='mt-4'>
    <Link href={'https://forms.gle/dMAxDNnN6UCLiGF27'} target="_blank">
    <button
      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition animate-pulse w-full"
    >
      Admit Now
    </button>
    </Link>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}
