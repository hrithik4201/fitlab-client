import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExerciseCard = ({ exercise }) => {
  const exerciseId = exercise.exerciseId || exercise.id;
  const exerciseName = exercise.name;
  const bodyPart = exercise.bodyPart;
  const target = exercise.target;
  const equipment = exercise.equipment;
  const difficulty = exercise.difficulty;
  const category = exercise.category;

  const imageUrl =
    exercise.gifUrl ||
    `https://via.placeholder.com/400x300?text=${encodeURIComponent(
      exerciseName
    )}`;

  return (
    <Link className="group" to={`/exercise/${exerciseId}`}>
      <Card className="w-full max-w-[400px] bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={exerciseName}
            loading="lazy"
            className="w-full h-[300px] lg:h-[326px] object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.target.src = `https://via.placeholder.com/400x300/ff2625/white?text=${encodeURIComponent(
                exerciseName
              )}`;
            }}
          />

          {/* Overlay with badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            {difficulty && (
              <Badge
                variant="secondary"
                className={`text-xs font-medium ${
                  difficulty === "beginner"
                    ? "bg-green-100 text-green-800"
                    : difficulty === "intermediate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            )}
            {category && (
              <Badge variant="outline" className="text-xs bg-white/90">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Exercise Name */}
          <h3 className="text-lg font-bold text-gray-900 capitalize leading-tight line-clamp-2 group-hover:text-[#ff2625] transition-colors">
            {exerciseName}
          </h3>

          {/* Body Part and Target */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Body Part:</span>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 capitalize"
              >
                {bodyPart}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Target:</span>
              <Badge
                variant="secondary"
                className="bg-purple-50 text-purple-700 capitalize"
              >
                {target}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Equipment:</span>
              <Badge variant="outline" className="capitalize">
                {equipment}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ExerciseCard;
