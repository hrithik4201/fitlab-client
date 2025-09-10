import React, { useState } from "react";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";

const ExercisesHome = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50/30">
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </div>
  );
};

export default ExercisesHome;
