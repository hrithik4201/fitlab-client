import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { exerciseAPI } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        setIsLoading(true);
        const bodyPartsData = await exerciseAPI.getBodyParts();
        setBodyParts(bodyPartsData);
      } catch (error) {
        console.error("Error fetching body parts:", error);
        // Fallback data
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchBodyParts();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      setIsSearching(true);
      const result = await exerciseAPI.searchExercises(search.toLowerCase(), {
        limit: 50, // Get more results for search
      });

      // Extract exercises from the result
      const exercises = result.exercises || result;
      setExercises(exercises);

      // Scroll to results
      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      setSearch("");
    } catch (error) {
      console.error("Error searching exercises:", error);
      // You might want to show an error message to the user
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center mt-9 justify-center p-5">
      <h1 className="text-3xl lg:text-[44px] font-bold mb-12 text-center">
        Awesome Exercises You Should Know
      </h1>

      <div className="relative mb-18 w-full max-w-4xl">
        <div className="relative">
          <Input
            className="h-14 pl-6 pr-32 lg:pr-44 text-base font-bold border-none rounded-full bg-white shadow-lg"
            style={{ width: "100%" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search Exercises"
            type="text"
            disabled={isSearching}
          />
          <Button
            className="absolute right-0 top-0 h-14 px-6 lg:px-12 bg-[#FF2625] hover:bg-[#e01e20] text-white rounded-full text-base lg:text-xl disabled:opacity-50"
            onClick={handleSearch}
            disabled={isSearching || !search.trim()}
          >
            {isSearching ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Search className="h-5 w-5 mr-2" />
            )}
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      <div className="relative w-full p-5 mt-8">
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <HorizontalScrollbar
            data={bodyParts}
            bodyParts
            setBodyPart={setBodyPart}
            bodyPart={bodyPart}
          />
        )}
      </div>
    </div>
  );
};

export default SearchExercises;
