import React from "react";
import { FaPython, FaJava, FaJs, FaReact, FaGit, FaDocker } from "react-icons/fa";
import {
  SiCplusplus,
  SiR,
  SiMysql,
  SiExpress,
  SiMongodb,
  SiSpringboot,
  SiPostman,
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiRabbitmq,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Terminal, Code, Bot, MousePointer2, Rocket } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Skills grouped by where they live in the stack.
 *
 * PHP was removed (not part of the current stack); TypeScript, Next.js, Redux
 * and RabbitMQ were added. The last group is the AI tooling used day-to-day —
 * those brands have no react-icons entry, so they use lucide glyphs tinted
 * with each product's brand colour instead of a wrong-looking logo.
 */
const groups = [
  {
    title: "Frontend",
    blurb: "Interfaces, state and the modern React ecosystem",
    skills: [
      { name: "ReactJS", logo: <FaReact size={36} className="text-sky-500" /> },
      { name: "Next.js", logo: <SiNextdotjs size={36} className="text-gray-900 dark:text-white" /> },
      { name: "Redux", logo: <SiRedux size={36} className="text-[#764ABC]" /> },
      { name: "TypeScript", logo: <SiTypescript size={36} className="text-[#3178C6]" /> },
      { name: "JavaScript", logo: <FaJs size={36} className="text-yellow-500" /> },
    ],
  },
  {
    title: "Backend",
    blurb: "APIs, services and messaging",
    skills: [
      { name: "ExpressJS", logo: <SiExpress size={36} className="text-gray-800 dark:text-slate-200" /> },
      { name: "Spring Boot", logo: <SiSpringboot size={36} className="text-green-600" /> },
      { name: "RabbitMQ", logo: <SiRabbitmq size={36} className="text-[#FF6600]" /> },
    ],
  },
  {
    title: "Databases",
    blurb: "Document and relational stores",
    skills: [
      { name: "MongoDB", logo: <SiMongodb size={36} className="text-green-800 dark:text-green-600" /> },
      { name: "MySQL", logo: <SiMysql size={36} className="text-blue-800 dark:text-blue-500" /> },
    ],
  },
  {
    title: "Languages",
    blurb: "Core languages behind everything above",
    skills: [
      { name: "Java", logo: <FaJava size={36} className="text-red-600" /> },
      { name: "Python", logo: <FaPython size={36} className="text-yellow-600" /> },
      { name: "C", logo: <SiCplusplus size={36} className="text-blue-600" /> },
      { name: "C++", logo: <SiCplusplus size={36} className="text-green-600" /> },
      { name: "R", logo: <SiR size={36} className="text-indigo-600 dark:text-indigo-400" /> },
    ],
  },
  {
    title: "Tools & Platforms",
    blurb: "Day-to-day workflow and delivery",
    skills: [
      { name: "Git", logo: <FaGit size={36} className="text-orange-600" /> },
      { name: "Docker", logo: <FaDocker size={36} className="text-blue-400" /> },
      { name: "Postman", logo: <SiPostman size={36} className="text-orange-500" /> },
      { name: "VS Code", logo: <VscVscode size={36} className="text-blue-600" /> },
    ],
  },
  {
    title: "AI Tools",
    blurb: "AI pair-programmers and agents I build with daily",
    skills: [
      { name: "Claude Code", logo: <Terminal size={36} style={{ color: "#D97757" }} /> },
      { name: "Codex", logo: <Code size={36} style={{ color: "#10A377" }} /> },
      { name: "ChatGPT", logo: <Bot size={36} style={{ color: "#10A377" }} /> },
      { name: "Cursor", logo: <MousePointer2 size={36} className="text-gray-900 dark:text-white" /> },
      { name: "Antigravity", logo: <Rocket size={36} className="text-indigo-500" /> },
    ],
  },
];

const TopSkills = () => (
  <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900/60 dark:to-slate-900/30 py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
        My Expertise
      </h2>
      <p className="text-center text-gray-600 dark:text-slate-400 mb-14 max-w-2xl mx-auto">
        Technologies and tools I work with, grouped by where they live in the
        stack — plus the AI tooling I pair with every day.
      </p>

      <div className="space-y-14">
        {groups.map((group, gi) => (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: gi * 0.05 }}
            aria-label={group.title}
          >
            {/* Group header */}
            <div className="mb-6 flex items-baseline gap-4">
              <h3 className="text-lg font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-gold-300">
                {group.title}
              </h3>
              <span className="hidden sm:block text-sm text-gray-500 dark:text-slate-500">
                {group.blurb}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent dark:from-gold-500/60 dark:from-slate-700" />
            </div>

            {/* Tiles */}
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {group.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:border-blue-200 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-800/60 dark:hover:border-gold-500/40"
                >
                  <span className="transition-transform duration-300 hover:scale-110">
                    {skill.logo}
                  </span>
                  <p className="text-center text-sm font-medium text-gray-700 dark:text-slate-300">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  </div>
);

export default TopSkills;
