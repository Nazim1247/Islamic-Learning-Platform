import React from 'react';

const About = () => {
  return (
    <div className=''>
      <section className="pt-20 px-4 md:px-10 bg-white text-gray-800 max-w-5xl mx-auto shadow rounded-2xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-600">About Us</h2>
          <p className="text-lg mb-8">
            Our Academy is a global online Islamic learning platform dedicated to delivering high-quality education in Quran, Hadith, Fiqh, and Arabic. We aim to make authentic Islamic knowledge accessible to all—kids, adults, and reverts—across the globe.
          </p>

          {/* Academy Overview */}
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">🏫 Academy Overview</h3>
            <p className="text-base text-gray-600">
              Founded by scholars and educators with a passion for spreading Islamic knowledge, our academy offers live online classes, pre-recorded courses, and personalized mentoring programs. We use modern technology to make learning Islam easy, engaging, and practical.
            </p>
          </div>

          {/* Mission */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">📌 Our Mission</h3>
            <p className="text-base text-gray-600">
              To spread Islamic knowledge across generations by providing Quran- and Hadith-based education. We want to present the timeless beauty of Islam using modern tools in a way that resonates with youth and adults alike.
            </p>
          </div>

          {/* Vision */}
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">🎯 Our Vision</h3>
            <p className="text-base text-gray-600">
              To build a global hub of authentic Islamic learning that connects people to the Qur’an, Sunnah, and traditional knowledge—accessible from anywhere, at any time.
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">🌟 Key Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1 md:flex">
              <li>Live Zoom classes with experienced teachers</li>
              <li>One-on-one Quran tutoring</li>
              <li>Certified Islamic curriculum</li>
              <li>Courses for kids, adults & reverts</li>
              <li>Regular progress reports</li>
              <li>Affordable and flexible plans</li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">💡 Why Choose Us?</h3>
            <p className="text-base text-gray-600">
              We are committed to authentic knowledge, compassionate teaching, and personalized attention. Our academy stands out for its highly qualified scholars, responsive support team, and deep focus on practical Islamic learning.
            </p>
          </div>

          {/* Teachers */}
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">👨‍🏫 Our Teachers</h3>
            <p className="text-base text-gray-600">
              Our team includes certified Hafiz, Alim, and Islamic scholars with years of experience in teaching Qur’an, Arabic grammar, Tafsir, and Hadith. Many are graduates from prestigious Islamic universities and institutions.
            </p>
          </div>

          {/* Students */}
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">🧒👩‍🎓 Our Students</h3>
            <p className="text-base text-gray-600">
              Students from over 15 countries have joined our platform, including children, working professionals, and reverts. We serve both beginners and advanced learners with care and dedication.
            </p>
          </div>

          {/* Quran or Hadith */}
          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow">
            <p className="italic text-lg text-gray-700 mb-2 text-center">
              <span className="text-orange-600 font-semibold">
                قَدْ أَفْلَحَ مَن تَزَكَّىٰ ﴿١٤﴾ وَذَكَرَ ٱسْمَ رَبِّهِ فَصَلَّىٰ ﴿١٥﴾
              </span>
            </p>
            <p className="text-sm text-gray-600 text-center">
              “Indeed, he succeeds who purifies himself, and remembers the name of his Lord and prays.”  
              <br />— (Surah Al-A'la, 87:14–15)
            </p>
          </div>

          {/* CTA Button */}
          <div className="my-6 pb-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-2 rounded-xl text-lg shadow-md animate-pulse">
              Enroll Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
