import React from "react";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => (
  <div id="similar-exercises" className="mt-0 lg:mt-[100px]">
    {/* Target Muscle Exercises Section */}
    <div className="mb-16">
      <h2 className="text-2xl lg:text-[44px] font-bold text-black mb-8 ml-5">
        Similar <span className="text-[#FF2625] capitalize">Target Muscle</span>{" "}
        exercises
      </h2>

      <div className="p-2 relative">
        {targetMuscleExercises.length !== 0 ? (
          <HorizontalScrollbar data={targetMuscleExercises} />
        ) : (
          <Loader />
        )}
      </div>
    </div>

    {/* Equipment Exercises Section */}
    <div className="mb-16">
      <h2 className="text-2xl lg:text-[44px] font-bold text-black mb-8 ml-5 mt-16 lg:mt-[100px]">
        Similar <span className="text-[#FF2625] capitalize">Equipment</span>{" "}
        exercises
      </h2>

      <div className="p-2 relative">
        {equipmentExercises.length !== 0 ? (
          <HorizontalScrollbar data={equipmentExercises} />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  </div>
);

export default SimilarExercises;
