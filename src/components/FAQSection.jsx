"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Who can enroll in the courses?",
    answer:
      "Anyone with a passion for Islamic knowledge — brothers, sisters, children, and adults — can enroll in our courses. We offer separate batches for different age groups and genders.",
  },
  {
    question: "Are the classes live or recorded?",
    answer:
      "Most of our classes are conducted live for better interaction. However, recorded sessions are also available for those who miss the live class.",
  },
  {
    question: "What if I miss a class?",
    answer:
      "Don't worry! You will get access to the class recording and materials to review anytime.",
  },
  {
    question: "Will I get a certificate after completion?",
    answer:
      "Yes, upon successful completion and attendance, you will receive a certificate from our academy.",
  },
  {
    question: "Do you offer one-on-one sessions?",
    answer:
      "Yes, we provide personalized one-on-one sessions upon request, depending on availability.",
  },
  {
    question: "How can I pay the course fee?",
    answer:
      "We accept various payment methods including bKash, Nagad, and online banking. You’ll receive payment instructions after enrollment.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 bg-white" id="faqs">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-4">
          FAQs – Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Find answers to the most commonly asked questions about our courses and learning experience.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 cursor-pointer hover:shadow transition-all"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                <span className="text-2xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-600 mt-3">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
