// src/pages/ConsultCheckout.jsx
import React from "react";
// 🔹 Import the banner image
import ConsultBanner from "../assets/images/consult.png";

const ConsultCheckout = () => {
  return (
    <div className="w-full px-6 md:px-12 py-10">
      {/* Banner */}
      <div className="w-full flex justify-center">
        <img
          src={ConsultBanner} // 🔹 Use the imported variable
          alt="Vet with Dog"
          className="w-full md:w-[70%] h-[300px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Price Details */}
      <div className="mt-10 max-w-2xl mx-auto bg-white border rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Consultation Summary
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            ✔️ Consultation Fee: <span className="font-semibold">₹299</span>
          </p>
          <p>✔️ Free Delivery on Medicines</p>
          <p>✔️ Cash on Delivery Available</p>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-xl font-bold text-blue-600">₹299</p>
        </div>

        {/* Checkout Button */}
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold shadow">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default ConsultCheckout;
