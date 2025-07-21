'use client';

import { useEffect, useState } from "react";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/courses");
      const data = await res.json();
    //   console.log("Fetched courses:", data);
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-52 mx-auto py-2 px-8 shadow text-center my-2 rounded bg-orange-500 text-white">
        <h2 className="text-xl font-bold">Total Courses</h2>
        <p className="text-lg font-semibold">+ {courses?.length}</p>
    </div>
  );
};

export default CoursesList;
