import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import ExerciseCard from "./ExerciseCard";
import BodyPart from "./BodyPart";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => scrollPrev()}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-gray-200 h-12 w-12 rounded-full"
    >
      <ChevronLeft className="h-5 w-5 text-[#FF2625]" />
    </Button>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => scrollNext()}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-gray-200 h-12 w-12 rounded-full"
    >
      <ChevronRight className="h-5 w-5 text-[#FF2625]" />
    </Button>
  );
};

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => (
  <div className="relative">
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      wrapperClassName="scroll-wrapper"
      scrollContainerClassName="scroll-container"
    >
      {data.map((item) => (
        <div
          key={item.id || item}
          itemID={item.id || item}
          title={item.id || item}
          className="mx-5 first:ml-0 last:mr-0"
        >
          {bodyParts ? (
            <BodyPart
              item={item}
              setBodyPart={setBodyPart}
              bodyPart={bodyPart}
            />
          ) : (
            <ExerciseCard exercise={item} />
          )}
        </div>
      ))}
    </ScrollMenu>
  </div>
);

export default HorizontalScrollbar;
