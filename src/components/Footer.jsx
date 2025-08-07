import Image from 'next/image';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='max-w-[1250px] mx-auto bg-color'>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a href='/education' className="link link-hover">All Classes</a>
    <a href='/courses' className="link link-hover">All Courses</a>
    <a href='/#blogs' className="link link-hover">Islamic Articles & Blogs</a>
    {/* <a className="link link-hover">Advertisement</a> */}
  </nav>
  <nav>
    <h6 className="footer-title">Platform</h6>
    <a href='/about' className="link link-hover">About us</a>
    <a href='/contact' className="link link-hover">Contact</a>
    <a href='/#scholars' className="link link-hover">Our Scholars</a>
    {/* <a className="link link-hover">Press kit</a> */}
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a href='/about' className="link link-hover">Terms of use</a>
    <a href='/contact' className="link link-hover">Privacy policy</a>
    {/* <a className="link link-hover">Cookie policy</a> */}
  </nav>
</footer>
<footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
  <aside className="grid-flow-col items-center">
    <Image src={'/images/logo.jpg'} width={20} height={20} alt='logo' className='w-12 h-12 rounded-full'/>
    <p>
      Islamic Learning Platform.
      <br />
      Providing reliable tech since 2025
    </p>
  </aside>
  <nav className="md:place-self-center md:justify-self-end">
    <div className="grid grid-flow-col gap-4">
      <a href='https://github.com/Nazim1247'>
        <FaGithub className='text-2xl'/>
      </a>
      <a href="https://www.linkedin.com/in/hm-nazim-uddin">
        <FaLinkedin className='text-2xl'/>
      </a>
      <a href='https://youtube.com/@najimuddin-cv5eb?si=eOx2JUd72eLHaAGR'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a href='https://web.facebook.com/hm.nazim.uddin.86882'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
</footer>
        </div>
    );
};

export default Footer;