'use client';
import { useState } from "react";
import { toast } from "react-toastify";

export default function StudentRegistrationForm() {
  const initialState = {
    name: "",email: "",phone: "",gender: "",image: "",dob: "",fatherName: "",motherName: "",address: "",className: "",roll: "",section: "",admissionDate: "",previousSchool: "",guardianPhone: "",bloodGroup: "",nationality: "",religion: "",presentAddress: "",permanentAddress: "",role: "",bio: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    toast.success("Student Registered Successfully!");
    setFormData(initialState);
  } else {
    toast.error("Failed to register student.");
  }
};


  return (
    <div className="max-w-4xl mx-auto p-4 bg-color shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Student Registration Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(initialState).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="capitalize text-sm mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="input input-bordered w-full px-3 py-2 border rounded"
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Register Student
          </button>
        </div>
      </form>
    </div>
  );
}
