import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  ExternalLink,
  MapPin,
} from "lucide-react";
import DoodleField from "./Doodles";

/**
 * The "View Work" button under an experience card.
 *
 * It takes either an in-app route ("/work") or a full URL and renders the
 * matching element: an internal Link for routes — same tab, no reload, and no
 * "this leaves the site" affordance — and a new-tab anchor with
 * rel="noopener noreferrer" for anything external. So the card data can point
 * at whatever should be shown without the caller having to remember which
 * attributes go with which.
 */
const WorkLink = ({ href, label = "View Work" }) => {
  if (!href) return null;
  const external = /^https?:\/\//i.test(href);
  const className =
    "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg dark:bg-gold-gradient dark:text-black hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg group";
  const inner = (
    <>
      <span>{label}</span>
      {external ? (
        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      ) : (
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      )}
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link to={href} className={className}>
      {inner}
    </Link>
  );
};

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
      // workLink: "https://your-project-link.com", // Add your link here
    },
    {
      position: "Software Engineer",
      duration: "Feb 2025 - Present",
      company: "SHOFFR - THE GOLD STANDARD OF RIDES",
      location: "Onsite",
      logo: "https://shoffr.in/icon/shoffr-hero-logo.svg",
      description: [
        "Built a feature to mark and manage trip importance levels, enhancing admin visibility and prioritization on the portal.",
        "Implemented a co-passenger module enabling users to add and manage multiple travelers within a single booking.",
        "Implemented data reconciliation with CSV parsing logic, improving financial data accuracy.",
        "Engineered a Dashcam view module with tab-based navigation to switch between front, rear, and cabin feeds."
      ],
      technologies: ["NextJS", "Tailwind CSS", "Java Springboot", "MySql"],
      // The write-up now lives in the repo (src/components/Work.jsx) rather
      // than in Notion, so this is an in-app route: no copy_link token, no
      // leaving the site, and the content stays visible to crawlers.
      workLink: "/work",
      workLabel: "View Work at Shoffr",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900/60 dark:to-black py-16 md:py-24">
      <DoodleField variant={2} />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white text-center"
        >
          My Work Experience
          <span className="block mt-4 w-32 mx-auto h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 dark:bg-gold-gradient rounded-full"></span>
        </motion.h2>
        <p className="text-gray-600 dark:text-slate-400 text-center mt-6 text-lg max-w-2xl mx-auto">
          Hands-on experience and valuable insights gained during my journey
        </p>

        {/* Experience Cards */}
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-4xl mx-auto bg-white dark:bg-slate-900/80 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700/60 p-6 md:p-10 hover:shadow-2xl hover:border-blue-200 dark:hover:border-gold-500/40 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:bg-gold-gradient text-transparent bg-clip-text">
                  {exp.position}
                </h3>
                <div className="mt-4 space-y-2 text-gray-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-500 dark:text-gold-400" />
                    <span className="font-medium">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500 dark:text-gold-400" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500 dark:text-gold-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 p-4 bg-black rounded-2xl shadow-md border border-gray-800 hover:shadow-lg transition-shadow duration-300">
                <img
                  src={exp.logo}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  alt={`${exp.company} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200 dark:border-slate-700/60"></div>

            {/* Contributions */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-500 dark:text-gold-400" />
                Key Contributions
              </h4>
              <div className="grid gap-4">
                {exp.description.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-white dark:from-gold-500/10 dark:to-slate-800/40 hover:from-blue-100/50 hover:to-blue-50/50 dark:hover:from-gold-500/15 transition-all duration-300 border border-blue-100/50 dark:border-gold-500/15"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 dark:bg-gold-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-slate-300 font-medium">{task}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <code className="text-blue-500 dark:text-gold-300">{"</>"}</code>
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-3">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm dark:bg-gold-gradient dark:text-black font-medium hover:from-blue-600 hover:to-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* View Work Link — route or URL, see WorkLink above */}
            {exp.workLink && (
              <div className="mt-8">
                <WorkLink href={exp.workLink} label={exp.workLabel} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InternshipExperience;