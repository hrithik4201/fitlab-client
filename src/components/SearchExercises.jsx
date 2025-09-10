import React, { useEffect, useState } from "react";
import { exerciseAPI, normalizeExerciseData } from "../utils/fetchData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2 } from "lucide-react";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [searching, setSearching] = useState(false);

  // Fetch body parts on component mount
  useEffect(() => {
    const fetchBodyPartsData = async () => {
      try {
        const bodyPartsData = await exerciseAPI.getBodyParts();
        setBodyParts(bodyPartsData);
      } catch (error) {
        console.error("Error fetching body parts:", error);
        // Fallback body parts if API fails
        setBodyParts([
          "all",
          "back",
          "cardio",
          "chest",
          "lower arms",
          "lower legs",
          "neck",
          "shoulders",
          "upper arms",
          "upper legs",
          "waist",
        ]);
      }
    };

    fetchBodyPartsData();
  }, []);

  const handleSearch = async () => {
    if (search.trim()) {
      setSearching(true);
      try {
        // Use the search endpoint with fuzzy matching
        const result = await exerciseAPI.searchExercises(search.trim(), {
          limit: 20, // Get more results for search
          threshold: 0.3, // Moderate fuzzy matching
        });

        // Normalize the exercise data
        const normalizedExercises = result.exercises.map(normalizeExerciseData);

        setExercises(normalizedExercises);
        setBodyPart("search-results"); // Set special body part for search results
        setSearch("");

        // Scroll to exercises section
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      } catch (error) {
        console.error("Search error:", error);
        // Fallback: try filter endpoint if search fails
        try {
          const fallbackResult = await exerciseAPI.filterExercises({
            search: search.trim(),
            limit: 20,
          });
          const normalizedExercises = fallbackResult.exercises.map(
            normalizeExerciseData
          );
          setExercises(normalizedExercises);
          setBodyPart("search-results");
          setSearch("");
          window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
        } catch (fallbackError) {
          console.error("Fallback search error:", fallbackError);
        }
      } finally {
        setSearching(false);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleBodyPartClick = (selectedBodyPart) => {
    setBodyPart(selectedBodyPart);
    window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center mt-9 px-5 py-12">
      <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-center leading-tight">
        Awesome Exercises You <br className="hidden sm:block" /> Should Know
      </h2>

      {/* Search Bar */}
      <div className="relative mb-12 w-full max-w-4xl">
        <div className="relative flex">
          <Input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={searching}
            className="h-14 text-lg font-semibold border-2 border-gray-200 rounded-l-full rounded-r-none px-6 focus:border-red-500 focus-visible:ring-red-500"
          />
          <Button
            onClick={handleSearch}
            disabled={searching || !search.trim()}
            className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-l-none rounded-r-full border-2 border-red-600 hover:border-red-700"
          >
            {searching ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Body Parts Tab-like UI */}
      <div className="w-full max-w-6xl">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Browse by Body Part
          </h3>
        </div>

        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {bodyParts.map((part) => (
            <Button
              key={part}
              variant={bodyPart === part ? "default" : "outline"}
              onClick={() => handleBodyPartClick(part)}
              className={`
                h-12 text-base font-semibold capitalize transition-all duration-200
                ${
                  bodyPart === part
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg transform scale-105"
                    : "hover:bg-red-50 hover:text-red-600 hover:border-red-200 hover:scale-105"
                }
              `}
            >
              {part}
            </Button>
          ))}
        </div>

        {/* Mobile View - Scrollable Tabs */}
        <div className="md:hidden">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-2 min-w-max px-4">
              {bodyParts.map((part) => (
                <Badge
                  key={part}
                  variant={bodyPart === part ? "default" : "outline"}
                  onClick={() => handleBodyPartClick(part)}
                  className={`
                    cursor-pointer px-4 py-2 text-sm font-medium capitalize whitespace-nowrap
                    transition-all duration-200 hover:scale-105
                    ${
                      bodyPart === part
                        ? "bg-red-600 hover:bg-red-700 text-white shadow-md"
                        : "hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    }
                  `}
                >
                  {part}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Body Part Indicator */}
        {bodyPart && bodyPart !== "all" && bodyPart !== "search-results" && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Showing exercises for:{" "}
              <Badge
                variant="secondary"
                className="ml-1 capitalize bg-red-100 text-red-700"
              >
                {bodyPart}
              </Badge>
            </p>
          </div>
        )}

        {bodyPart === "search-results" && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Showing:{" "}
              <Badge
                variant="secondary"
                className="ml-1 bg-blue-100 text-blue-700"
              >
                Search Results
              </Badge>
            </p>
          </div>
        )}

        {bodyPart === "all" && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Showing:{" "}
              <Badge
                variant="secondary"
                className="ml-1 bg-green-100 text-green-700"
              >
                All Exercises
              </Badge>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchExercises;
