// app/students/page.jsx or any component
'use client';
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  return (
    <div className="max-w-52 mx-auto py-2 px-8 shadow text-center my-2 rounded bg-orange-500 text-white">
        <h2 className="text-xl font-bold">Total Students</h2>
        <p className="text-lg font-semibold">+ {students?.length}</p>
    </div>
  );
}
