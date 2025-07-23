'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const ManageCourse = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses for this user's email
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/manage-courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        console.log(data);
        setCourses(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchCourses();
  }, [email]);

  // Delete course by ID
  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/delete-course`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        setCourses(courses.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Courses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Course Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{course.name}</td>
                <td className="border px-4 py-2">{course.category}</td>
                <td className="border px-4 py-2 text-center">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCourse;
