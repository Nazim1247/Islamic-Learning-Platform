'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserGraduate, FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import Slider from "react-slick";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
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
    const fetchStudents = async () => {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  return (
    <div className="px-4 pb-8">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-2">
        Our Proud Graduates
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
        Our students who have completed their studies from this institution are now shining across the globe in various fields. We proudly present some of their remarkable achievements.
      </p>

      <div className="p-4 -mx-2">
        <Slider {...settings}>
        {students.map((student) => (
          <div key={student._id} className="px-2">
            <div className="bg-color shadow-md rounded-lg p-5 hover:shadow-xl transition duration-300 mb-4">
            <Image
              src={student?.image}
              width={200}
              height={200}
              alt={student.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-orange-600 flex items-center gap-2">
              <FaUserGraduate className="text-blue-600" />
              {student.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mt-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              Location: {student.address || "Unknown"}
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2 flex items-center gap-2">
              <FaGraduationCap className="text-green-600" />
              Completed: {student.className || "Not specified"}
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-1 flex items-center gap-2">
              <FaBriefcase className="text-purple-600" />
              Current Job: {student.role || "N/A"}
            </p>
            
          </div>
          </div>
        ))}
        </Slider>
      </div>

      <div className='text-center mt-4'>
  <Link href="/students">
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded shadow transition animate-pulse">
      See All Students
    </button>
  </Link>
</div>
    </div>
  );
}
