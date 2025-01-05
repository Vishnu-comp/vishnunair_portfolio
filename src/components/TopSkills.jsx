import React from "react";
import { FaPython, FaJava, FaJs, FaPhp, FaReact, FaGit, FaDocker } from "react-icons/fa";
import { SiCplusplus, SiR, SiMysql, SiExpress, SiMongodb, SiSpringboot, SiPostman } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

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
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-10">
        MY TOP SKILLS
        <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-4 sm:p-6 transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out hover:rotate-2 hover:bg-blue-50 "
          >
            <div className="mb-3">{skill.logo}</div>
            <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 text-center">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSkills;
