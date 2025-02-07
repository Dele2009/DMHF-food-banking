import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  className?: string;
}

const Carousel = ({
  children,
  autoPlay = false,
  interval = 3000,
  showIndicators = true,
  showArrows = true,
  loop = true,
  className,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = children.length;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextSlide = (step = 1) => {
    setCurrentIndex((prev) => (prev + step) % totalSlides);
  };

  const prevSlide = (step = 1) => {
    setCurrentIndex((prev) => (prev - step + totalSlides) % totalSlides);
  };

  const indicatorClick = (index: number) => {
    if (currentIndex < index) {
      nextSlide(index);
    } else {
      prevSlide(index);
    }
  };

  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        if (loop || currentIndex < totalSlides - 1) {
          nextSlide();
        }
      }, interval);
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [autoPlay, interval, loop, currentIndex, totalSlides]);

  return (
    <div
      className={`relative w-full  overflow-hidden ${className}`}
      ref={sliderRef}
    >
      <div
        className="flex w-full h-full  transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            className="w-full flex justify-center items-center flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {child}
          </motion.div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
            onClick={() => prevSlide()}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
            onClick={() => nextSlide()}
          >
            <FaChevronRight />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {children.map((_, index) => (
            <span
              key={index}
              onClick={()=> indicatorClick(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
