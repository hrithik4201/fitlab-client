import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExerciseCard from "./ExerciseCard";
import BodyPart from "./BodyPart";

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
    }
  }, [data]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = bodyParts ? 280 : 320; // Width based on card type
      scrollContainerRef.current.scrollBy({
        left: -cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = bodyParts ? 280 : 320; // Width based on card type
      scrollContainerRef.current.scrollBy({
        left: cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        No exercises available
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl border-gray-200 h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft className="h-5 w-5 text-red-600" />
        </Button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
        onScroll={checkScrollPosition}
      >
        {data.map((item, index) => (
          <div key={item.id || item || index} className="flex-shrink-0">
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
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl border-gray-200 h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight className="h-5 w-5 text-red-600" />
        </Button>
      )}

      {/* Scroll Indicator Dots (Optional) */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: Math.ceil(data.length / 4) }).map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-gray-300 opacity-50"
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
