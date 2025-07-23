'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch("/api/classes");
      const data = await res.json();
      setClasses(data.data);
    };
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/delete-class`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();

      if (result.success) {
        setClasses(classes.filter((cls) => cls._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 bg-orange-500 text-white px-4 py-1 rounded-t">Total Classes: ({classes?.length})</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Class Name</th>
              <th className="border px-4 py-2">students</th>
              <th className="border px-4 py-2">Admit Fee</th>
              <th className="border px-4 py-2">Monthly Fee</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, index) => (
              <tr key={cls._id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{cls?.className}</td>
                <td className="border px-4 py-2">{cls?.students}</td>
                <td className="border px-4 py-2">${cls?.admitFee}</td>
                <td className="border px-4 py-2">{cls?.monthlyFee}</td>
                <td className="border px-4 py-2 text-center">
                  <Link href={`/dashboard/edit-class/${cls._id}`}>
                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded mr-2 hover:bg-orange-600"
                  >
                    Edit
                  </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(cls._id)}
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

export default ManageClasses;
