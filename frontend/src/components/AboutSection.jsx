import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AboutSection() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    api.get("/aboutpage/1/") // assuming first AboutPage
      .then((res) => setAbout(res.data))
      .catch((err) => console.error("Error fetching about:", err));
  }, []);

  if (!about) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      {/* Title + Content */}
      <section className="bg-green-200 p-6 md:p-10 rounded-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{about.title}</h2>
        <p className="text-gray-700 leading-relaxed">{about.content}</p>
      </section>

      {/* 3 Column Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {about.cards.map((card) => (
          <div
            key={card.id}
            className="border rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center"
          >
            <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
            <div className="bg-[#1C49C2] text-white w-full py-3 font-bold">
              {card.title}
            </div>
          </div>
        ))}
      </section>

      {/* Final Section (50/50 Split) */}
      {about.section && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 items-center">
          {/* Left content */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{about.section.title}</h3>
            <p className="text-gray-700 leading-relaxed">{about.section.description}</p>
          </div>

          {/* Right image */}
          <div>
            <img
              src={about.section.image}
              alt={about.section.title}
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
        </section>
      )}
    </div>
  );
}
