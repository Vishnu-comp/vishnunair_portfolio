import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, Check } from "lucide-react";

const InternshipExperience = () => {
  const experience = [
    {
      position: "Junior Software Development Intern",
      duration: "May 2024 - July 2024",
      company: "ICIER",
      location: "Remote",
      logo: "https://github.com/user-attachments/assets/98cc99e4-dd56-4e1c-948e-276776c1f258",
      description: [
        "Developed robust web applications, focusing on the MERN stack.",
        "Implemented front-end interfaces using React.js.",
        "Designed databases with MongoDB and Mongoose.",
        "Built server-side APIs using Express.js and Node.js.",
      ],
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js"],
    },
    {
      position: "Software Engineer Intern",
      duration: "Feb 2025 - Present",
      company: "SHOFFR - THE GOLD STANDARD OF RIDES",
      location: "Onsite",
      logo: "https://image2url.com/images/1754031405909-de6495fd-cfd4-4e4d-a367-ed7e7cefdac2.png",
      description: [
        "Built a feature to mark and manage trip importance levels, enhancing admin visibility and prioritization on the portal.",
        "Implemented a co-passenger module enabling users to add and manage multiple travelers within a single booking.",
        "Implemented data reconciliation with CSV parsing logic, improving financial data accuracy.",
        "Engineered a Dashcam view module with tab-based navigation to switch between front, rear, and cabin feeds."
      ],
      technologies: ["NextJS", "Tailwind CSS", "Java Springboot", "MySql"],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center"
        >
          My Work Experience
          <span className="block mt-4 w-32 mx-auto h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></span>
        </motion.h2>
        <p className="text-gray-600 text-center mt-6 text-lg max-w-2xl mx-auto">
          Hands-on experience and valuable insights gained during my journey
        </p>

        {/* Experience Cards */}
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                  {exp.position}
                </h3>
                <div className="mt-4 space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 p-4 bg-white rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200"></div>

            {/* Contributions */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-500" />
                Key Contributions
              </h4>
              <div className="grid gap-4">
                {exp.description.map((task, index) => (
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

            {/* Technologies */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <code className="text-blue-500">{"</>"}</code>
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-3">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InternshipExperience;
