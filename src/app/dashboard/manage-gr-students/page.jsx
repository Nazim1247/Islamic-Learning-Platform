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
        const res = await fetch('/api/students/all-students');
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
  toast(
    (t) => (
      <span>
        Are you sure you want to delete this graduate?
        <br />
        <button
          onClick={async () => {
            toast.dismiss(t.id);

            try {
              const res = await fetch(`/api/students/${id}`, {
                method: 'DELETE',
              });

              const data = await res.json();

              if (res.status === 200) {
                setGraduates((prev) => prev.filter((item) => item._id !== id));
                toast.success('Graduate deleted successfully');
              } else {
                toast.error(data.message || 'Failed to delete graduate');
              }
            } catch (error) {
              console.error('Delete error:', error);
              toast.error('Something went wrong');
            }
          }}
          style={{
            marginRight: '10px',
            background: 'red',
            color: 'white',
            borderRadius: '5px',
            padding: '5px 10px',
          }}
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            background: 'gray',
            color: 'white',
            borderRadius: '5px',
            padding: '5px 10px',
          }}
        >
          No
        </button>
      </span>
    ),
    { duration: 10000 }
  );
};


  return (
    <div className="">
      <h2 className="text-2xl font-bold bg-orange-500 text-white px-4 py-1 rounded-t">Total Graduates Students: ({graduates?.length})</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : graduates.length === 0 ? (
        <p className="text-center text-gray-600">No graduate students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-color text-left">
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
