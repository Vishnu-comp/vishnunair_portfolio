import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-br from-blue-100 via-white to-blue-100 min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 lg:px-28 pt-20"
    >
      {/* Left Text Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 text-left space-y-8"
      >
        <div className="space-y-6">
          {/* <p className="text-blue-600 font-semibold text-xl tracking-wide">Welcome to my portfolio</p> */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Hi, I am <span className="text-blue-600 relative">
              Vishnu Nair
              <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-200 -z-10 transform -rotate-2"></div>
            </span>
          </h1>
        </div>

        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
          MCA student at Christ University Bengaluru and <span className="text-blue-600 font-medium">JavaScript developer</span> passionate about creating dynamic web applications with React.js, Spring Boot, and Node.js.
        </p>

        {/* Social Icons with enhanced styling */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex space-x-8 mt-12"
        >
          {/* Email */}
          <a
            href="mailto:vishnunair2323@gmail.com"
            className="p-3 bg-white shadow-md rounded-xl hover:bg-blue-50 hover:scale-110 transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Vishnu-comp"
            className="p-3 bg-white shadow-md rounded-xl hover:bg-blue-50 hover:scale-110 transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
              />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/vishnu-nair-aa462b245/"
            className="p-3 bg-white shadow-md rounded-xl hover:bg-blue-50 hover:scale-110 transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Image section with enhanced effects */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 flex justify-center items-center mb-16 md:mb-0"
      >
        <div className="relative w-72 md:w-[28rem] aspect-square">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-blue-300/10 rounded-full animate-pulse delay-75"></div>
          <img
            src="https://github.com/user-attachments/assets/6816c3af-b64a-4ee2-9532-37c49af50d94"
            alt="Professional headshot"
            className="relative z-10 w-full h-full object-cover rounded-full border-8 border-white shadow-2xl"
          />
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
