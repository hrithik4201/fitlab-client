import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "../assets/icons/gym.png";

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const isSelected = bodyPart === item;

  return (
    <Card
      className={`
        cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg
        w-68 h-72 flex items-center justify-center
        ${
          isSelected
            ? "border-t-4 border-t-red-600 bg-white shadow-xl"
            : "bg-white hover:bg-gray-50 shadow-md"
        }
      `}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <CardContent className="flex flex-col items-center justify-center gap-12 p-6 text-center">
        <img
          src={Icon}
          alt="gym"
          className={`
            w-16 h-16 transition-transform duration-300
            ${isSelected ? "scale-110" : "group-hover:scale-105"}
          `}
        />
        <h3
          className={`
          text-2xl font-bold capitalize transition-colors duration-300
          ${isSelected ? "text-red-600" : "text-gray-800 hover:text-red-500"}
        `}
        >
          {item}
        </h3>
      </CardContent>
    </Card>
  );
};

export default BodyPart;
