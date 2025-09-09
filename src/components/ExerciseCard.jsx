import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Target, Zap } from "lucide-react";

const ExerciseCard = ({ exercise }) => {
  const getBodyPartColor = (bodyPart) => {
    const colors = {
      back: "bg-blue-100 text-blue-700 border-blue-200",
      chest: "bg-red-100 text-red-700 border-red-200",
      arms: "bg-purple-100 text-purple-700 border-purple-200",
      legs: "bg-green-100 text-green-700 border-green-200",
      shoulders: "bg-orange-100 text-orange-700 border-orange-200",
      core: "bg-yellow-100 text-yellow-700 border-yellow-200",
      cardio: "bg-pink-100 text-pink-700 border-pink-200",
    };
    return (
      colors[bodyPart?.toLowerCase()] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

  const getTargetColor = (target) => {
    const colors = {
      biceps: "bg-indigo-100 text-indigo-700 border-indigo-200",
      triceps: "bg-cyan-100 text-cyan-700 border-cyan-200",
      quadriceps: "bg-emerald-100 text-emerald-700 border-emerald-200",
      hamstrings: "bg-teal-100 text-teal-700 border-teal-200",
      glutes: "bg-rose-100 text-rose-700 border-rose-200",
      calves: "bg-amber-100 text-amber-700 border-amber-200",
    };
    return (
      colors[target?.toLowerCase()] ||
      "bg-slate-100 text-slate-700 border-slate-200"
    );
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
      <div className="relative">
        {/* Image Container */}
        <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              size="sm"
              className="bg-white/90 text-gray-900 hover:bg-white border-0 shadow-lg"
              asChild
            >
              <Link to={`/exercise/${exercise.id}`}>
                <Play className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </Button>
          </div>

          {/* Top-right corner badge for equipment */}
          {exercise.equipment && (
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className="bg-white/90 text-gray-700 border-0 shadow-sm"
              >
                <Zap className="h-3 w-3 mr-1" />
                {exercise.equipment}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge
              variant="outline"
              className={`text-xs font-medium ${getBodyPartColor(
                exercise.bodyPart
              )}`}
            >
              {exercise.bodyPart}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs font-medium ${getTargetColor(
                exercise.target
              )}`}
            >
              <Target className="h-3 w-3 mr-1" />
              {exercise.target}
            </Badge>
          </div>

          {/* Exercise Name */}
          <Link to={`/exercise/${exercise.id}`} className="block">
            <h3 className="font-bold text-lg text-gray-900 capitalize leading-tight group-hover:text-[#ff2625] transition-colors duration-200 line-clamp-2">
              {exercise.name}
            </h3>
          </Link>

          {/* Secondary info */}
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            <span className="capitalize">{exercise.bodyPart} workout</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Available</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ExerciseCard;
