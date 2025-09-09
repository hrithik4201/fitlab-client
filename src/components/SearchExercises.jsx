import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      console.log("bodyPartsData", bodyPartsData);

      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );
      console.log(exercisesData);

      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.bodyPart.toLowerCase().includes(search)
      );

      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });

      setSearch("");
      setExercises(searchedExercises);
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
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Exercises"
            type="text"
          />
          <Button
            className="absolute right-0 top-0 h-14 px-6 lg:px-12 bg-[#FF2625] hover:bg-[#e01e20] text-white rounded-full text-base lg:text-xl"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="relative w-full p-5 mt-8">
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </div>
    </div>
  );
};

export default SearchExercises;
