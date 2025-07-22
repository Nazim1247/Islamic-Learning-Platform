'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
// console.log(session)
  const user = session?.user;
  const role = user?.role || 'student';

  const isActive = (path) => pathname === path;

  const goToDashboard = () => {
    if (role === 'admin') router.push('/dashboard/admin');
    else if (role === 'teacher') router.push('/dashboard/teacher');
    else router.push('/dashboard/student');
  };

  // const isAdmin = role === 'admin';

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="navbar shadow-sm max-w-[1250px] mx-auto px-4 py-3">

        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              <li><Link className={isActive('/') ? 'text-orange-500 font-semibold' : ''} href="/">Home</Link></li>
              <li><Link className={isActive('/education') ? 'text-orange-500 font-semibold' : ''} href="/education">Educations</Link></li>
              <li>
                <details>
                  <summary>Services</summary>
                  <ul className="p-2">
                    <li><Link href="/classes" className={isActive('/classes') ? 'text-orange-500 font-semibold' : ''}>Classes</Link></li>
                    <li><Link href="/courses" className={isActive('/courses') ? 'text-orange-500 font-semibold' : ''}>Courses</Link></li>
                  </ul>
                </details>
              </li>
              <li><Link className={isActive('/about') ? 'text-orange-500 font-semibold' : ''} href="/about">About</Link></li>
              <li><Link className={isActive('/contact') ? 'text-orange-500 font-semibold' : ''} href="/contact">Contact</Link></li>
              {/* {isAdmin && (
                <>
                  <li><Link className={isActive('/create-course') ? 'text-orange-500 font-semibold' : ''} href="/create-course">Create Course</Link></li>
                  <li><Link className={isActive('/create-class') ? 'text-orange-500 font-semibold' : ''} href="/create-class">Create Class</Link></li>
                  <li><Link className={isActive('/teacher-registration') ? 'text-orange-500 font-semibold' : ''} href="/teacher-registration">Teacher</Link></li>
                  <li><Link className={isActive('/student-registration') ? 'text-orange-500 font-semibold' : ''} href="/student-registration">Student</Link></li>
                </>
              )} */}
            </ul>
          </div>
          <Link href="/" className="hidden md:flex font-bold text-xl">Learning Platform</Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link className={isActive('/') ? 'text-orange-500 font-semibold' : ''} href="/">Home</Link></li>
            <li><Link className={isActive('/education') ? 'text-orange-500 font-semibold' : ''} href="/education">Educations</Link></li>
            <li>
              <details>
                <summary>Services</summary>
                <ul className="p-2 bg-white rounded-box shadow">
                  <li><Link href="/classes" className={isActive('/classes') ? 'text-orange-500 font-semibold' : ''}>Classes</Link></li>
                  <li><Link href="/courses" className={isActive('/courses') ? 'text-orange-500 font-semibold' : ''}>Courses</Link></li>
                </ul>
              </details>
            </li>
            <li><Link className={isActive('/about') ? 'text-orange-500 font-semibold' : ''} href="/about">About</Link></li>
            <li><Link className={isActive('/contact') ? 'text-orange-500 font-semibold' : ''} href="/contact">Contact</Link></li>
            {/* {isAdmin && (
              <>
                <li><Link className={isActive('/create-course') ? 'text-orange-500 font-semibold' : ''} href="/create-course">Create Course</Link></li>
                <li><Link className={isActive('/create-class') ? 'text-orange-500 font-semibold' : ''} href="/create-class">Create Class</Link></li>
                <li><Link className={isActive('/teacher-registration') ? 'text-orange-500 font-semibold' : ''} href="/teacher-registration">Teacher</Link></li>
                <li><Link className={isActive('/student-registration') ? 'text-orange-500 font-semibold' : ''} href="/student-registration">Student</Link></li>
              </>
            )} */}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end space-x-3">
          {status === 'authenticated' ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={user?.image || '/default-avatar.png'}
                    alt={user?.name}
                    width={40}
                    height={40}
                    title={user?.name}
                  />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[99] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                <li><button onClick={goToDashboard}>Dashboard</button></li>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/settings">Settings</Link></li>
                <li>
                  <label className="cursor-pointer justify-between">
                    <span>Dark Mode</span>
                    <input type="checkbox" className="toggle toggle-sm" />
                  </label>
                </li>
                <li><button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-sm btn-primary">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
