import React from "react";
import { motion } from "framer-motion";
import { IoLocationSharp } from "react-icons/io5";
import { BsCalendarEvent } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
  const experiences = [
    {
      degree: "Master of Computer Applications (MCA)",
      duration: "July 2023 - May 2025",
      college: "Christ (Deemed to be University)",
      location: "Bengaluru",
      percentage: "73%",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      duration: "Sep 2020 - July 2023",
      college: "Kristu Jayanti College",
      location: "Bengaluru",
      percentage: "83%",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 -z-10"></div>
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaGraduationCap className="text-4xl text-blue-500" />
          {/* <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Educational Journey
            </span>
          </h2> */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
            Educational Journey
          </h1>
        </div>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
      </motion.div>

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto">
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 
                shadow-[0_4px_20px_rgba(0,0,0,0.06)] 
                hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] 
                transition-all duration-300
                border border-gray-100/50">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 
                        rounded-2xl flex items-center justify-center transform 
                        group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                        shadow-lg shadow-blue-500/20">
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-600 mb-2 
                          group-hover:text-blue-700 transition-colors duration-300">
                          {experience.degree}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <BsCalendarEvent className="text-blue-400" />
                          <span className="text-sm">{experience.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="md:border-l border-gray-100 md:pl-8 space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3 
                        group-hover:text-gray-900 transition-colors duration-300">
                        {experience.college}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-600">
                        <IoLocationSharp className="text-blue-400" />
                        <span className="text-sm">{experience.location}</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 
                      bg-gradient-to-r from-blue-50 to-blue-100/50 
                      rounded-full text-blue-600 font-medium
                      shadow-sm shadow-blue-100">
                      <span className="text-blue-500">CGPA:</span>
                      <span className="text-blue-700">{experience.percentage}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting Line */}
              {/* {index < experiences.length - 1 && (
                <div className="absolute left-[2.25rem] bottom-0 w-0.5 h-12 
                  bg-gradient-to-b from-blue-200 via-blue-100 to-transparent"></div>
              )} */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
