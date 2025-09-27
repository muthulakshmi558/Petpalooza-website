import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import api from "../api/axios";
// 🔹 Import static image as a variable
import DogPlaceholder from "../assets/images/dog_product.png";

const HomeGallery = () => {
  const [dogs, setDogs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api
      .get("/dogs/")
      .then((res) => {
        const dataArray = Array.isArray(res.data) ? res.data : res.data.results;
        setDogs(dataArray || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? Math.max(dogs.length - 3, 0) : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 3 >= dogs.length ? 0 : prev + 1));
  };

  const visibleDogs = Array.isArray(dogs) ? dogs.slice(index, index + 3) : [];

  return (
    <div className="w-full p-8">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-center">Dog Gallery</h2>

      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Side - Static Dog Image */}
        <div className="w-full lg:w-1/3 flex justify-center mb-6 lg:mb-0">
          <img
            src={DogPlaceholder} // 🔹 Use imported variable
            alt="Dog"
            className="w-[80%] h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Right Side - Scrollable Cards */}
        <div className="w-full lg:w-2/3 relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 bg-blue-500 text-white p-3 rounded-full shadow"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-8">
            {visibleDogs.map((dog) => (
              <div
                key={dog.id}
                className="bg-white shadow-lg rounded-lg p-3 flex flex-col items-center border border-gray-300"
              >
                {/* Dog Image */}
                <img
                  src={dog.image}
                  alt={dog.name}
                  className="w-full h-40 object-cover rounded-md"
                />

                {/* Dog Name */}
                <h3 className="mt-2 font-semibold text-center">{dog.name}</h3>

                {/* Star Rating */}
                <div className="flex text-yellow-500 my-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(dog.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Price */}
                <p className="text-blue-600 font-bold">₹{dog.price}</p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 bg-blue-500 text-white p-3 rounded-full shadow"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeGallery;
