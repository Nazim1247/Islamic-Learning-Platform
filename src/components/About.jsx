import React from 'react';

const About = () => {
    return (
        <div>
           <section className="py-16 px-4 md:px-12 bg-white text-gray-800">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-600">About Us</h2>
    <p className="text-lg mb-8">
      আমাদের একাডেমি একটি অনলাইন ইসলামি শিক্ষা প্ল্যাটফর্ম, যার মাধ্যমে বিশ্বব্যাপী মুসলিম ভাই-বোনদেরকে কুরআন, হাদীস, ফিকহ ও আরবি ভাষা শেখানো হয় সহজ, নমনীয় ও মানসম্পন্নভাবে।
    </p>

    {/* Mission */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-2 text-gray-700">📌 আমাদের লক্ষ্য (Mission)</h3>
      <p className="text-base text-gray-600">
        প্রজন্মের মধ্যে দ্বীনি জ্ঞান ছড়িয়ে দেওয়া, কুরআন ও হাদীসভিত্তিক সঠিক শিক্ষা প্রদান করা এবং ইসলামের সৌন্দর্য আধুনিক প্রযুক্তির মাধ্যমে পৌঁছে দেওয়া।
      </p>
    </div>

    {/* Vision */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-2 text-gray-700">🎯 আমাদের উদ্দেশ্য (Vision)</h3>
      <p className="text-base text-gray-600">
        এমন একটি বৈশ্বিক প্ল্যাটফর্ম গড়ে তোলা, যেখানে যে কেউ ঘরে বসেই প্রামাণ্য ইসলামি জ্ঞান ও কুরআন শিক্ষায় নিজেদের সমৃদ্ধ করতে পারবে।
      </p>
    </div>

    {/* Quran or Hadith */}
    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow">
      <p className="italic text-lg text-gray-700 mb-2">
        <span className="text-orange-600 font-semibold">قَدْ أَفْلَحَ مَن تَزَكَّىٰ ﴿١٤﴾ وَذَكَرَ ٱسْمَ رَبِّهِ فَصَلَّىٰ ﴿١٥﴾</span>
      </p>
      <p className="text-sm text-gray-600 mb-2">
        “নিশ্চয়ই সে সফল, যে নিজেকে পরিশুদ্ধ করেছে এবং তার প্রভুর নাম স্মরণ করে সালাত আদায় করেছে।”  
        <br />— (সূরা আল-আ‘লা, ৮৭:১৪–১৫)
      </p>
    </div>
    <div className='mt-4'>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-600 transition">
                Enroll Now
              </button>
    </div>
  </div>
</section> 
        </div>
    );
};

export default About;