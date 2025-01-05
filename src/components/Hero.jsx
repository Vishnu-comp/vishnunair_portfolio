import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-blue-50 min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 lg:px-28 pt-16" // Added pt-16 to account for navbar height
    >
      {/* Left Text Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 text-left space-y-4"
      >
        <p className="text-5xl md:text-6xl font-bold text-gray-900 mt-4">Hi, I am</p>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4">
          Vishnu Nair
        </h1>

        {/* Add your introduction here */}
        <p className="text-xl text-gray-600 font-semibold mt-4">
          I'm an MCA student at Christ University Bengaluru and a JavaScript developer based in Bengaluru, Karnataka, India.
        </p>
        <p className="text-xl text-gray-600 font-semibold mt-4">
          I'm passionate about programming and web development
        </p>
        <p className="text-xl text-gray-600 font-semibold mt-4">
          I'm fluent in React.js, Spring Boot, and Node.js, and I love creating dynamic web applications with these technologies.
        </p>

        {/* Social Icons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex space-x-4 mt-6"
        >
          {/* Email */}
          <a
            href="vishnunair2323@gmail.com"
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
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
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
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
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
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

      {/* Right Image Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 flex justify-center items-center mb-8 md:mb-0"
      >
        <div className="relative w-64 md:w-96">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-lg transform -rotate-6"></div>
          <img
            src="https://github.com/user-attachments/assets/6816c3af-b64a-4ee2-9532-37c49af50d94"
            alt="Professional headshot"
            className="relative z-10 w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
