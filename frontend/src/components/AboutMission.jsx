import React, { useEffect, useState } from "react";
import api from "../api/axios"; 
export default function AboutMission() {
  const [mission, setMission] = useState(null);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const res = await api.get("/about/"); 
        setMission(Array.isArray(res.data) ? res.data[0] : res.data);
      } catch (err) {
        console.error("Error fetching mission:", err);
      }
    };

    fetchMission();
  }, []);

  if (!mission) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8">


      <div className="relative">
        <img
          src={mission.image}
          alt="Our Mission"
          className="w-full rounded-lg shadow-md"
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 bg-black/70 text-white p-6 rounded-xl text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {mission.title}
          </h2>
          <p className="text-sm md:text-base font-medium leading-relaxed">
            {mission.description}
          </p>
        </div>
      </div>
    </section>
  );
}
