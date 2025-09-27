// src/components/PromoBar.jsx
import { Link } from "react-router-dom";



const HomePromoBar = () => {
  // Image variable
  const offerImage = "../src/assets/images/home_promo.png"; // change to your image path

  return (
    <div className="w-[90%] mx-auto bg-[#98FB98] h-[100px] flex items-center justify-between px-4 rounded-md shadow mt-6">
      {/* Left Side Content */}
      <p className="text-xl font-medium text-black-800 truncate">
        Buy 1 blue wilderness dry dog foog,13-28lbs, get free wild cut Toppers*
      </p>

      {/* Right Side - Image + Button */}
      <div className="flex items-center gap-2">
        {/* Small Image */}
        <img
          src={offerImage}
          alt="Offer"
          className="w-12 h-12 object-contain mr-4"
        />

        {/* Shop Now Button */}
            <Link to="/dogs">
              <button className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full shadow-lg w-max">
                Shop Now
              </button>
            </Link>
      </div>
    </div>
  );
};

export default HomePromoBar;
