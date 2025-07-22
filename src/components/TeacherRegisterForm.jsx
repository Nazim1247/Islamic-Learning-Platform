'use client';
import { useState } from 'react';

export default function TeacherRegisterForm() {
  const [formData, setFormData] = useState({
    name: '',fatherName: '',motherName: '',email: '',phone: '',image: '',gender: '',dob: '',nationality: '',nid: '',address: '',qualification: '',institution: '',department: '',experience: '',teachingSubjects: '',availableTime: '',salaryExpectation: '',joiningDate: '',additionalNotes: '',role: "",bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (result.success) {
      alert("Teacher Registered Successfully!");
      setFormData({
    name: '',fatherName: '',motherName: '',email: '',phone: '',image: '',gender: '',dob: '',nationality: '',nid: '',address: '',qualification: '',institution: '',department: '',experience: '',teachingSubjects: '',availableTime: '',salaryExpectation: '',joiningDate: '',additionalNotes: '',role: "",bio: "",
  });
    } else {
      alert("Failed to Register Teacher");
    }
  } catch (err) {
    console.error(err);
    alert("Server error!");
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-20">
      <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">Teacher Registration Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="w-full input input-bordered"
              required={true}
            />
          </div>
        ))}

        <div className="md:col-span-2 mt-4">
          <button type="submit" className="btn bg-orange-500 hover:bg-orange-600 text-white rounded w-full">
            Register Teacher
          </button>
        </div>
      </form>
    </div>
  );
}
