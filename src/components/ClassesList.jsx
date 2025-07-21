'use client';

import { useEffect, useState } from "react";

const ClassesList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch("/api/classes");
      const data = await res.json();
    //   console.log("Fetched classes:", data);
      setClasses(data);
    };
    fetchClasses();
  }, []);

  return (
    <div className="max-w-52 mx-auto py-2 px-8 shadow text-center my-2 rounded bg-orange-500 text-white">
        <h2 className="text-xl font-bold">Total Classes</h2>
        <p className="text-lg font-semibold">+ {classes?.data?.length}</p>
    </div>
  );
};

export default ClassesList;
