import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, Check } from "lucide-react";

const InternshipExperience = () => {
  const experience = {
    position: "Junior Software Development Intern",
    duration: "May 2024 - July 2024",
    company: "ICIER",
    location: "Remote",
    logo: "https://github.com/user-attachments/assets/98cc99e4-dd56-4e1c-948e-276776c1f258", // Update with the actual path to the logo
    description: [
      "Developed robust web applications, focusing on the MERN stack.",
      "Implemented front-end interfaces using React.js.",
      "Designed databases with MongoDB and Mongoose.",
      "Built server-side APIs using Express.js and Node.js.",
    ],
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading with enhanced styling */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center"
        >
          My Internship Experience
          <span className="block mt-4 w-32 mx-auto h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></span>
        </motion.h2>
        <p className="text-gray-600 text-center mt-6 text-lg max-w-2xl mx-auto">
          Hands-on experience and valuable insights gained during my internship journey
        </p>

        {/* Enhanced Internship Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
        >
          {/* Header Section with improved layout */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                {experience.position}
              </h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-5 h-5 text-blue-500" aria-hidden="true" />
                  <span className="font-medium">{experience.company}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-blue-500" aria-hidden="true" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-blue-500" aria-hidden="true" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Company Logo */}
            <div className="hidden md:flex items-center justify-center w-32 h-32 p-4 bg-white rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <img
                src={experience.logo}
                alt={`${experience.company} logo`}
                className="w-full h-full object-contain"
                onError={(e) => (e.target.src = "/fallback-logo.png")}
              />
            </div>
          </div>

          {/* Enhanced Divider */}
          <div className="my-8 border-t border-gray-200"></div>

          {/* Enhanced Key Contributions */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-500" />
              Key Contributions
            </h4>
            <div className="grid gap-4">
              {experience.description.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-white hover:from-blue-100/50 hover:to-blue-50/50 transition-all duration-300 border border-blue-100/50"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{task}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Skills Section */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <code className="text-blue-500">{"</>"}</code>
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-3">
              {["MongoDB", "Express.js", "React.js", "Node.js"].map((skill) => (
                <span
                  key={skill}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InternshipExperience;
