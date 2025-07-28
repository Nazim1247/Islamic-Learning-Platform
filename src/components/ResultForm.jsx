"use client";

import { useState } from "react";

export default function AddResultForm() {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    class: "",
    subject: "",
    result: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Result submitted successfully");
        setFormData({
          name: "",
          roll: "",
          class: "",
          subject: "",
          result: "",
          imageUrl: "",
        });
      } else {
        alert(result.error || "Failed to submit result");
      }
    } catch (err) {
      alert("Error submitting result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">Add Student Result</h2>
        <form
      onSubmit={handleSubmit}
      className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={formData.name}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="roll"
        placeholder="Roll"
        value={formData.roll}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="class"
        placeholder="Class"
        value={formData.class}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="result"
        placeholder="Result"
        value={formData.result}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      {formData.imageUrl && (
        <img
          src={formData.imageUrl}
          alt="Preview"
          className="h-24 w-24 object-cover rounded"
        />
      )}
      <button
        type="submit"
        className="btn bg-orange-500 hover:bg-orange-600 text-white w-full rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Result"}
      </button>
    </form>
    </div>
  );
}
