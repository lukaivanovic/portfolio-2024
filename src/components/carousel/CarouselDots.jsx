import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";
import CarouselDot from "./CarouselDot";

const CarouselDots = ({ numberOfSlides, activeIndex, updateActiveIndex }) => {
  return (
    <div className="flex items-center justify-center gap-[6px]">
      {Array.from({ length: numberOfSlides }).map((_, index) => (
        <CarouselDot
          key={index}
          active={index === activeIndex}
          onClick={() => updateActiveIndex(index)}
        />
      ))}
    </div>
  );
};

export default CarouselDots;
