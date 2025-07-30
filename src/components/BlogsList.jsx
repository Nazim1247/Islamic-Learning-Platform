'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaUserAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Islamic Articles & Blogs</h1>
      <p className="text-center text-gray-600 mb-4 max-w-3xl mx-auto">
        Stay informed with short, insightful articles on Islamic lifestyle, rulings, updates, and more — all written by experienced scholars and students of knowledge.
      </p>

      <div className="p-4 -mx-2">
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div key={blog._id} className='px-4'>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Image
                  src={blog?.image}
                  width={400}
                  height={250}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-orange-500 mb-2 hover:underline cursor-pointer transition">
                    {blog.title}
                  </h2>

                  <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                    <div className="flex items-center gap-1">
                      <FaUserAlt className="text-green-600" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRegCalendarAlt className="text-blue-600" />
                      <span>{new Date(blog.date || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {blog.content?.slice(0, 150)}...
                  </p>

                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="mt-4 text-sm font-semibold text-red-600 hover:underline"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal */}
      {selectedBlog && (
        <div
          className="fixed inset-0 z-50 bg-opacity-50 flex justify-center items-center px-4"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="bg-gray-100 max-w-2xl w-full rounded-lg shadow-lg overflow-auto max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
              onClick={() => setSelectedBlog(null)}
            >
              <IoClose size={24} />
            </button>
            <Image
              src={selectedBlog.image}
              width={700}
              height={400}
              alt={selectedBlog.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-orange-600 mb-2">{selectedBlog.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
                <div className="flex items-center gap-1">
                  <FaUserAlt className="text-green-600" />
                  <span>{selectedBlog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaRegCalendarAlt className="text-blue-600" />
                  <span>{new Date(selectedBlog.date || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedBlog.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
