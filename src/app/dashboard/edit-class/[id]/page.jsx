'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditClassForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [classData, setClassData] = useState({
    className: "",
    books: "",
    teachers: [{ name: "", subject: "" }],
    students: "",
    time: "",
    days: [],
    location: "",
    notes: "",
    admitFee: "",
    monthlyFee: "",
  });

  const daysList = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Fetch class data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/classes/${id}`);
        if (!res.ok) {
          console.error("Error fetching class:", await res.text());
          return;
        }
        const data = await res.json();

        // Ensure teachers, days exist
        setClassData({
          className: data.className || "",
          books: data.books || "",
          teachers: Array.isArray(data.teachers) && data.teachers.length > 0 ? data.teachers : [{ name: "", subject: "" }],
          students: data.students || "",
          time: data.time || "",
          days: Array.isArray(data.days) ? data.days : [],
          location: data.location || "",
          notes: data.notes || "",
          admitFee: data.admitFee || "",
          monthlyFee: data.monthlyFee || "",
        });
      } catch (err) {
        console.error("Fetch failed:", err.message);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleTeacherChange = (index, field, value) => {
    const updated = [...classData.teachers];
    updated[index][field] = value;
    setClassData({ ...classData, teachers: updated });
  };

  const addTeacherField = () => {
    setClassData({ ...classData, teachers: [...classData.teachers, { name: "", subject: "" }] });
  };

  const handleDayToggle = (day) => {
    const updated = classData.days.includes(day)
      ? classData.days.filter((d) => d !== day)
      : [...classData.days, day];
    setClassData({ ...classData, days: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/classes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classData),
      });

      if (res.ok) {
        alert("Class updated successfully!");
        router.push("/dashboard/manage-classes");
      } else {
        const errMsg = await res.text();
        console.error("Error:", errMsg);
        alert("Failed to update class.");
      }
    } catch (error) {
      console.error("Update error:", error.message);
    }
  };

  return (
    <div id="class">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 bg-white shadow rounded space-y-4">
        <h2 className="text-xl md:text-3xl font-bold text-center text-orange-600 mb-4">Update Class</h2>

        <input
          type="text"
          placeholder="Class Name"
          className="input input-bordered w-full"
          value={classData.className || ""}
          onChange={(e) => setClassData({ ...classData, className: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Books"
          className="input input-bordered w-full"
          value={classData.books || ""}
          onChange={(e) => setClassData({ ...classData, books: e.target.value })}
          required
        />

        <div className="space-y-2">
          <label className="font-semibold">Teachers:</label>
          {classData.teachers.map((teacher, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Teacher Name"
                className="input input-bordered w-1/2"
                value={teacher?.name || ""}
                onChange={(e) => handleTeacherChange(index, "name", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-1/2"
                value={teacher?.subject || ""}
                onChange={(e) => handleTeacherChange(index, "subject", e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-outline mt-1" onClick={addTeacherField}>
            ➕ Add More Teachers
          </button>
        </div>

        <input
          type="number"
          placeholder="Number of Students"
          className="input input-bordered w-full"
          value={classData.students || ""}
          onChange={(e) => setClassData({ ...classData, students: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Class Time"
          className="input input-bordered w-full"
          value={classData.time || ""}
          onChange={(e) => setClassData({ ...classData, time: e.target.value })}
          required
        />

        <div>
          <label className="font-semibold">Class Days:</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {daysList.map((day) => (
              <label key={day} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={classData.days.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
          value={classData.location || ""}
          onChange={(e) => setClassData({ ...classData, location: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Admit Fee"
          className="input input-bordered w-full"
          value={classData.admitFee || ""}
          onChange={(e) => setClassData({ ...classData, admitFee: e.target.value })}
        />

        <input
          type="number"
          placeholder="Monthly Fee"
          className="input input-bordered w-full"
          value={classData.monthlyFee || ""}
          onChange={(e) => setClassData({ ...classData, monthlyFee: e.target.value })}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Additional Notes"
          value={classData.notes || ""}
          onChange={(e) => setClassData({ ...classData, notes: e.target.value })}
        ></textarea>

        <button type="submit" className="btn bg-orange-500 hover:bg-orange-600 rounded text-white w-full">
          Update Class
        </button>
      </form>
    </div>
  );
};

export default EditClassForm;
