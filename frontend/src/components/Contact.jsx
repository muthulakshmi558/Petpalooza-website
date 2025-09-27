// src/pages/ContactUs.jsx
import React from "react";
import { Link } from "react-router-dom";

const quickLinks = [
  { title: "Track Order", desc: "Check the status of your orders quickly." },
  { title: "Return Order", desc: "Easily initiate a return for your products." },
  { title: "Chat with Vet", desc: "Get professional advice for your pets." },
];

const browseTopics = [
  "Order Related",
  "Return & Cancellation",
  "Payment & Refund Related",
  "General Enquiry",
];

const ContactUs = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans p-6 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
        <Link
          to="/login"
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow"
        >
          Sign In
        </Link>
      </div>

      {/* Quick Links */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="font-bold text-lg mb-2">{link.title}</h3>
              <p className="text-gray-600 text-sm">{link.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Browse Topics */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Browse Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {browseTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center"
            >
              <h3 className="font-semibold text-lg">{topic}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Get in Touch */}
      <div className="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Get in Touch</h2>
        <p className="text-gray-600 mb-2 text-center">
          Email: <span className="font-medium">support@petpalooza.com</span>
        </p>
        <p className="text-gray-600 mb-2 text-center">
          Contact No: <span className="font-medium">+91-1234567890</span>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
