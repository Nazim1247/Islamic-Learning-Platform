'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserGraduate, FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from "react-icons/fa";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students/all-students");
        const data = await res.json();
        setStudents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="mt-20 max-w-[1250px] mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-2">
        Our Proud Graduates
      </h1>
      <p className="text-center mb-8 max-w-3xl mx-auto">
        Our students who have completed their studies from this institution are now shining across the globe in various fields. We proudly present some of their remarkable achievements.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student._id} className="bg-color shadow-md rounded-lg p-5 hover:shadow-xl transition duration-300">
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
            <p className="mt-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              Location: {student.address || "Unknown"}
            </p>
            <p className="mt-2 flex items-center gap-2">
              <FaGraduationCap className="text-green-600" />
              Completed: {student.className || "Not specified"}
            </p>
            <p className="mt-1 flex items-center gap-2">
              <FaBriefcase className="text-purple-600" />
              Current Job: {student.role || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
