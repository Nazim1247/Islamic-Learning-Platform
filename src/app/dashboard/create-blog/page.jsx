'use client';
import { useState } from 'react';

export default function AddBlogPage() {
  const [form, setForm] = useState({
    image: '',
    title: '',
    author: '',
    content: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.insertedId) {
      alert('Blog submitted successfully!');
      setForm({ image: '', title: '', author: '', content: '' });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 shadow rounded py-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Submit an Islamic Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="image"
          placeholder="Blog Image"
          value={form.image}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={form.author}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Write your blog content here..."
          value={form.content}
          onChange={handleChange}
          rows="6"
          className="w-full p-3 border rounded"
          required
        />
        <button onClick={handleSubmit} type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
