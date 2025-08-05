'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

const EditCourseForm = () => {
  const [formData, setFormData] = useState(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses/${id}`);
      const data = await res.json();
      setFormData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  if (id) fetchCourse();
}, [id]);

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

    const updatedCourse = { ...formData, features };

    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
      });

      if (res.ok) {
        toast.success("Course updated successfully");
        router.push("/dashboard/manage-courses");
      } else {
        toast.error("Failed to update");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!formData) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-color rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">
        Update Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
        <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded" rows={2} required />
        <textarea name="details" placeholder="Details" value={formData.details} onChange={handleChange} className="w-full px-4 py-2 border rounded" rows={4} required />
        <input type="text" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
        <input type="text" name="schedule" placeholder="Schedule" value={formData.schedule} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
        <input type="text" name="instructor" placeholder="Instructor" value={formData.instructor} onChange={handleChange} className="w-full px-4 py-2 border rounded" />

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
          {["liveClass", "recordedClass", "certificate", "sistersBatch"].map((field) => (
            <label key={field} className="flex items-center gap-2">
              <input type="checkbox" name={field} checked={formData[field]} onChange={handleChange} />
              {field === "liveClass" && "📝 Live Classes"}
              {field === "recordedClass" && "📺 Recorded Classes"}
              {field === "certificate" && "📜 Certificate"}
              {field === "sistersBatch" && "🧕 Sisters' Batch"}
            </label>
          ))}
        </div>

        <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />

        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourseForm;
