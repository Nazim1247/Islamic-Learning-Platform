'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

export default function ManageGRStudents() {
  const [graduates, setGraduates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const res = await fetch('/api/students');
        const data = await res.json();
        setGraduates(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch graduates:", error);
        setLoading(false);
      }
    };
    fetchGraduates();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this graduate?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.status === 200) {
        setGraduates(prev => prev.filter(item => item._id !== id));
        toast.success('Graduate deleted successfully');
      } else {
        toast.error('Failed to delete graduate');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Manage Graduate Students</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : graduates.length === 0 ? (
        <p className="text-center text-gray-600">No graduate students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Class Name</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {graduates.map((grad) => (
                <tr key={grad._id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{grad.name}</td>
                  <td className="px-4 py-2">{grad.address}</td>
                  <td className="px-4 py-2">{grad.className}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(grad._id)}
                      className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
