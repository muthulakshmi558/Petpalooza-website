// src/pages/PetServices.jsx
import React from "react";
// 🔹 Import the middle banner image
import PetServiceBanner from "../assets/images/petservice.png";

const PetServices = () => {
  return (
    <div className="w-full px-6 md:px-12 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-3">Pet Services</h1>
          <p className="text-gray-700 max-w-3xl">
            Whether it's a pamper day, playdate, sleepover, training class or
            veterinary visit, we provide the best in pet services with highly
            trained, passionate associates. From our pet hotel & doggie day camp
            as an alternative to pet sitting, to our dog training and grooming
            as an alternative to DIY, our services are conveniently located
            inside most of our PetSmart stores
          </p>
        </div>
        <div className="text-right text-sm">
          <a
            href="tel:+911234567890"
            className="text-blue-700 font-semibold hover:underline"
          >
            customer service <br /> +91-1234567890
          </a>
        </div>
      </div>

      {/* Banner Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Left Blue Card */}
        <div className="bg-blue-600 text-white p-6 flex flex-col justify-center rounded-lg">
          <h2 className="text-xl font-bold mb-3">Summer Special</h2>
          <p className="mb-6 text-sm leading-relaxed">
            Upgrade a salon visit or overnight stay with a strawberry ice cream
            spritz, $350+ in coupon savings & more
          </p>
          <button className="bg-white text-black font-semibold py-2 px-5 rounded-full w-fit">
            Book Now
          </button>
        </div>

        {/* Middle Image */}
        <div>
          <img
            src={PetServiceBanner} // 🔹 Use imported variable
            alt="Dog and Cat"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Green Card */}
        <div className="bg-green-300 p-6 flex flex-col justify-center rounded-lg">
          <h2 className="text-xl font-bold mb-3">Monthly specials</h2>
          <p className="mb-6 text-sm leading-relaxed">
            Check out deals, offers & events in grooming, boarding, day camp &
            training
          </p>
          <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-full w-fit">
            Get Details
          </button>
        </div>
      </div>

      {/* Bottom Offer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Card 1 */}
        <div className="border p-6 text-center rounded-lg flex flex-col justify-between">
          <p className="text-sm mb-6">
            Yappy Hour <br /> $5 OFF on salon walk-in services <br /> Monday Thru
            Friday
          </p>
          <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-md mx-auto">
            Learn more
          </button>
        </div>

        {/* Card 2 */}
        <div className="border p-6 text-center rounded-lg flex flex-col justify-between">
          <p className="text-sm mb-6">
            ONLY $129 any 6-wk. Training Class <br />
            (that's $21.50 a class) valid thru 7/6^
          </p>
          <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-md mx-auto">
            Enroll Now
          </button>
        </div>

        {/* Card 3 */}
        <div className="border p-6 text-center rounded-lg flex flex-col justify-between">
          <p className="text-sm mb-6">
            Traveling without your pet this summer? <br />
            Suite upgrades and fun add-ons make their stay even more special.
          </p>
          <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-md mx-auto">
            Book Stay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetServices;
