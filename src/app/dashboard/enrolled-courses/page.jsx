'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaClock, FaUserGraduate, FaPhoneAlt, FaReceipt } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

export default function EnrolledCourses() {
  const { data: session, status } = useSession();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/enroll`)
        .then((res) => res.json())
        .then((data) => setEnrollments(data))
        .catch((err) => console.error('Failed to fetch enrollments:', err));
    }
  }, [session]);

  if (status === 'loading') {
    return <p className='text-center'>Loading...</p>;
  }

  if (!session) {
    return <p className='text-center'>Please login to see your enrolled courses.</p>;
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Your Enrolled Courses</h2>
      {enrollments.length === 0 ? (
        <p className='text-center'>You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((item) => (
            <div key={item._id} className="p-5 rounded-lg shadow hover:shadow-md bg-color transition duration-300">
  <h3 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">
    {item.course}
  </h3>

  <div className="space-y-2">
    <p className="flex items-center gap-2">
      <FaClock className="text-green-500" />
      <span><strong>Class Time:</strong> {item.timeSlot}</span>
    </p>
    <p className="flex items-center gap-2">
      <FaUserGraduate className="text-purple-500" />
      <span><strong>Qualification:</strong> {item.education}</span>
    </p>
    <p className="flex items-center gap-2">
      <FaPhoneAlt className="text-yellow-500" />
      <span><strong>Phone:</strong> {item.phone}</span>
    </p>
    <p className="flex items-center gap-2">
      <FaReceipt className="text-red-500" />
      <span><strong>Transaction ID:</strong> {item.transactionId}</span>
    </p>
    <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
      <MdDateRange className="text-pink-500" />
      <span>Enrolled on: {new Date(item.createdAt).toLocaleDateString()}</span>
    </p>
  </div>
</div>
          ))}
        </div>
      )}
    </div>
  );
}
