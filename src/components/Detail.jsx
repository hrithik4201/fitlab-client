import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
      label: "Body Part",
    },
    {
      icon: TargetImage,
      name: target,
      label: "Target Muscle",
    },
    {
      icon: EquipmentImage,
      name: equipment,
      label: "Equipment",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-16 p-5 items-center">
      {/* Exercise GIF */}
      <div className="flex-shrink-0">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-[500px] lg:w-[729px] lg:h-[742px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Exercise Details */}
      <div className="flex flex-col gap-8 lg:gap-[35px] flex-1">
        {/* Exercise Name */}
        <h1 className="text-3xl lg:text-[64px] font-bold capitalize leading-tight">
          {name}
        </h1>

        {/* Exercise Description */}
        <p className="text-lg lg:text-[24px] text-[#4F4C4C] leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-[#FF2625]">
            {name}
          </span>{" "}
          is one of the best exercises to target your{" "}
          <span className="capitalize font-semibold text-[#FF2625]">
            {target}
          </span>
          . It will help you improve your mood and gain energy.
        </p>

        {/* Exercise Details Cards */}
        <div className="space-y-6">
          {extraDetail?.map((item) => (
            <Card
              key={item.name}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-6">
                {/* Icon Circle */}
                <div className="w-20 h-20 lg:w-[100px] lg:h-[100px] bg-[#FFF2DB] rounded-full flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-8 h-8 lg:w-[50px] lg:h-[50px]"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">
                    {item.label}
                  </span>
                  <span className="text-xl lg:text-[30px] font-semibold capitalize">
                    {item.name}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-3 mt-4">
          <Badge variant="secondary" className="px-3 py-1">
            Body Part: {bodyPart}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            Target: {target}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            Equipment: {equipment}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Detail;
