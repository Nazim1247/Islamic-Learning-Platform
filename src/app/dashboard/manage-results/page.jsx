'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

export default function ManageResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/results');
        const data = await res.json();
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch results:", error);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this result?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/results/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.status === 200) {
        setResults(prev => prev.filter(item => item._id !== id));
        toast.success('Result deleted successfully');
      } else {
        toast.error('Failed to delete result');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Manage Results</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-600">No results found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Roll</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{result.name}</td>
                  <td className="px-4 py-2">{result.class}</td>
                  <td className="px-4 py-2">{result.roll}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(result._id)}
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
