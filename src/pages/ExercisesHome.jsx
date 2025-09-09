import React, { useState } from 'react';
import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';

const ExercisesHome = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  return (
    <div>
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        exercises={exercises}
        bodyPart={bodyPart}
      />
    </div>
  );
};

export default ExercisesHome;
