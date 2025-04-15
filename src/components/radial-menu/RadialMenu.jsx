import React from "react";
import { useState, useMemo, useEffect } from "react";
import {
  IconContext,
  PenNib,
  Hammer,
  Cube,
  HandPointing,
  TextT,
  Path,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

const tools = [
  { index: 1, name: "Build", icon: <Hammer /> },
  { index: 2, name: "Path", icon: <Path /> },
  { index: 3, name: "Shapes", icon: <Cube /> },
  { index: 4, name: "Move", icon: <HandPointing /> },
  { index: 5, name: "Text", icon: <TextT /> },
  { index: 6, name: "Pen", icon: <PenNib /> },
];

const radius = 72;

const calculatePosition = (index) => {
  const angle = (2 * Math.PI) / tools.length;
  const x = Math.cos(angle * index) * radius - 16 + 160;
  const y = Math.sin(angle * index) * radius - 16 + 160;
  return { x, y };
};

const calculateTooltipPosition = (index) => {
  const angle = (2 * Math.PI) / tools.length;
  const x = Math.cos(angle * index) * (radius + 48) + 160;
  const y = Math.sin(angle * index) * (radius + 48) + 160;
  const tooltipAngle = angle * index;

  // Reverse text direction if angle is between PI/2 and 2PI/3
  const adjustedAngle =
    tooltipAngle >= Math.PI / 2 && tooltipAngle <= (3 * Math.PI) / 2
      ? tooltipAngle + Math.PI
      : tooltipAngle;

  return { x, y, angle: adjustedAngle };
};

// Calculate the rotation angle for the pie slice
const calculateStartingAngle = (index) => {
  const angle = (360 / tools.length) * index + 90;
  return angle - 360 / tools.length / 2;
};

const generateClipPath = (index) => {
  // const pieSliceSize = 360 / tools.length;
  const startAngle = calculateStartingAngle(index);
  const endAngle = calculateStartingAngle(index + 1);

  // Convert angles to radians
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;

  // Center point
  const center = { x: 50, y: 50 };

  // Calculate number of points to use for arc (more points = smoother arc)
  let angleRange = endAngle - startAngle;
  if (angleRange <= 0) angleRange += 360;
  const numPoints = Math.max(2, Math.ceil(angleRange / 5)); // One point every 5 degrees

  // Generate points along the arc
  const points = [];
  points.push(`${center.x}% ${center.y}%`); // Start at center

  // Add points along the arc
  for (let i = 0; i <= numPoints; i++) {
    let angle;
    if (endAngle > startAngle) {
      angle = startRad + (i / numPoints) * (endRad - startRad);
    } else {
      // Handle case where end angle is less than start angle (crossing 0/360)
      const adjustedEndRad = endRad + (endRad < startRad ? 2 * Math.PI : 0);
      angle = startRad + (i / numPoints) * (adjustedEndRad - startRad);
    }

    const x = center.x + 50 * Math.cos(angle);
    const y = center.y + 50 * Math.sin(angle);
    points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  // Create the polygon path
  return `polygon(${points.join(", ")})`;
};

const RadialMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const startingAngle = useMemo(() => {
    return calculateStartingAngle(hoveredIndex);
  }, [hoveredIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isMenuOpen) return;

      if (event.key === "ArrowLeft") {
        setHoveredIndex((prevIndex) => {
          const newIndex = prevIndex - 1;
          return newIndex < 1 ? tools.length : newIndex;
        });
      } else if (event.key === "ArrowRight") {
        setHoveredIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          return newIndex > tools.length ? 1 : newIndex;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <div className="radial-menu h-[320px] w-[320px] relative cursor-default scale-150">
      <motion.div
        animate={isMenuOpen ? "active" : "inactive"}
        variants={{
          inactive: {
            backgroundColor: "var(--color-gray-100)",
            borderColor: "var(--color-gray-100)",
          },
          active: {
            backgroundColor: "white",
            borderColor: "var(--color-blue-500)",
          },
        }}
        whileHover={!isMenuOpen ? { height: 72, width: 72, scale: 1.1 } : {}}
        className="h-[56px] w-[56px]  text-gray-600 text-[10px] border border-gray-100 rounded-full  flex flex-col items-center justify-center gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <IconContext.Provider
          value={{
            color: "black",
            size: 16,
            weight: "regular",
          }}
        >
          {tools[selectedIndex - 1].icon}
        </IconContext.Provider>

        {tools[selectedIndex - 1].name}
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="w-full h-full"
            initial={{ rotate: -45 }}
            animate={{ rotate: 0 }}
            exit={{ rotate: -45 }}
          >
            {hoveredIndex !== null && (
              <motion.div
                className="absolute w-[160px] h-[160px] origin-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                initial={{ rotate: startingAngle }}
                animate={{ rotate: startingAngle }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  className="absolute w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(transparent 0deg, var(--color-blue-200) 0deg 60deg, transparent 60deg)`,
                    maskImage:
                      "radial-gradient(circle, black 0%, transparent 70%)",
                    WebkitMaskImage:
                      "radial-gradient(circle, black 0%, transparent 70%)",
                  }}
                />
              </motion.div>
            )}

            {tools.map((tool) => (
              <div>
                <div
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    clipPath: generateClipPath(tool.index),
                  }}
                  onMouseEnter={() => setHoveredIndex(tool.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(tool.index)}
                >
                  <div className="w-full h-full" />
                </div>

                <motion.div
                  initial="inactive"
                  animate={
                    isMenuOpen
                      ? hoveredIndex === tool.index
                        ? "hover"
                        : "active"
                      : "inactive"
                  }
                  exit="inactive"
                  variants={{
                    inactive: { x: 160, y: 160, scale: 0, opacity: 0 },
                    active: {
                      x: calculatePosition(tool.index).x,
                      y: calculatePosition(tool.index).y,
                      scale: 1,
                      opacity: 1,
                    },
                    hover: {
                      x: calculatePosition(tool.index).x,
                      y: calculatePosition(tool.index).y,
                      scale: 1.3,
                      opacity: 1,
                    },
                  }}
                  key={tool.index}
                  className={`absolute w-8 h-8 bg-white rounded-md flex items-center justify-center ${
                    hoveredIndex === tool.index
                      ? "border-1 border-blue-500"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(tool.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(tool.index)}
                >
                  <IconContext.Provider
                    value={{
                      color:
                        hoveredIndex === tool.index
                          ? "var(--color-gray-900)"
                          : "var(--color-gray-400)",
                      size: 16,
                      weight: "regular",
                    }}
                  >
                    {tool.icon}
                  </IconContext.Provider>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bg-gray-100 py-0.5 px-1 text-[8px] text-gray-600 origin-center rounded-full"
                  style={{
                    left: calculateTooltipPosition(tool.index).x,
                    top: calculateTooltipPosition(tool.index).y,
                    transform: `translate(-50%, -50%) rotate(${
                      calculateTooltipPosition(tool.index).angle
                    }rad)`,
                    display: hoveredIndex === tool.index ? "block" : "none",
                  }}
                  // style={{
                  //   transform: `translate(${
                  //     calculateTooltipPosition(tool.index).x
                  //   }px, ${calculateTooltipPosition(tool.index).y}px)`,
                  // }}
                >
                  {tool.name}
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RadialMenu;
