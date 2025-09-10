import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchData, youtubeOptions, exerciseAPI } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchExercisesData = async () => {
      const youtubeSearchUrl = import.meta.env.VITE_YOUTUBE_API_URL;

      const exerciseDetailData = await exerciseAPI.getExerciseById(id);
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await exerciseAPI.getExercisesByTarget(
        exerciseDetailData.target
      );
      setTargetMuscleExercises(
        targetMuscleExercisesData.exercises || targetMuscleExercisesData
      );

      const equipmentExercisesData = await exerciseAPI.getExercisesByEquipment(
        exerciseDetailData.equipment
      );
      setEquipmentExercises(
        equipmentExercisesData.exercises || equipmentExercisesData
      );
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <div className="mt-24 lg:mt-[96px]">
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </div>
  );
};

export default ExerciseDetail;
