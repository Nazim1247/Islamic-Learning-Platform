'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

const handleDelete = async (id) => {
  toast.info(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this course?</p>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={async () => {
              closeToast();

              try {
                const res = await fetch(`/api/delete-course`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id }),
                });
                const result = await res.json();

                if (result.success) {
                  setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
                  toast.success('Course deleted successfully');
                } else {
                  toast.error(result.message || 'Failed to delete course');
                }
              } catch (error) {
                console.error("Delete error:", error);
                toast.error('Something went wrong');
              }
            }}
            style={{ background: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '3px' }}
          >
            Yes
          </button>
          <button
            onClick={() => closeToast()}
            style={{ background: 'gray', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '3px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    }
  );
};


  return (
    <div className="">
      <h2 className="text-2xl font-bold bg-orange-500 text-white px-4 py-1 rounded-t">Total Courses: ({courses?.length})</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-color text-left">
            <tr>
              <th className="border px-4 py-1">#</th>
              <th className="border px-4 py-1">Image</th>
              <th className="border px-4 py-1">Title</th>
              <th className="border px-4 py-1">Price</th>
              <th className="border px-4 py-1">Instructor</th>
              <th className="border px-4 py-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td className="border px-4 py-1 text-center">{index + 1}</td>
                <td className="border px-4 py-1">
                  <img
                    src={course.image || "/placeholder.jpg"}
                    alt={course.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-1">{course.title}</td>
                <td className="border px-4 py-1">${course.price}</td>
                <td className="border px-4 py-1">{course.instructor || "N/A"}</td>
                <td className="border px-4 py-1 text-center">
                  <Link href={`/dashboard/edit-course/${course._id}`}>
                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded mr-2 hover:bg-orange-600"
                  >
                    Edit
                  </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;
