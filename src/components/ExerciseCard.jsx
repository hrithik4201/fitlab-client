import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExerciseCard = ({ exercise }) => {
  const exerciseId = exercise.exerciseId || exercise.id;
  const exerciseName = exercise.name;
  const bodyPart = exercise.bodyPart || exercise.bodyParts?.[0];
  const target = exercise.target || exercise.targetMuscles?.[0];
  const gifUrl = exercise.gifUrl;

  return (
    <Link to={`/exercise/${exerciseId}`} className="block w-full">
      <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border-0 shadow-lg h-full flex flex-col w-80">
        {/* Fixed Image Container */}
        <div className="relative overflow-hidden h-56 flex-shrink-0">
          <img
            src={gifUrl}
            alt={exerciseName}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/320x224/f0f0f0/666666?text=Exercise+Image";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Fixed Content Container */}
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div className="flex gap-2 mb-2 flex-wrap">
            <Badge
              variant="secondary"
              className="bg-pink-100 text-pink-700 hover:bg-pink-200 font-semibold capitalize text-xs px-2 py-1"
            >
              {bodyPart}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-700 hover:bg-amber-200 font-semibold capitalize text-xs px-2 py-1"
            >
              {target}
            </Badge>
          </div>

          {/* Fixed height title container with ellipsis for overflow */}
          <div className="">
            <h3 className="text-base font-bold text-gray-900 capitalize leading-tight group-hover:text-red-600 transition-colors duration-300 line-clamp-2 h-12 flex items-start">
              <span className="block overflow-hidden text-ellipsis">
                {exerciseName}
              </span>
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ExerciseCard;
