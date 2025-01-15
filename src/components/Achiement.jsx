import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaTrophy } from "react-icons/fa";

export const Achievement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const certificateImages = [
    "https://github.com/user-attachments/assets/7086f200-ad9b-497b-b743-ee89530c4073",
    "https://github.com/user-attachments/assets/86af0e7f-e523-46af-b015-160ca3b53fd3",
    "https://github.com/user-attachments/assets/684167b4-9ae6-4a8b-a33f-772498e0436c",
    "https://github.com/user-attachments/assets/39ec5380-e78f-4007-9c48-62113d01ded1",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % certificateImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [certificateImages.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + certificateImages.length) % certificateImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % certificateImages.length);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaTrophy className="text-4xl text-blue-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              My Achievements
            </h2>
          </div>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Certifications and recognition that showcase my expertise and continuous learning journey.
          </p>
        </motion.div>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden
            min-h-[300px] md:min-h-[400px] lg:min-h-[600px]">
            {/* Main Image Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
              >
                <img
                  src={certificateImages[currentSlide]}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/800x600?text=Certificate+Not+Found")}
                  alt={`Certificate ${currentSlide + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              aria-label="Previous Certificate"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full
                shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300
                hover:bg-blue-50 hover:scale-110 transform"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next Certificate"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full
                shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300
                hover:bg-blue-50 hover:scale-110 transform"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Progress Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {certificateImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to certificate ${index + 1}`}
                  className={`transition-all duration-300 rounded-full 
                    ${currentSlide === index 
                      ? "w-8 h-2 bg-blue-500" 
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>

            {/* Certificate Counter */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 
              rounded-full text-sm font-medium text-gray-600 shadow-sm">
              {currentSlide + 1} / {certificateImages.length}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievement;