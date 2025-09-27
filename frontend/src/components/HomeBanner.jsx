// src/components/HomeBanner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

// Image variables
import dogRaincoat from "../assets/images/homebanner1.png";
import umbrella from "../assets/images/umbrella.png";
import puppy from "../assets/images/puppy.png";
import dogFood from "../assets/images/dog-food.png";

const bannerImages = { dogRaincoat, umbrella, puppy, dogFood };

const HomeBanner = () => {
  return (
    <div className="w-full font-montserrat">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg overflow-hidden h-[400px] md:h-[500px]">
            <div className="w-full md:w-1/2 h-full">
              <img
                src={bannerImages.dogRaincoat}
                alt="Dog Raincoat"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 bg-[#90EE90] flex flex-col justify-center items-center p-8 text-center h-full">
              <h2 className="text-3xl font-bold text-black drop-shadow">
                Monsoon Edition for Dogs
              </h2>
              <p className="mt-2 text-sm">100% Water Proof</p>
              <img src={bannerImages.umbrella} alt="Umbrella" className="w-16 my-4" />
            <Link to="/dogs">
              <button className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full shadow-lg w-max">
                Shop Now
              </button>
            </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg overflow-hidden h-[400px] md:h-[500px]">
            <div className="w-full md:w-1/2 h-full flex justify-center">
              <img
                src={bannerImages.puppy}
                alt="Cute Puppy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 bg-[#90EE90] flex flex-col justify-center p-8 h-full">
              <div className="bg-blue-600 text-white font-semibold px-4 py-2 mb-4 w-max rounded">
                Get upto 40% Discount on all products
              </div>
              <div className="bg-black/70 text-white p-6 rounded-lg">
                <p className="text-lg font-semibold">
                  If you love your buddies <br />
                  You know what’s good for them <br />
                  That’s why we decided
                </p>
                <p className="mt-4 font-bold text-xl">
                  NO ARTIFICIAL FOOD <br />
                  NO TOXIC TOYS
                </p>
              </div>
            <Link to="/dogs">
              <button className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full shadow-lg w-max">
                Shop Now
              </button>
            </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Left green background, Right image */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row-reverse items-center justify-between bg-white rounded-lg overflow-hidden h-[400px] md:h-[500px]">
            <div className="w-full md:w-1/2 bg-[#90EE90] flex flex-col justify-center items-center p-8 text-center h-full">
              <h2 className="text-3xl font-bold text-black drop-shadow">
                Healthy Food Collection
              </h2>
              <p className="mt-2 text-lg font-medium">100% Natural & Organic</p>
              <p className="mt-2 text-sm text-gray-700">
                Boost your pet’s energy with nutritious meals made with love.
              </p>
            <Link to="/dogs">
              <button className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full shadow-lg w-max">
                Shop Now
              </button>
            </Link>
            </div>
            <div className="w-full md:w-1/2 h-full">
              <img
                src={bannerImages.dogFood}
                alt="Dog Food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;
