// import React from "react";
// import { Calendar, MapPin, Briefcase, Check } from "lucide-react";

// const InternshipExperience = () => {
//   const experience = {
//     position: "Junior Software Development Intern",
//     duration: "May 2024 - July 2024",
//     company: "ICIER",
//     location: "Remote",
//     logo: "https://github.com/user-attachments/assets/98cc99e4-dd56-4e1c-948e-276776c1f258", // Update with the actual path to the logo
//     description: [
//       "Developed robust web applications, focusing on the MERN stack.",
//       "Implemented front-end interfaces using React.js.",
//       "Designed databases with MongoDB and Mongoose.",
//       "Built server-side APIs using Express.js and Node.js.",
//     ],
//   };

//   return (
//     <div className="bg-blue-50 py-16 md:py-24">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Heading */}
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
//           My Internship Experience
//           <span className="block mt-4 w-24 mx-auto h-1.5 bg-blue-500 rounded-full"></span>
//         </h2>
//         <p className="text-gray-600 text-center mt-6 text-lg max-w-2xl mx-auto">
//           Hands-on experience and valuable insights gained during my internship journey
//         </p>

//         {/* Internship Card */}
//         <div className="mt-12 max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 hover:border-blue-200 transition-all duration-300">
//             {/* Header Section */}
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
//               <div>
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
//                   {experience.position}
//                 </h3>
//                 <div className="mt-4 space-y-2">
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Briefcase className="w-5 h-5 text-blue-500" />
//                     <span className="font-medium">{experience.company}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Calendar className="w-5 h-5 text-blue-500" />
//                     <span>{experience.duration}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <MapPin className="w-5 h-5 text-blue-500" />
//                     <span>{experience.location}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Company Logo */}
//               <div className="hidden md:flex items-center justify-center w-24 h-24">
//                 <img
//                   src={experience.logo}
//                   alt={`${experience.company} logo`}
//                   className="w-full h-full object-contain rounded-2xl border border-blue-100"
//                 />
//               </div>
//             </div>

//             {/* Divider */}
//             <div className="my-6 border-t border-gray-100"></div>

//             {/* Key Contributions */}
//             <div>
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Key Contributions</h4>
//               <div className="grid gap-3">
//                 {experience.description.map((task, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-4 p-3 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors duration-200"
//                   >
//                     <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
//                       <Check className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <p className="text-gray-700">{task}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Skills Used */}
//             <div className="mt-8">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Technologies Used</h4>
//               <div className="flex flex-wrap gap-2">
//                 {["MongoDB", "Express.js", "React.js", "Node.js"].map((skill) => (
//                   <span
//                     key={skill}
//                     className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InternshipExperience;




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
    <div className="bg-blue-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center"
        >
          My Internship Experience
          <span className="block mt-4 w-24 mx-auto h-1.5 bg-blue-500 rounded-full"></span>
        </motion.h2>
        <p className="text-gray-600 text-center mt-6 text-lg max-w-2xl mx-auto">
          Hands-on experience and valuable insights gained during my internship journey
        </p>

        {/* Internship Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 hover:border-blue-200 transition-all duration-300"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
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

            {/* Company Logo */}
            <div className="hidden md:flex items-center justify-center w-24 h-24">
              <img
                src={experience.logo}
                alt={`${experience.company} logo`}
                className="w-full h-full object-contain rounded-2xl border border-blue-100"
                onError={(e) => (e.target.src = "/fallback-logo.png")}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-100"></div>

          {/* Key Contributions */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Key Contributions</h4>
            <div className="grid gap-3">
              {experience.description.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className="flex items-start gap-4 p-3 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-gray-700">{task}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Used */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {["MongoDB", "Express.js", "React.js", "Node.js"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
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
