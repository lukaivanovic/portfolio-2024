import React, { useEffect } from "react";
import { motion, useAnimate } from "motion/react";

const CarouselDot = ({ active, onClick }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (active) {
      animate(
        "#bg",
        {
          width: "5rem",
        },
        { duration: 5 }
      );
      animate(scope.current, {
        width: "5rem",
      });
    } else {
      animate("#bg", {
        width: "0rem",
      });
      animate(scope.current, {
        width: "1rem",
      });
    }
  }, [active]);

  return (
    <div
      className="relative h-1 w-4 rounded-full bg-neutral-600 overflow-hidden cursor-pointer"
      ref={scope}
      onClick={onClick}
    >
      <div id="bg" className="absolute w-0 h-full bg-white"></div>
    </div>
  );
};

export default CarouselDot;
