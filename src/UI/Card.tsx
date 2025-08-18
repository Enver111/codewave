import { cardsServices } from "../../data/data";
import { useState } from "react";

export default function Card() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-[40px]">
      {cardsServices.map((card) => (
        <div
          key={card.id}
          className="flex flex-col items-center justify-between w-[430px] h-[230px] bg-white rounded-2xl shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] p-[20px] py-[23px] pb-[40px] relative"
          //hover:scale-105 transition-all duration-300
          style={{ background: card.color }}
        >
          <h2 className="text-[30px] font-bold text-center text-[#535353]">
            {card.title}
          </h2>
          <div className="flex gap-[33px]">
            <img
              src={card.image}
              alt={card.title}
              className={`w-[100px] transition-transform duration-300 ${
                hoveredCard === card.id ? "scale-110" : "scale-100"
              }`}
            />

            <p className="text-[16px] font-medium text-left text-[#535353]">
              {card.description}
            </p>
          </div>
          <button
            className="absolute bottom-0 right-0 hover:scale-105 transition-all duration-300"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img src="/arrow.webp" alt="arrow" className="w-[50px] h-[50px]" />
          </button>
        </div>
      ))}
    </div>
  );
}
