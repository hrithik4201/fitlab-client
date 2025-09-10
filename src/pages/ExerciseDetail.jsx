import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  exerciseAPI,
  normalizeExerciseData,
  fetchData,
  youtubeOptions,
} from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchExercisesData = async () => {
      setLoading(true);
      try {
        const exerciseDetailData = await exerciseAPI.getExerciseById(id);
        const normalizedExercise = normalizeExerciseData(exerciseDetailData);
        setExerciseDetail(normalizedExercise);

        try {
          const exerciseVideosData = await fetchData(
            `https://youtube-search-and-download.p.rapidapi.com/search?query=${normalizedExercise.name} exercise`,
            youtubeOptions
          );
          setExerciseVideos(exerciseVideosData.contents || []);
        } catch (videoError) {
          console.log("YouTube videos not available:", videoError);
          setExerciseVideos([]);
        }

        if (normalizedExercise.target) {
          try {
            const targetMuscleData = await exerciseAPI.getExercisesByMuscle(
              normalizedExercise.target,
              { limit: 6 }
            );
            const normalizedTargetExercises = targetMuscleData.exercises.map(
              normalizeExerciseData
            );
            setTargetMuscleExercises(normalizedTargetExercises);
          } catch (targetError) {
            console.log("Target muscle exercises not available:", targetError);
            setTargetMuscleExercises([]);
          }
        }

        // Fetch similar exercises by equipment
        if (normalizedExercise.equipment) {
          try {
            const equipmentData = await exerciseAPI.getExercisesByEquipment(
              normalizedExercise.equipment,
              { limit: 6 }
            );
            const normalizedEquipmentExercises = equipmentData.exercises.map(
              normalizeExerciseData
            );
            setEquipmentExercises(normalizedEquipmentExercises);
          } catch (equipmentError) {
            console.log("Equipment exercises not available:", equipmentError);
            setEquipmentExercises([]);
          }
        }
      } catch (error) {
        console.error("Error fetching exercise details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card>
          <CardContent className="flex items-center gap-4 p-8">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            <span className="text-lg font-medium">
              Loading exercise details...
            </span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!exerciseDetail.name) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card>
          <CardContent className="text-center p-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Exercise Not Found
            </h2>
            <p className="text-gray-500">
              The exercise you're looking for doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8 lg:mt-12">
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
