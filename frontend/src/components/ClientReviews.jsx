// src/components/ClientReviews.jsx
import React from "react";

const ClientReviews = () => {
  const reviews = [
    {
      name: "Ravi Kumar",
      review: "The vet was very professional and explained everything clearly. My dog is much better now!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      review: "Quick consultation and very affordable. Loved the experience!",
      rating: 4,
    },
    {
      name: "Amit Verma",
      review: "The doctor gave excellent advice. Medicine delivery was smooth too.",
      rating: 5,
    },
    {
      name: "Sneha Iyer",
      review: "Great service! Very convenient to consult from home.",
      rating: 4,
    },
    {
      name: "Vikram Singh",
      review: "Was worried about my pet’s skin issue, but the vet gave the right treatment. Highly recommend!",
      rating: 5,
    },
    {
      name: "Anjali Gupta",
      review: "Affordable, quick and trustworthy. I’ll definitely use this again.",
      rating: 5,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
        What Our Clients Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow-md p-5 flex flex-col"
          >
            {/* Stars */}
            <div className="flex mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <span key={i} className="text-yellow-500 text-lg">★</span>
              ))}
              {Array.from({ length: 5 - r.rating }).map((_, i) => (
                <span key={i} className="text-gray-300 text-lg">★</span>
              ))}
            </div>

            {/* Review */}
            <p className="text-gray-700 text-sm flex-grow">“{r.review}”</p>

            {/* Name */}
            <p className="mt-4 font-semibold text-gray-900">- {r.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReviews;
