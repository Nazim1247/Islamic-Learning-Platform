'use client';

import { useEffect, useState } from "react";

const TotalSubscribes = () => {
  const [subscribes, setSubscribes] = useState([]);

  useEffect(() => {
    const fetchSubscribes = async () => {
      const res = await fetch("/api/subscribe");
      const data = await res.json();
      setSubscribes(data);
    };
    fetchSubscribes();
  }, []);

  return (
    <div className="max-w-52 mx-auto py-2 px-4 shadow text-center my-2 rounded bg-orange-500 text-white">
        <h2 className="text-xl font-bold">Total Subscriber</h2>
        <p className="text-lg font-semibold">+ {subscribes?.length}</p>
    </div>
  );
};

export default TotalSubscribes;
