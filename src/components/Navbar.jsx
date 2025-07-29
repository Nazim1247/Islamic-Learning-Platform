'use client';
import { FaTachometerAlt, FaUser, FaCog, FaMoon, FaSignOutAlt, FaBars } from "react-icons/fa";
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
    router.push('/dashboard');
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="navbar shadow-sm max-w-[1250px] mx-auto px-4 py-2">

        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              
              <FaBars className="h-6 w-6"/>
            </div>
            <ul tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              <li><Link className={isActive('/') ? 'text-orange-500 font-semibold' : ''} href="/">Home</Link></li>
              <li><Link className={isActive('/education') ? 'text-orange-500 font-semibold' : ''} href="/education">All Classes</Link></li>
              <li><Link className={isActive('/courses') ? 'text-orange-500 font-semibold' : ''} href="/courses">All Courses</Link></li>
              <li><Link className={isActive('/about') ? 'text-orange-500 font-semibold' : ''} href="/about">About</Link></li>
              <li><Link className={isActive('/contact') ? 'text-orange-500 font-semibold' : ''} href="/contact">Contact</Link></li>
            </ul>
          </div>
          <Link href="/" className="hidden md:flex font-bold text-xl">Learning Platform</Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link className={isActive('/') ? 'text-orange-500 font-semibold' : ''} href="/">Home</Link></li>
            <li><Link className={isActive('/education') ? 'text-orange-500 font-semibold' : ''} href="/education">All Classes</Link></li>
            <li><Link className={isActive('/courses') ? 'text-orange-500 font-semibold' : ''} href="/courses">All Courses</Link></li>
            <li><Link className={isActive('/about') ? 'text-orange-500 font-semibold' : ''} href="/about">About</Link></li>
            <li><Link className={isActive('/contact') ? 'text-orange-500 font-semibold' : ''} href="/contact">Contact</Link></li>
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
                <li>
        <button onClick={goToDashboard} className="flex items-center gap-2 hover:bg-orange-100 px-3 py-2 rounded-md">
          <FaTachometerAlt /> Dashboard
        </button>
      </li>
      <li>
        <Link href="/profile" className="flex items-center gap-2 hover:bg-orange-100 px-3 py-2 rounded-md">
          <FaUser /> Profile
        </Link>
      </li>
      
      <li>
      <details>
          <summary className="flex items-center gap-2 hover:bg-orange-100 px-3 py-2 rounded-md"><FaCog /> Settings</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li>
              <Link href="/profile/update-profile" className="flex items-center gap-2 hover:bg-orange-100 px-3 py-2 rounded-md"> 
              Update Profile
              </Link>
              </li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
        </li>
      <li>
        <label className="flex items-center justify-between hover:bg-orange-100 px-3 py-2 rounded-md cursor-pointer">
          <span className="flex items-center gap-2">
            <FaMoon /> Dark Mode
          </span>
          <input
            type="checkbox"
            className="toggle toggle-sm"
            
          />
        </label>
      </li>
      <li>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-2 hover:bg-red-100 text-red-600 px-3 py-2 rounded-md">
          <FaSignOutAlt /> Logout
        </button>
      </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white rounded">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
