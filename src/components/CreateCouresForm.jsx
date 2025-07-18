"use client";

import { useState } from "react";

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    duration: "",
    schedule: "",
    instructor: "",
    liveClass: false,
    recordedClass: false,
    certificate: false,
    sistersBatch: false,
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const features = [];
  if (formData.liveClass) features.push("📝 Live Classes");
  if (formData.recordedClass) features.push("📺 Recorded Classes");
  if (formData.certificate) features.push("📜 Certificate Provided");
  if (formData.sistersBatch) features.push("🧕 Sisters' Separate Batch");

  const finalCourse = {
    ...formData,
    features,
  };

  try {
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalCourse),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Course Created Successfully!");
      console.log("Mongo Response:", data);
    } else {
      alert("❌ Failed to Create Course");
    }
  } catch (err) {
    console.error("Error submitting course:", err);
    alert("❌ Something went wrong");
  }

  // Reset Form
  setFormData({
    title: "",
    description: "",
    details: "",
    duration: "",
    schedule: "",
    instructor: "",
    liveClass: false,
    recordedClass: false,
    certificate: false,
    sistersBatch: false,
    price: "",
    image: "",
  });
};


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md my-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📌 Create a New Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={2}
          required
        />
        <textarea
          name="details"
          placeholder="Course Details"
          value={formData.details}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 3 Months)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="schedule"
          placeholder="Schedule (e.g. 2 Days/Week)"
          value={formData.schedule}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="instructor"
          placeholder="Instructor (e.g. Qualified Alim)"
          value={formData.instructor}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Features Checkboxes */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="liveClass"
              checked={formData.liveClass}
              onChange={handleChange}
            />
            📝 Live Classes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="recordedClass"
              checked={formData.recordedClass}
              onChange={handleChange}
            />
            📺 Recorded Classes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="certificate"
              checked={formData.certificate}
              onChange={handleChange}
            />
            📜 Certificate
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="sistersBatch"
              checked={formData.sistersBatch}
              onChange={handleChange}
            />
            🧕 Sisters' Batch
          </label>
        </div>

        <input
          type="text"
          name="price"
          placeholder="Price (e.g. ৳1500/month)"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
