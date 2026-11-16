import React from "react";
import { motion } from "framer-motion";
import { IoLocationSharp } from "react-icons/io5";
import { BsCalendarEvent } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import SectionHead from "./SectionHead";

const Education = () => {
  const experiences = [
    {
      degree: "Master of Computer Applications (MCA)",
      duration: "July 2023 - May 2025",
      college: "Christ (Deemed to be University)",
      location: "Bengaluru",
      percentage: "73%",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      duration: "Sep 2020 - July 2023",
      college: "Kristu Jayanti College",
      location: "Bengaluru",
      percentage: "83%",
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead n="01" tag="Education" title="Educational Journey" />
        <div className="grid gap-4 md:grid-cols-2">
          {experiences.map((e, i) => (
            <motion.article
              key={e.degree}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2rem] p-7 md:p-10 ${
                i === 0 ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/10"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-7xl font-medium leading-none tracking-tighter md:text-8xl">
                  0{i + 1}
                </span>
                <FaGraduationCap className={`text-3xl ${i === 0 ? "text-neon" : "text-ink"}`} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight md:text-4xl">
                  {e.degree}
                </h3>
                <p className="mt-3 text-xl font-medium">{e.college}</p>
                <div className={`mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${i === 0 ? "text-white/70" : "text-ink/60"}`}>
                  <span className="inline-flex items-center gap-2"><BsCalendarEvent /> {e.duration}</span>
                  <span className="inline-flex items-center gap-2"><IoLocationSharp /> {e.location}</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-neon px-5 py-2.5 font-medium text-ink">
                  <span>CGPA:</span>
                  <span className="font-semibold">{e.percentage}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
