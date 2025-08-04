import React from 'react';

const About = () => {
  return (
    <div>
      <section className="px-4 py-4 bg-color text-gray-800 dark:text-gray-400 mb-8">
        <div className=" text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-600">About Us</h2>
          <p className="text-lg mb-8">
            Our Academy is a global online Islamic learning platform dedicated to delivering high-quality education in Quran, Hadith, Fiqh, and Arabic language. With a mission to make authentic Islamic knowledge accessible to everyone, we offer flexible and affordable courses designed for all ages and backgrounds.
          </p>

          {/* Mission */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2 text-orange-500">📌 Our Mission</h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              To spread Islamic knowledge across generations by providing accurate, Quran- and Hadith-based education. We aim to present the beauty of Islam using modern technology, making it engaging and accessible for learners around the world.
            </p>
          </div>

          {/* Vision */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2 text-orange-500">🎯 Our Vision</h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              To build a global hub of Islamic education where anyone, from anywhere, can enrich their understanding of the Qur'an and authentic Islamic teachings while staying at home. We envision a world where Islamic learning is just a click away.
            </p>
          </div>

          {/* Quran or Hadith */}
          <div className="bg-color p-6 rounded-lg shadow">
            <p className="italic text-lg text-gray-700 mb-2">
              <span className="text-orange-600 font-semibold">قَدْ أَفْلَحَ مَن تَزَكَّىٰ ﴿١٤﴾ وَذَكَرَ ٱسْمَ رَبِّهِ فَصَلَّىٰ ﴿١٥﴾</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              “Indeed, he succeeds who purifies himself, and remembers the name of his Lord and prays.”  
              <br />— (Surah Al-A'la, 87:14–15)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
