import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  ExternalLink,
  MapPin,
} from "lucide-react";
import SectionHead from "./SectionHead";

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
    "inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-neon hover:text-ink group dark:bg-neon dark:text-ink";
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
    <div className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-10 dark:bg-black">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          n="02"
          tag="Experience"
          title="My Work Experience"
          sub="Hands-on experience and valuable insights gained during my journey"
        />

        {experience.map((exp, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 border-t border-ink/20 py-10 md:grid-cols-12 md:gap-10 md:py-14 dark:border-white/20"
          >
            {/* Left: who / when */}
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-black p-4">
                  <img
                    src={exp.logo}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                    alt={`${exp.company} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mt-6 font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                  {exp.position}
                </h3>
                <ul className="mt-6 space-y-2 text-ink/70 dark:text-slate-400">
                  <li className="flex items-center gap-2"><Briefcase className="h-5 w-5" /><span className="font-medium text-ink dark:text-white">{exp.company}</span></li>
                  <li className="flex items-center gap-2"><Calendar className="h-5 w-5" />{exp.duration}</li>
                  <li className="flex items-center gap-2"><MapPin className="h-5 w-5" />{exp.location}</li>
                </ul>
              </div>
            </div>

            {/* Right: contributions as numbered rows */}
            <div className="md:col-span-7">
              <h4 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-ink/60 dark:text-slate-400">
                <Briefcase className="h-4 w-4" /> Key Contributions
              </h4>
              <ol>
                {exp.description.map((task, index) => (
                  <li key={index} className="flex gap-5 border-b border-ink/10 py-5 dark:border-white/10">
                    <span className="mt-1 inline-flex h-7 min-w-7 items-center justify-center bg-neon px-1.5 text-xs font-semibold text-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg font-medium leading-snug">{task}</p>
                  </li>
                ))}
              </ol>

              <h4 className="mb-4 mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-ink/60 dark:text-slate-400">
                <code>{"</>"}</code> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-ink/30 px-5 py-2 text-sm font-medium transition-colors hover:bg-neon hover:text-ink dark:border-white/30">
                    {tech}
                  </span>
                ))}
              </div>

              {exp.workLink && (
                <div className="mt-8">
                  <WorkLink href={exp.workLink} label={exp.workLabel} />
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default InternshipExperience;
