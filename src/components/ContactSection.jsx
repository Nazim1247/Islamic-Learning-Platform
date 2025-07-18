"use client";

import { useState } from "react";

const ContactSection = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setEmail("");
      alert("Thanks for subscribing!");
    } else {
      alert("Failed to subscribe. Try again.");
    }
  };

  return (
    <section className="py-8 border-t border-gray-200" id="contact">
      <div className="px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-4">
          Contact & Newsletter
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Have questions or want to stay updated with our latest Islamic courses, articles, and events? Reach out to us or subscribe below!
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">📞 Contact Information</h3>
            <p className="text-gray-600 mb-3">
              📍 Address: Online Islamic Learning Platform <br />
              🌐 Location: Global (Bangladesh, UK, USA, Gulf & more)
            </p>
            <p className="text-gray-600 mb-3">📧 Email: mdnajim1247@gmail.com</p>
            <p className="text-gray-600 mb-3">📱 WhatsApp: +8801924772057</p>
            <p className="text-gray-600">🕐 Support Hours: 9 AM – 9 PM (GMT+6)</p>
          </div>

          {/* Newsletter Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">📰 Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Receive weekly reminders, Islamic articles, and course updates directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
