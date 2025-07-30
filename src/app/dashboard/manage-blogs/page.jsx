'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ManageBlogs() {
    const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
  const confirm = window.confirm('Are you sure you want to delete this blog?');
  if (!confirm) return;

  try {
    const res = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok) {
      setBlogs(prev => prev.filter(blog => blog._id !== id));
      toast.success(data.message || 'Blog deleted successfully');
    } else {
      toast.error(data.message || 'Failed to delete blog');
    }
  } catch (error) {
    console.error('Delete error:', error);
    toast.error('Something went wrong');
  }
};

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Manage Blogs</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded shadow-md p-4 relative group">
              <Image
                src={blog.image}
                width={400}
                height={200}
                alt={blog.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold text-orange-500">{blog.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Author: {blog.author}</p>
              <p className="text-gray-700 text-sm">{blog.content.slice(0, 100)}...</p>

              <button
                onClick={() => handleDelete(blog._id)}
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
