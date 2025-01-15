import React from "react";
import { FaPython, FaJava, FaJs, FaPhp, FaReact, FaGit, FaDocker } from "react-icons/fa";
import { SiCplusplus, SiR, SiMysql, SiExpress, SiMongodb, SiSpringboot, SiPostman } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { motion } from "framer-motion";

const TopSkills = () => {
  const skills = [
    { name: "C", logo: <SiCplusplus size={40} className="text-blue-600" /> },
    { name: "C++", logo: <SiCplusplus size={40} className="text-green-600" /> },
    { name: "R", logo: <SiR size={40} className="text-indigo-600" /> },
    { name: "Python", logo: <FaPython size={40} className="text-yellow-600" /> },
    { name: "Java", logo: <FaJava size={40} className="text-red-600" /> },
    { name: "JavaScript", logo: <FaJs size={40} className="text-yellow-500" /> },
    { name: "PHP", logo: <FaPhp size={40} className="text-purple-600" /> },
    { name: "ExpressJS", logo: <SiExpress size={40} className="text-gray-800" /> },
    { name: "ReactJS", logo: <FaReact size={40} className="text-blue-500" /> },
    { name: "Spring Boot", logo: <SiSpringboot size={40} className="text-green-600" /> },
    { name: "MongoDB", logo: <SiMongodb size={40} className="text-green-800" /> },
    { name: "MySQL", logo: <SiMysql size={40} className="text-blue-800" /> },
    { name: "VS Code", logo: <VscVscode size={40} className="text-blue-600" /> },
    { name: "Git", logo: <FaGit size={40} className="text-blue-600" /> },
    { name: "Postman", logo: <SiPostman size={40} className="text-blue-500" /> },
    { name: "Docker", logo: <FaDocker size={40} className="text-blue-400" /> },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-4">
          My Expertise
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Technologies and tools I've been working with recently
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-6 
                shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300
                border border-gray-100 hover:border-blue-200"
            >
              <div className="mb-4 transform transition-transform duration-300 hover:scale-110">
                {skill.logo}
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSkills;
