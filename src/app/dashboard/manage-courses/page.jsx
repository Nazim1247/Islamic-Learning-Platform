'use client';

import { useEffect, useState } from "react";

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

  const handleEdit = (id) => {
    console.log("Edit course:", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/delete-course`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();

      if (result.success) {
        setCourses(courses.filter((course) => course._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Total Courses: ({courses?.length})</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
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
                  <button
                    onClick={() => handleEdit(course._id)}
                    className="bg-orange-500 text-white px-3 py-1 rounded mr-2 hover:bg-orange-600"
                  >
                    Edit
                  </button>
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
