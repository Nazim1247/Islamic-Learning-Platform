'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
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
      <p className="text-center text-gray-600 mb-4 max-w-3xl mx-auto">Stay informed with short, insightful articles on Islamic lifestyle, rulings, updates, and more — all written by experienced scholars and students of knowledge.</p>
      <div className="p-4 -mx-2">
        <Slider {...settings}>
        {blogs.map((blog) => (
          <div key={blog._id} className='px-4'>
            <div className="bg-white p-5 rounded shadow hover:shadow-md transition mb-8">
            <Image src={blog?.image} width={200} height={200} alt={blog.title} className='w-full h-40 object-cover rounded-md mb-4'/>
            <h2 className="text-xl font-semibold text-green-700 mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-500 mb-1">By: {blog.author}</p>
            <p className="text-gray-700">{blog.content.slice(0, 150)}...</p>
          </div>
          </div>
        ))}
        </Slider>
      </div>
    </div>
  );
}
