// src/pages/ConsultVet.jsx
import React from "react";

const ConsultVetSection = () => {
  // Example experts data (you can replace with API or backend data)
  const experts = [
    {
      name: "Dr. Anitha Rao",
      role: "Veterinary Surgeon",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Karthik Menon",
      role: "Pet Nutrition Specialist",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Priya Sharma",
      role: "Animal Dermatologist",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="w-full px-6 md:px-12 py-10">
      {/* Banner Section */}
      <div className="w-full flex justify-center">
        <div className="w-full md:w-[70%] text-center">
          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1558788353-f76d92427f16"
            alt="Vet with Dog"
            className="w-full h-[350px] object-cover rounded-lg shadow-lg"
          />

          {/* Content */}
          <p className="mt-6 text-lg font-medium text-gray-700">
            Instant and complete vet care wherever you are at only{" "}
            <span className="font-bold">₹299</span>, get end-to-end support from
            our vets.
          </p>

          {/* Button */}
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow">
            Consult Now
          </button>
        </div>
      </div>

      {/* Experts Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          Access our Experts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experts.map((expert, idx) => (
            <div
              key={idx}
              className="border rounded-lg shadow-sm p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <img
                src={expert.img}
                alt={expert.name}
                className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-100"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {expert.name}
              </h3>
              <p className="text-sm text-gray-600">{expert.role}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultVetSection;
