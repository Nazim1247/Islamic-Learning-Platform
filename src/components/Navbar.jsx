import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm max-w-[1250px] mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link href={'/'}>Home</Link></li>
        <li>
          <a>Services</a>
          <ul className="p-2">
            <li><Link href={'/classes'}>Classes</Link></li>
            <li><Link href={'/courses'}>Courses</Link></li>
          </ul>
        </li>
        <li><Link href={'/about'}>About</Link></li>
      <li><Link href={'/contact'}>Contact</Link></li>
      <li><Link href={'/create-course'}>Create a Course</Link></li>
      </ul>
    </div>
    <a className="hidden md:flex font-bold text-xl">Islamic Learning Platform</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link href={'/'}>Home</Link></li>
      <li>
        <details className="dropdown dropdown-end">
  <summary>Services</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <li><Link href="/classes">Classes</Link></li>
    <li><Link href="/courses">Courses</Link></li>
  </ul>
</details>

      </li>
      <li><Link href={'/about'}>About</Link></li>
      <li><Link href={'/contact'}>Contact</Link></li>
      <li><Link href={'/create-course'}>Create a Course</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Login</a>
  </div>
</div>
    );
};

export default Navbar;