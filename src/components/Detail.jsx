import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Dumbbell, User } from "lucide-react";

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
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      lucideIcon: User,
    },
    {
      icon: TargetImage,
      name: target,
      label: "Target Muscle",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      lucideIcon: Target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
      label: "Equipment",
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
      lucideIcon: Dumbbell,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-4 items-center max-w-7xl mx-auto">
      {/* Exercise GIF */}
      <div className="flex-shrink-0">
        <Card className="overflow-hidden shadow-2xl">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full max-w-[400px] lg:w-[500px] lg:h-[500px] object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x500/f0f0f0/666666?text=Exercise+Image";
            }}
          />
        </Card>
      </div>

      {/* Exercise Details */}
      <div className="flex flex-col gap-4 lg:gap-6 flex-1 max-w-2xl">
        {/* Exercise Name */}
        <h1 className="text-3xl lg:text-5xl font-bold capitalize leading-tight text-gray-900">
          {name}
        </h1>

        {/* Exercise Description */}
        <div className="text-base lg:text-lg text-gray-600 leading-relaxed">
          <p>
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-red-600">
              {name}
            </span>{" "}
            is one of the best exercises to target your{" "}
            <span className="capitalize font-semibold text-red-600">
              {target}
            </span>
            . It will help you improve your mood and gain energy.
          </p>
        </div>

        {/* Exercise Properties */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {extraDetail.map((item, index) => {
            const LucideIcon = item.lucideIcon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardContent className="flex flex-col items-center text-center p-4 gap-3">
                  <div
                    className={`p-3 rounded-full ${item.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <LucideIcon className={`w-6 h-6 ${item.textColor}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      {item.label}
                    </p>
                    <Badge
                      variant="secondary"
                      className={`${item.bgColor} ${item.textColor} hover:${item.bgColor} font-semibold text-sm capitalize px-2 py-1`}
                    >
                      {item.name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Instructions Section */}
        {exerciseDetail.instructions &&
          exerciseDetail.instructions.length > 0 && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  How to Perform
                </h3>
                <ol className="space-y-2">
                  {exerciseDetail.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {instruction}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}

        {/* Secondary Muscles */}
        {exerciseDetail.secondaryMuscles &&
          exerciseDetail.secondaryMuscles.length > 0 && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  Secondary Muscles
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {exerciseDetail.secondaryMuscles.map((muscle, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="capitalize text-xs font-medium border-gray-300 hover:bg-gray-50"
                    >
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
};

export default Detail;
