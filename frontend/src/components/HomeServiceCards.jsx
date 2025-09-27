import { useEffect, useState } from "react";
import api from "../api/axios";

const HomeServiceCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .get("/services/")
      .then((res) => setCards(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-[90%] mx-auto py-12">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-2 text-center">Pet Services</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Treats Rewards members earn points on every service
      </p>

      {/* Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Image with overlay */}
            <div className="relative">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute text-center bottom-0 left-2 bg-[#0045FF] text-white px-2 py-1 rounded text-md font-semibold">
                {card.title}
              </div>
            </div>

            {/* Description */}
            <p className="p-3 text-gray-700 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeServiceCards;
