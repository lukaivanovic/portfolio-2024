import React, { useState, useEffect } from "react";
import CarouselDots from "./CarouselDots";
import { motion, AnimatePresence } from "motion/react";

const images = [
  {
    src: "/main.png",
    alt: "Manage your app logic and data from a single place",
  },
  {
    src: "/workflows.png",
    alt: "Build your logic and automation with the workflow editor",
  },
  {
    src: "/icons.png",
    alt: "Browse and use the most popular icon libraries",
  },
  {
    src: "/edition-panel.png",
    alt: "Create states, components or edit your elements visually",
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  function updateActiveIndex(index) {
    setActiveIndex(index);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length, activeIndex]);

  return (
    <div>
      <div className="relative main-image-container overflow-hidden rounded-lg mb-2 aspect-[8/5] flex items-center justify-center">
        <AnimatePresence initial={false}>
          <motion.img
            key={images[activeIndex].src}
            src={images[activeIndex].src}
            className="absolute max-w-full object-cover h-full hover:scale-[1.02]"
            style={{ transform: "none" }}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 260, damping: 36, mass: 1.5 },
              opacity: { duration: 0.2 },
            }}
          />
        </AnimatePresence>
      </div>
      <div className=" flex flex-row items-center justify-between w-full  text-secondary">
        <div>{images[activeIndex].alt}</div>
        <CarouselDots
          numberOfSlides={images.length}
          activeIndex={activeIndex}
          updateActiveIndex={updateActiveIndex}
        />
      </div>
    </div>
  );
};

export default Carousel;
