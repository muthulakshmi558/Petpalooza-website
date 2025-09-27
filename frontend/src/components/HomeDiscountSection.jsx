// src/components/DiscountSection.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

const HomeDiscountSection = () => {
  const [content, setContent] = useState(null);

    useEffect(() => {
    api
        .get("/discount-section/")
        .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
            setContent(res.data[0]); // take first one
        }
        })
        .catch((err) => console.error(err));
    }, []);

  if (!content) return null;

  return (
            <div className="relative flex flex-col md:flex-row w-[90%] mx-auto h-auto md:h-[400px] rounded-[2%] overflow-hidden shadow-lg">
            {/* Left Side */}
            <div className="md:w-3/5 w-full bg-blue-600 text-white flex flex-col justify-center items-start p-8">
                <h2 className="text-3xl font-bold mb-4">{content.heading}</h2>
                <p className="text-lg mb-6">{content.description}</p>
                <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition">
                {content.button_text}
                </button>
            </div>

            {/* Right Side */}
            <div className="md:w-2/5 w-full flex items-center justify-center bg-gray-100">
                <img
                src={content.image}
                alt="Discount"
                className="w-full h-full object-cover"
                />
            </div>

            {/* Center Circle */}
            <div className="absolute left-[62%] top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white text-blue-600 w-32 h-32 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-600">
                <span className="text-xl font-bold">Save 35%</span>
                </div>
            </div>
            </div>

  );
};

export default HomeDiscountSection;
