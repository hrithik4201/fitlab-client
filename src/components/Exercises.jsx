import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exerciseAPI } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [totalExercises, setTotalExercises] = useState(0);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        setIsLoading(true);

        let result;
        if (bodyPart === "all") {
          result = await exerciseAPI.getExercises({
            page: currentPage,
            limit: exercisesPerPage,
          });
        } else {
          result = await exerciseAPI.getExercisesByBodyPart(bodyPart, {
            page: currentPage,
            limit: exercisesPerPage,
          });
        }

        // Handle the response structure from your backend
        const exercisesData = result.exercises || result;
        const pagination = result.pagination;

        setExercises(exercisesData);
        setTotalExercises(pagination?.totalExercises || exercisesData.length);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setExercises([]);
        setTotalExercises(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercisesData();
  }, [bodyPart, currentPage, setExercises]);

  // Reset to page 1 when bodyPart changes
  useEffect(() => {
    setCurrentPage(1);
  }, [bodyPart]);

  // Calculate pagination based on total exercises from API
  const totalPages = Math.ceil(totalExercises / exercisesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const getVisiblePageNumbers = () => {
    const delta = 2;
    const pages = [];
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (currentPage - delta > 2) {
      pages.push(1, "...");
    } else {
      pages.push(1);
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (currentPage + delta < totalPages - 1) {
      pages.push("...", totalPages);
    } else if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (isLoading) return <Loader />;

  if (!exercises || exercises.length === 0) {
    return (
      <div id="exercises" className="mt-12 p-5">
        <h2 className="text-4xl lg:text-[44px] font-bold mb-12 text-center lg:text-left">
          No Results Found
        </h2>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No exercises found for the selected criteria. Try a different body
            part or search term.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="exercises" className="mt-12 p-5">
      <h2 className="text-4xl lg:text-[44px] font-bold mb-12 text-center lg:text-left">
        Showing Results
      </h2>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-[50px] justify-items-center">
        {exercises.map((exercise, idx) => (
          <ExerciseCard
            key={exercise.exerciseId || exercise.id || exercise._id || idx}
            exercise={exercise}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-16 lg:mt-[114px] space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          {getVisiblePageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={`px-3 ${
                    currentPage === page
                      ? "bg-[#ff2625] hover:bg-[#e01e20] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        Showing {exercises.length} of {totalExercises} exercises
        {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
      </div>
    </div>
  );
};

export default Exercises;
