// src/pages/ConsultVet.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Repeat2,
  Package,
  ClipboardList,
  Dog,
  Stethoscope,
  PawPrint,
  Syringe,
  Ear,
  Eye,
  Scale,
} from "lucide-react";

const ConsultVet = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <ShieldCheck className="w-5 h-5" />, text: "Verified Doctors" },
    { icon: <Repeat2 className="w-5 h-5" />, text: "Free follow-up" },
    { icon: <Package className="w-5 h-5" />, text: "Medicine delivery" },
  ];

  const issues = [
    { icon: <ClipboardList className="w-10 h-10" />, label: "General Checkup" },
    { icon: <Dog className="w-10 h-10" />, label: "Skin issues" },
    { icon: <Stethoscope className="w-10 h-10" />, label: "Digestive issues" },
    { icon: <PawPrint className="w-10 h-10" />, label: "Paws & Limbs" },
    { icon: <Syringe className="w-10 h-10" />, label: "Dental issues" },
    { icon: <Ear className="w-10 h-10" />, label: "Ear issues" },
    { icon: <Eye className="w-10 h-10" />, label: "Eye issues" },
    { icon: <Scale className="w-10 h-10" />, label: "Nutrition" },
  ];

  return (
    <div className="w-full">
      {/* Top Breadcrumb */}
      <div className="px-6 py-3 text-sm text-gray-600">
        <span className="font-medium text-gray-800">Home</span> / Consult Vet
      </div>

      {/* Banner */}
      <div className="relative w-full">
        <img
          src="../src/assets/images/consult.png"
          alt="Vet with Dog"
          className="w-full h-[350px] object-cover"
        />
        {/* Overlay Text */}
        <div className="absolute top-8 right-8 bg-black bg-opacity-70 text-white p-4 rounded-md max-w-xs">
          <p className="text-sm leading-relaxed">
            Instant and complete vet care
            <br />
            Wherever you are
            <br />
            At only <span className="font-bold">₹299</span>, get end-to-end
            support from our vets
          </p>
          <button
            onClick={() => navigate("/consult-checkout")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
          >
            Consult Now
          </button>
        </div>
      </div>

      {/* Features Row */}
      <div className="bg-blue-600 text-white flex flex-col md:flex-row items-center justify-center gap-8 py-4">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 font-semibold text-sm"
          >
            {f.icon}
            {f.text}
          </div>
        ))}
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-10">
        {issues.map((issue, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="bg-blue-100 w-20 h-20 flex items-center justify-center rounded-full mb-3">
              {issue.icon}
            </div>
            <p className="text-sm font-medium text-gray-700">{issue.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultVet;
