// src/pages/PetServices.jsx
import React from "react";
import {
  Scissors,
  Hotel,
  Bone,
  GraduationCap,
  Stethoscope,
  Heart,
} from "lucide-react";

// Service list
const services = [
  { icon: <Scissors size={32} />, title: "Grooming" },
  { icon: <Hotel size={32} />, title: "PetsHotel" },
  { icon: <Bone size={32} />, title: "Doggie Day Camp" },
  { icon: <GraduationCap size={32} />, title: "Training" },
  { icon: <Stethoscope size={32} />, title: "Veterinary Care" },
  { icon: <Heart size={32} />, title: "Adoption" },
];

// Banner images (variables)
const bannerImages = {
  left: "../src/assets/images/petbanner1.png",
  right: "../src/assets/images/petbanner2.png",
};

const PetServiceBanner = () => {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="px-6 py-4 text-sm text-gray-600">
        <span className="font-medium">Home</span> / <span>Pet services</span>
      </div>

      {/* Banner */}
      <div className="relative w-full h-60 md:h-80 lg:h-96 flex items-center justify-center">
        <img
          src={bannerImages.left}
          alt="Dog Left"
          className="absolute left-0 top-0 w-1/2 h-full object-cover"
        />
        <img
          src={bannerImages.right}
          alt="Dog Right"
          className="absolute right-0 top-0 w-1/2 h-full object-cover"
        />
        <div className="absolute bg-blue-600 text-white rounded-full w-40 h-40 flex items-center justify-center shadow-lg">
          <h2 className="text-lg font-bold text-center">PetPalooza</h2>
        </div>
      </div>

      {/* Services */}
      <div className="px-4 -mt-16 md:-mt-20 relative z-10">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-green-200 hover:bg-green-300 transition rounded-lg p-6 text-center cursor-pointer"
              >
                <div className="mb-2 text-black">{service.icon}</div>
                <p className="font-medium text-black">{service.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetServiceBanner;
