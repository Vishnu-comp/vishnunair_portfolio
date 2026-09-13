import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiMessageSquare } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi";

/**
 * One style for every field, in both themes.
 * (Previously each input's className was patched separately and the email
 * field kept its light-mode `bg-white/50`, which rendered as a grey slab in
 * dark mode while its siblings stayed dark.)
 */
const fieldClasses = [
  "w-full pl-12 pr-4 py-3.5 rounded-xl border backdrop-blur-sm",
  "border-gray-200 bg-white/50 text-gray-900 placeholder-gray-400",
  "dark:border-slate-600/80 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder-slate-500",
  "focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/30",
  "transition-all duration-200 outline-none",
].join(" ");

const labelClasses =
  "text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 block";

const ContactForm = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen py-20 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-slate-900/60 dark:via-transparent dark:to-slate-900/40 -z-10"></div>
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob dark:bg-blue-500/10 dark:mix-blend-normal"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-delay-2000 dark:bg-purple-500/10 dark:mix-blend-normal"></div>

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
              Let's Connect
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeInUp}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transform -skew-y-6 rounded-3xl shadow-xl opacity-10 dark:opacity-15"></div>
          <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-12">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Input */}
                <div className="relative">
                  <label htmlFor="contact-name" className={labelClasses}>
                    Your Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={fieldClasses}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="contact-email" className={labelClasses}>
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={fieldClasses}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="relative">
                <label htmlFor="contact-message" className={labelClasses}>
                  Your Message
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-gray-400 dark:text-slate-500" />
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="6"
                    className={fieldClasses}
                    placeholder="Tell me about your project, goals, and timeline..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 
                  text-white font-medium rounded-xl shadow-lg 
                  hover:shadow-blue-500/25 hover:shadow-xl 
                  transform transition-all duration-200
                  focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-500/30 focus:outline-none
                  flex items-center justify-center gap-2 group"
              >
                Send Message
                <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
