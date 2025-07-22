"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaUser,
  FaUserTie,
  FaUsers,
  FaBookOpen,
  FaPlusCircle,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen mt-20 flex flex-col md:flex-row bg-white text-gray-800 max-w-[1250px] mx-auto">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block md:w-64 w-full md:static fixed top-0 left-0 z-20 bg-gray-100 border-r shadow-lg md:mt-0 mt-16 p-4 m-4`}
      >
        <h2 className="text-xl font-bold text-orange-600 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <SidebarLink icon={<FaUser />} label="Manage Users" />
          <SidebarLink icon={<FaUserTie />} label="Manage Teachers" />
          <SidebarLink icon={<FaUsers />} label="Manage Students" />
          <SidebarLink icon={<FaBookOpen />} label="Manage Courses" />
          <SidebarLink
            icon={<FaPlusCircle />}
            label="Create Course"
            href="/create-course"
          />
          <SidebarLink
            icon={<FaPlusCircle />}
            label="Create Class"
            href="/create-class"
          />
          <SidebarLink
            icon={<FaChalkboardTeacher />}
            label="Teacher Registration"
            href="/teacher-registration"
          />
          <SidebarLink
            icon={<FaGraduationCap />}
            label="Student Registration"
            href="/student-registration"
          />
        </nav>
      </aside>

      {/* Toggle Button (Mobile Only) */}
      <button
        className="md:hidden fixed top-16 left-4 z-50 bg-orange-500 text-white p-2 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-4 md:ml-0">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">
          Welcome to Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Users" value="1,254" icon={<FaUser />} />
          <StatsCard title="Teachers" value="34" icon={<FaUserTie />} />
          <StatsCard title="Students" value="1,020" icon={<FaUsers />} />
          <StatsCard title="Courses" value="58" icon={<FaBookOpen />} />
        </div>

        {/* Main Dashboard Content Placeholder */}
        <div className="mt-10 p-6 rounded-lg shadow bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Latest Activity</h2>
          <p className="text-gray-600">
            You can show user activities or logs here...
          </p>
        </div>
      </main>
    </div>
  );
};

// Sidebar Link component
const SidebarLink = ({ icon, label, href = "#" }) => (
  <Link
    href={href}
    className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-md">{label}</span>
  </Link>
);

// Stats Card component
const StatsCard = ({ title, value, icon }) => (
  <div className="p-4 rounded-lg shadow bg-white flex items-center gap-4">
    <div className="text-3xl text-orange-500">{icon}</div>
    <div>
      <h4 className="text-sm">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminPage;
