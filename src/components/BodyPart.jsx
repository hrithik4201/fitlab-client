import React from "react";
import Icon from "../assets/icons/gym.png";

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const isSelected = bodyPart === item;

  return (
    <div
      className={`
        flex flex-col items-center justify-center
        w-[270px] h-[282px] gap-12 cursor-pointer
        bg-white rounded-bl-[20px] transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        ${
          isSelected
            ? "border-t-4 border-[#FF2625] shadow-lg"
            : "border-t-4 border-transparent hover:border-[#FF2625]/30"
        }
      `}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <img src={Icon} alt="dumbbell" className="w-10 h-10" />
      <h3
        className={`
          text-2xl font-bold font-alegreya capitalize text-center
          transition-colors duration-300
          ${
            isSelected
              ? "text-[#FF2625]"
              : "text-[#3A1212] group-hover:text-[#FF2625]"
          }
        `}
      >
        {item}
      </h3>
    </div>
  );
};

export default BodyPart;
