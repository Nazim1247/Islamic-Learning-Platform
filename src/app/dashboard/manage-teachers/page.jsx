'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ManageTeachers() {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/teachers');
        const data = await res.json();
        setTeachers(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load teachers');
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this teacher?');
    if (!confirm) return;

    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.status === 200) {
        setTeachers((prev) => prev.filter(teacher => teacher._id !== id));
        router.refresh();
        toast.success('Teacher deleted successfully');
      } else {
        toast.error(data.message || 'Failed to delete teacher');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Manage Teachers</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading teachers...</p>
      ) : teachers.length === 0 ? (
        <p className="text-center text-gray-500">No teachers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher._id} className="bg-white shadow-md p-4 rounded relative">
               <div className='flex items-center gap-2'>
                 <Image src={teacher.image} width={200} height={20} alt='image' className='w-8 h-8 rounded-full'/>
              <h3 className="text-lg font-semibold text-orange-500">{teacher.name}</h3>
               </div>
              <p className="text-xs text-gray-500 mt-1">Email: {teacher.email}</p>
              <p className="text-sm text-gray-600">Subject: {teacher.teachingSubjects}</p>

              <button
                onClick={() => handleDelete(teacher._id)}
                className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
