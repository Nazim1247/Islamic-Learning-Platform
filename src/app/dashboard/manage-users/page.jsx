'use client';

import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user/register");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, currentRole) => {
    
    const nextRole = currentRole === "student"
      ? "teacher"
      : currentRole === "teacher"
      ? "admin"
      : "student";

    try {
      const res = await fetch(`/api/user/register/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: nextRole }),
      });

      const result = await res.json();
      if (result.success) {
        setUsers(users.map((user) =>
          user._id === userId ? { ...user, role: nextRole } : user
        ));
      }
    } catch (error) {
      console.error("Role update error:", error);
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold bg-orange-500 text-white rounded-t px-4 py-2">
        Total Users: ({users?.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-color">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{user.name || "N/A"}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleRoleChange(user._id, user.role)}
                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                  >
                    Make {user.role === "student"
                      ? "Teacher"
                      : user.role === "teacher"
                      ? "Admin"
                      : "Student"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
