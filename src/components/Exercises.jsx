import React, { useEffect, useState } from "react";
import {
  exerciseAPI,
  buildPaginationParams,
  normalizeExerciseData,
} from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalExercises: 0,
    exercisesPerPage: 12,
  });
  const [loading, setLoading] = useState(false);

  const exercisesPerPage = 12;

  const fetchExercises = async (page = 1) => {
    setLoading(true);
    try {
      const paginationParams = buildPaginationParams(page, exercisesPerPage);
      let result;

      if (bodyPart === "all") {
        // Get all exercises
        result = await exerciseAPI.getExercises({
          ...paginationParams,
          sortBy: "name",
          sortOrder: "asc",
        });
      } else {
        // Get exercises by body part
        result = await exerciseAPI.getExercisesByBodyPart(
          bodyPart,
          paginationParams
        );
      }

      // Normalize the exercise data for consistent UI
      const normalizedExercises = result.exercises.map(normalizeExerciseData);

      setExercises(normalizedExercises);
      setPagination(result.pagination);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when body part changes
    fetchExercises(1);
  }, [bodyPart]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchExercises(page);
    // Scroll to top of exercises section
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const current = currentPage;

    // Always show first page
    if (totalPages > 0) pages.push(1);

    // Show pages around current page
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(totalPages - 1, current + 1);
      i++
    ) {
      if (!pages.includes(i)) pages.push(i);
    }

    // Always show last page if more than 1 page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-8 p-4">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-4xl font-bold mb-3">
          Showing Results
          {bodyPart !== "all" && bodyPart !== "search-results" && (
            <span className="text-red-600 capitalize ml-2">
              for "{bodyPart}"
            </span>
          )}
          {bodyPart === "search-results" && (
            <span className="text-red-600 ml-2">from Search</span>
          )}
        </h2>

        {/* Exercise count info */}
        <p className="text-gray-600 text-base">
          Found {pagination.totalExercises} exercises
          {pagination.totalPages > 1 && (
            <span>
              {" "}
              • Page {currentPage} of {pagination.totalPages}
            </span>
          )}
        </p>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 justify-items-center">
        {exercises?.map((exercise, idx) => (
          <ExerciseCard key={exercise.id || idx} exercise={exercise} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 lg:mt-12">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          {generatePageNumbers().map((pageNum, index, arr) => (
            <React.Fragment key={pageNum}>
              {/* Add ellipsis if there's a gap */}
              {index > 0 && pageNum > arr[index - 1] + 1 && (
                <span className="px-2 text-gray-400">...</span>
              )}

              <Button
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-2 min-w-[40px] ${
                  currentPage === pageNum
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                }`}
              >
                {pageNum}
              </Button>
            </React.Fragment>
          ))}

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="px-3 py-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* No results message */}
      {exercises?.length === 0 && !loading && (
        <Card className="mt-6">
          <CardContent className="text-center py-8">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No exercises found
            </h3>
            <p className="text-gray-500 text-sm">
              {bodyPart === "search-results"
                ? "Try adjusting your search terms or browse by body part."
                : `No exercises found for "${bodyPart}". Try selecting a different body part.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Exercises;
