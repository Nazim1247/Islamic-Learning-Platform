'use client';

import { useEffect, useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user/register");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-52 mx-auto p-4 shadow text-center my-2 rounded bg-orange-500 text-white">
        <h2 className="text-xl font-bold">Total Users</h2>
        <p className="text-lg font-semibold">+ {users?.length}</p>
    </div>
  );
};

export default UsersList;
