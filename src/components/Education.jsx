import React from "react";
import { motion } from "framer-motion";

const Education = () => {
  const experiences = [
    {
      company: "Master of Computer Applications (MCA)",
      duration: "July 2023 - May 2025",
      college: "Christ (Deemed to be University)",
      location: "Bengaluru",
      percentage: "73%*",
    },
    {
      company: "Bachelor of Computer Applications (BCA)",
      duration: "Sep 2020 - July 2023",
      college: "Kristu Jayanti College",
      location: "Bengaluru",
      percentage: "83%",
    },
  ];

  return (
    <div className="py-12 px-6 sm:px-8 lg:px-24">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-4xl font-extrabold text-black mb-10"
      >
        MY EDUCATION
        <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
      </motion.h2>

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="flex flex-col md:flex-row items-center justify-between text-center md:text-left"
            >
              {/* Left Section */}
              <div className="w-full md:w-1/3 md:pr-4">
                <h3 className="text-lg text-black font-bold">
                  {experience.company}
                </h3>
                <p className="text-sm text-gray-700">{experience.duration}</p>
              </div>

              {/* Timeline Indicator */}
              <div className="w-full md:w-1/3 flex items-center justify-center relative">
                <div
                  aria-label={`Milestone ${index + 1}`}
                  className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold"
                >
                  {index + 1}
                </div>
                {index < experiences.length - 1 && (
                  <div
                    className="hidden md:block w-[2px] h-24 bg-blue-500 absolute left-1/2 transform -translate-x-1/2 top-full"
                    aria-hidden="true"
                  ></div>
                )}
              </div>

              {/* Right Section */}
              <div className="w-full md:w-1/3 md:pl-4">
                <h3 className="text-lg text-black font-bold">
                  {experience.college}
                </h3>
                <p className="text-sm text-gray-700 mt-2">
                  {experience.location}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Percentage:</strong> {experience.percentage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
