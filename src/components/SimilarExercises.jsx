import React from "react";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Dumbbell, TrendingUp } from "lucide-react";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Continue Your <span className="text-red-600">Fitness Journey</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover similar exercises to diversify your workout and target
            muscles more effectively
          </p>
        </div>

        {/* Target Muscle Exercises Section */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Similar Target Muscle Exercises
                  </h3>
                  <p className="text-green-700 font-medium">
                    Exercises that work the same primary muscle group
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {targetMuscleExercises && targetMuscleExercises.length > 0 ? (
            <HorizontalScrollbar data={targetMuscleExercises} />
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">
                    Loading Similar Exercises...
                  </h4>
                  <Loader />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Equipment Exercises Section */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-violet-50 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Similar Equipment Exercises
                  </h3>
                  <p className="text-purple-700 font-medium">
                    Other exercises using the same equipment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {equipmentExercises && equipmentExercises.length > 0 ? (
            <HorizontalScrollbar data={equipmentExercises} />
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">
                    Loading Equipment Exercises...
                  </h4>
                  <Loader />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pro Tip Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 mt-12">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Maximize Your Results
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Incorporating similar exercises helps prevent plateaus and
                  ensures balanced muscle development. Try rotating between
                  these variations to keep your workouts challenging and
                  engaging.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimilarExercises;
