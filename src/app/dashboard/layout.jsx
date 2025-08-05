'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  FaBars, FaTimes, FaChalkboardTeacher, FaUserGraduate, FaUserCog, FaBookOpen,
  FaListUl, FaPlus, FaUsers, FaClipboardList, FaChartLine, FaTasks,
  FaBlogger
} from 'react-icons/fa';
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";


const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role || 'student';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => pathname === path;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Admin Menu
  const adminLinks = [
    { href: '/dashboard/create-course', label: 'Create Course', icon: <FaPlus /> },
    { href: '/dashboard/create-class', label: 'Create Class', icon: <FaChalkboardTeacher /> },
    { href: '/dashboard/teacher-registration', label: 'Register Teacher', icon: <FaUserCog /> },
    { href: '/dashboard/student-registration', label: 'Graduates Student Form', icon: <FaUserGraduate /> },
    { href: '/dashboard/result', label: 'Create a Result', icon: <BsFillFileEarmarkSpreadsheetFill /> },
    { href: '/dashboard/create-blog', label: 'Create a Blog', icon: <FaBlogger /> },
    { href: '/dashboard/manage-blogs', label: 'Manage Blogs', icon: <FaBlogger /> },
    { href: '/dashboard/manage-results', label: 'Manage Results', icon: <BsFillFileEarmarkSpreadsheetFill /> },
    { href: '/dashboard/manage-courses', label: 'Manage Courses', icon: <FaClipboardList /> },
    { href: '/dashboard/manage-gr-students', label: 'Manage GR Students', icon: <FaUserGraduate /> },
    { href: '/dashboard/manage-classes', label: 'Manage Classes', icon: <FaListUl /> },
    { href: '/dashboard/manage-reviews', label: 'Manage Reviews', icon: <FaListUl /> },
    { href: '/dashboard/manage-teachers', label: 'Manage Teachers', icon: <FaUserCog /> },
    { href: '/dashboard/manage-users', label: 'Manage Users', icon: <FaUsers /> },
    { href: '/dashboard/site-analytics', label: 'Site Analytics', icon: <FaChartLine /> },
  ];

  // Teacher Menu
  const teacherLinks = [
    { href: '/dashboard/my-classes', label: 'My Classes', icon: <FaChalkboardTeacher /> },
    { href: '/dashboard/assigned-courses', label: 'Assigned Courses', icon: <FaBookOpen /> },
    { href: '/dashboard/student-list', label: 'Student List', icon: <FaUsers /> },
    { href: '/dashboard/grade-submissions', label: 'Grade Submissions', icon: <FaTasks /> },
  ];

  // Student Menu
  const studentLinks = [
    { href: '/dashboard/enrolled-courses', label: 'Enrolled Courses', icon: <FaBookOpen /> },
    { href: '/dashboard/my-results', label: 'My Results', icon: <FaChartLine /> },
    { href: '/dashboard/class-schedule', label: 'Class Schedule', icon: <FaListUl /> },
    { href: '/dashboard/submit-assignment', label: 'Submit Assignment', icon: <FaTasks /> },
  ];

  const getSidebarLinks = () => {
    switch (userRole) {
      case 'admin':
        return adminLinks;
      case 'teacher':
        return teacherLinks;
      case 'student':
      default:
        return studentLinks;
    }
  };

  return (
    <div className='mt-16 md:mt-4 px-4 max-w-[1250px] mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-center py-4 border-b'>
        <h2 className="md:hidden flex text-2xl md:text-3xl font-bold text-orange-600">Dashboard</h2>
        <button onClick={toggleSidebar} className='md:hidden text-2xl'>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className='flex flex-col md:flex-row gap-4 mt-6'>
        {/* Sidebar */}
        <aside className={`md:w-1/5 md:border-r w-full md:block ${isSidebarOpen ? 'block' : 'hidden'} bg-color shadow md:shadow-none rounded`}>
          <h3 className='text-lg font-semibold text-orange-500 mb-4 capitalize'>{userRole} Menu</h3>
          <ul className='space-y-2'>
            {getSidebarLinks().map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-1 rounded hover:bg-gray-700 hover:text-orange-500 transition ${
                    isActive(link.href) ? 'text-orange-600 font-semibold' : ''
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className='md:w-4/5 w-full rounded shadow'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
