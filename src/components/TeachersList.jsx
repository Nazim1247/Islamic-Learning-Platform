'use client';

import { useEffect, useState } from "react";

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      setTeachers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-52 mx-auto py-2 px-8 shadow text-center my-2 rounded bg-orange-500 text-white">
        <h2 className="text-xl font-bold">Total Teachers</h2>
        <p className="text-lg font-semibold">+ {teachers?.length}</p>
    </div>
  );
};

export default TeachersList;
