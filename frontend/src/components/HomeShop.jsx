// src/components/HomeShop.jsx
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Pet category images
import dog from "../assets/images/dog.png";
import cat from "../assets/images/cat.png";
import hamster from "../assets/images/hamster.png";
import guineapigs from "../assets/images/guineapigs.png";
import fish from "../assets/images/fish.png";
import rats from "../assets/images/rats.png";
import rabbits from "../assets/images/rabbits.png";

const petCategories = [
  { name: "Dog", img: dog },
  { name: "Cat", img: cat },
  { name: "Hamster", img: hamster },
  { name: "Guineapigs", img: guineapigs },
  { name: "Fish", img: fish },
  { name: "Rats", img: rats },
  { name: "Rabbits", img: rabbits },
];
const HomeShop = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const scrollLeft = () => {
    setStartIndex((prev) =>
      prev === 0 ? petCategories.length - visibleCount : prev - 1
    );
  };

  const scrollRight = () => {
    setStartIndex((prev) =>
      prev + visibleCount >= petCategories.length ? 0 : prev + 1
    );
  };

  const visiblePets = petCategories.slice(startIndex, startIndex + visibleCount);
  const petsToDisplay =
    visiblePets.length < visibleCount
      ? [
          ...visiblePets,
          ...petCategories.slice(0, visibleCount - visiblePets.length),
        ]
      : visiblePets;

  return (
    <div className="w-full bg-white py-10 font-montserrat">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Shop by Pet
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 z-10 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300"
        >
          <FaChevronLeft className="text-xl text-gray-700" />
        </button>

        {/* Flex Row - Responsive & Small Desktop Cards */}
        <div className="flex flex-wrap w-full max-w-7xl px-4 justify-center">
          {petsToDisplay.map((pet, index) => (
            <div
              key={index}
              className="
                flex flex-col items-center justify-center bg-[#98FB98] 
                mx-2 mb-4 p-4 rounded-2xl shadow hover:scale-105 transition-all text-center
                basis-full       sm:basis-1/2 md:basis-1/2 lg:basis-1/4 xl:basis-[18%]
                max-w-[200px] lg:max-w-[180px] xl:max-w-[160px]
              "
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 xl:w-16 xl:h-16 flex items-center justify-center mb-3">
                <img
                  src={pet.img}
                  alt={pet.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-semibold text-white text-sm sm:text-base lg:text-base xl:text-sm">
                {pet.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-4 z-10 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300"
        >
          <FaChevronRight className="text-xl text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default HomeShop;
