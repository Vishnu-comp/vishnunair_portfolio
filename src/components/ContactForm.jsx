// import React from "react";

// const ContactForm = () => {
//   return (
//     <div className="bg-blue-50 py-12 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-36 font-sans text-gray-900">
//       {/* Title Section */}
//       <h2 className="text-4xl sm:text-5xl text-center font-extrabold text-gray-800">
//         Contact Me
//         <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
//       </h2>
//       <p className="text-base sm:text-lg text-gray-600 mt-6 leading-relaxed text-center">
//         Any project starts with goal setting. If you have a vision, I can design it. After the inquiry, I will reply within 2-3 working days with an approximate quote or questions for more details.
//       </p>

//       {/* Form Section */}
//       <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 bg-white shadow-lg rounded-lg p-6 sm:p-8">
//         <input
//           type="text"
//           placeholder="Your name"
//           className="p-4 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="email"
//           placeholder="Your email"
//           className="p-4 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <select
//           className="p-4 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="" disabled selected>
//             Project type
//           </option>
//           <option value="Design">Design</option>
//           <option value="Development">Development</option>
//         </select>
//         <select
//           className="p-4 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="" disabled selected>
//             Budget
//           </option>
//           <option value="<$1000">Less than $1000</option>
//           <option value="$1000-$5000">$1000-$5000</option>
//           <option value=">$5000">More than $5000</option>
//         </select>
//         <input
//           type="url"
//           placeholder="Your website (if exists)"
//           className="p-4 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
//         />
//         <textarea
//           placeholder="Project details, context, how can I help..."
//           className="p-4 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
//           rows="5"
//         />
//         <button
//           type="submit"
//           className="p-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 md:col-span-2 text-sm sm:text-base"
//         >
//           Get in touch
//         </button>
//       </form>

//       {/* Footer Section */}
//       <div className="mt-12 text-center">
//         <p className="text-base sm:text-lg text-gray-600">
//           Email me at{" "}
//           <a href="mailto:hi@kristi.digital" className="text-blue-500 underline">
//             hi@kristi.digital
//           </a>
//         </p>
//         <div className="mt-6 flex justify-center gap-4 sm:gap-6">
//           <a href="#" className="text-gray-600 hover:text-blue-500">
//             <i className="fab fa-dribbble text-xl sm:text-2xl"></i>
//           </a>
//           <a href="#" className="text-gray-600 hover:text-blue-500">
//             <i className="fab fa-instagram text-xl sm:text-2xl"></i>
//           </a>
//           <a href="#" className="text-gray-600 hover:text-blue-500">
//             <i className="fab fa-twitter text-xl sm:text-2xl"></i>
//           </a>
//           <a href="#" className="text-gray-600 hover:text-blue-500">
//             <i className="fab fa-linkedin text-xl sm:text-2xl"></i>
//           </a>
//           <a href="#" className="text-gray-600 hover:text-blue-500">
//             <i className="fab fa-slack text-xl sm:text-2xl"></i>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;







// import React from "react";

// const ContactForm = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-16 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-36 font-sans">
//       <div className="max-w-4xl mx-auto">
//         {/* Title Section with enhanced styling */}
//         <div className="text-center space-y-4">
//           <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
//             Let's Work Together
//             <span className="block mt-4 w-24 mx-auto h-1.5 bg-blue-500 rounded-full"></span>
//           </h2>
         
         
//           <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-2xl mx-auto">
//             Have a project in mind? I'd love to hear about it. Send me a message and 
//             I'll get back to you within 48 hours with a response or a time to connect.
//           </p>
//         </div>

//         {/* Enhanced Form Section */}
//         <div className="mt-12">
//           <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 sm:p-10">
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Name Field */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Your Name</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 {/* Email Field */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Email Address</label>
//                   <input
//                     type="email"
//                     className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                     placeholder="john@example.com"
//                   />
//                 </div>

//                 {/* Project Type */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Project Type</label>
//                   <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm">
//                     <option value="" disabled selected>Select project type</option>
//                     <option value="Web Development">Web Development</option>
//                     <option value="UI Design">UI Design</option>
//                     <option value="Full Stack">Full Stack Project</option>
//                   </select>
//                 </div>

//                 {/* Budget Range */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Budget Range</label>
//                   <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm">
//                     <option value="" disabled selected>Select budget range</option>
//                     <option value="small">$1k - $5k</option>
//                     <option value="medium">$5k - $10k</option>
//                     <option value="large">$10k+</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Website Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Website (Optional)</label>
//                 <input
//                   type="url"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                   placeholder="https://yourwebsite.com"
//                 />
//               </div>

//               {/* Project Details */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Project Details</label>
//                 <textarea
//                   rows="5"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                   placeholder="Tell me about your project, goals, and timeline..."
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Enhanced Footer Section */}
//         <div className="mt-12 text-center space-y-6">
//           <div className="flex items-center justify-center space-x-2">
//             <div className="h-px w-12 bg-gray-300"></div>
//             <p className="text-gray-600">or reach out directly</p>
//             <div className="h-px w-12 bg-gray-300"></div>
//           </div>
          
//           <a href="mailto:contact@tomaszgajda.com" 
//              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
//             <span className="text-lg">vishnunair2323@gmail.com</span>
//           </a>

//           <div className="flex justify-center space-x-6">
//             <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
//               </svg>
//             </a>
//             <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;


import React from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-16 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-36 font-sans">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.3 }}
      >
        {/* Title Section with Enhanced Styling */}
        <motion.div className="text-center space-y-4" variants={fadeInUp}>
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Let's Work Together
            <span className="block mt-4 w-24 mx-auto h-1.5 bg-blue-500 rounded-full"></span>
          </h2>
          <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message
            and I'll get back to you within 48 hours with a response or a time
            to connect.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div className="mt-12" variants={fadeIn}>
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 sm:p-10">
            <motion.form
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ staggerChildren: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div className="space-y-2" variants={fadeInUp}>
                  <label className="text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div className="space-y-2" variants={fadeInUp}>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="john@example.com"
                  />
                </motion.div>
                {/* <motion.div className="space-y-2" variants={fadeInUp}>
                  <label className="text-sm font-medium text-gray-700">
                    Project Type
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm">
                    <option value="" disabled selected>
                      Select project type
                    </option>
                    <option value="Web Development">Web Development</option>
                    <option value="UI Design">UI Design</option>
                    <option value="Full Stack">Full Stack Project</option>
                  </select>
                </motion.div> */}
                {/* <motion.div className="space-y-2" variants={fadeInUp}>
                  <label className="text-sm font-medium text-gray-700">
                    Budget Range
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm">
                    <option value="" disabled selected>
                      Select budget range
                    </option>
                    <option value="small">$1k - $5k</option>
                    <option value="medium">$5k - $10k</option>
                    <option value="large">$10k+</option>
                  </select>
                </motion.div> */}
              </div>
              {/* <motion.div className="space-y-2" variants={fadeInUp}>
                <label className="text-sm font-medium text-gray-700">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="https://yourwebsite.com"
                />
              </motion.div> */}
              <motion.div className="space-y-2" variants={fadeInUp}>
                <label className="text-sm font-medium text-gray-700">
                  Project Details
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Tell me about your project, goals, and timeline..."
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                variants={fadeInUp}
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
