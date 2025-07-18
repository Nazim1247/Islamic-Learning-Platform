"use client";

import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 10000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setOpenModal(false);
    document.body.style.overflow = "auto";
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-8">
        📚 Featured Courses
      </h2>

      <Slider {...settings}>
        {courses.map((course, index) => (
          <div key={index} className="p-3">
            <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-all space-y-2">
  <img src={course.image} alt={course.title} className="rounded-lg h-40 w-full object-cover" />
  
  <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
  <p className="text-gray-600 text-sm">{course.description.slice(0, 80)}...</p>

  <p className="text-sm text-gray-700"><span className="font-medium">Instructor:</span> {course.instructor}</p>
  <p className="text-sm text-gray-700"><span className="font-medium">Duration:</span> {course.duration}</p>
  
  <div className="flex flex-wrap gap-1 text-xs">
    {course.features?.map((f, i) => (
      <span key={i} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md">{f}</span>
    ))}
  </div>

  <p className="text-orange-600 font-bold text-lg mt-2">৳ {course.price}</p>

  <button
    onClick={() => handleOpenModal(course)}
    className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition animate-pulse"
  >
    View Details
  </button>
</div>

          </div>
        ))}
      </Slider>

      {openModal && selectedCourse && (
  <div
    className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto px-4 py-10 mb-4"
    onClick={handleClickOutside}
  >
    <div
      ref={modalRef}
      className="bg-gray-100 rounded-2xl max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto shadow-2xl"
    >
      <button
        onClick={handleCloseModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
      >
        &times;
      </button>

      <img
        src={selectedCourse.image}
        alt={selectedCourse.title}
        className="w-full h-56 object-cover rounded-xl mb-4"
      />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {selectedCourse.title}
      </h3>
      <p className="text-gray-600 mb-2">{selectedCourse.description}</p>
      <p className="text-gray-700 text-sm mb-4">{selectedCourse.details}</p>

      <div className="space-y-2 mb-4 text-sm text-gray-700">
        <p><strong>📅 Duration:</strong> {selectedCourse.duration}</p>
        <p><strong>🕰 Schedule:</strong> {selectedCourse.schedule}</p>
        <p><strong>👨‍🏫 Instructor:</strong> {selectedCourse.instructor}</p>
      </div>

      <ul className="text-gray-700 text-sm mb-4 list-disc list-inside space-y-1">
        {selectedCourse.features?.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <p className="text-orange-600 font-semibold mb-4">
        💰 Price: {selectedCourse.price}
      </p>

      <button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-xl transition animate-pulse">
        Enroll Now
      </button>
    </div>
  </div>
)}

    </section>
  );
};

export default FeaturedCourses;


// "use client";
// import { useEffect, useState } from "react";

// const FeaturedCourses = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     fetch("/api/courses")
//       .then((res) => res.json())
//       .then((data) => setCourses(data));
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {courses.map((course) => (
//         <div key={course._id} className="bg-white shadow-lg p-4 rounded-lg">
//           <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
//           <p className="text-gray-600 mb-2">{course.description}</p>
//           <p className="text-sm text-gray-700 mb-2">{course.details}</p>
//           <ul className="text-sm text-gray-700 list-disc list-inside mb-2 space-y-1">
//             {course.features?.map((item, idx) => (
//               <li key={idx}>{item}</li>
//             ))}
//           </ul>
//           <p className="text-orange-600 font-semibold">💰 {course.price || "৳1500/month"}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FeaturedCourses;
