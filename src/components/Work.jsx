import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  ExternalLink,
  Layers3,
  MapPin,
} from "lucide-react";

const workHighlights = [
  {
    number: "01",
    title: "Trip prioritizations algorithm",
    description:
      "Exploring logic that helps teams surface the most important trips at the right moment.",
  },
  {
    number: "02",
    title: "Co-passenger modules in partner portal",
    description:
      "A partner-facing module for adding and managing co-passengers within a booking.",
  },
  {
    number: "03",
    title: "Backend–frontend synchronisation",
    description:
      "Connecting data and interface states so partner workflows stay consistent and dependable.",
  },
  {
    number: "04",
    title: "B2B partnership webpage",
    description:
      "A focused web experience for presenting and supporting business partnerships.",
  },
  {
    number: "05",
    title: "Automated flight-delay handling",
    description:
      "Making delay-related workflows more predictable through thoughtful automation.",
  },
  {
    number: "06",
    title: "Address functionality",
    description:
      "Designing dependable address capture and management for the booking journey.",
  },
  {
    number: "07",
    title: "Paytm Payment Link",
    description:
      "Supporting a smoother handoff from the product experience to payment completion.",
  },
  {
    number: "08",
    title: "Ops Ticketing System",
    description:
      "Structuring operational issues into a more trackable and actionable workflow.",
  },
];

const currentResponsibilities = [
  "Built a feature to mark and manage trip importance levels, improving admin visibility and prioritization.",
  "Implemented a co-passenger module that supports multiple travelers within one booking.",
  "Implemented data reconciliation with CSV parsing logic to improve financial data accuracy.",
  "Engineered a Dashcam view with tab-based navigation for front, rear, and cabin feeds.",
];

const Work = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50/60 pt-24 text-gray-800">
      <section className="relative px-6 pb-16 pt-12 md:px-12 md:pb-24 lg:px-20 lg:pt-20">
        <div className="pointer-events-none absolute -right-24 top-4 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold tracking-wide text-blue-600 shadow-sm">
              <BriefcaseBusiness className="h-4 w-4" />
              WORK / SHOFFR
            </div>
            <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-7xl">
              Building thoughtful systems for{" "}
              <span className="relative inline-block text-blue-600">
                better journeys.
                <span className="absolute bottom-1 left-0 -z-10 h-3 w-full -rotate-2 bg-blue-200/80" />
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
              A first look at the product problems, workflows, and experiences I
              have been shaping as a Software Engineer at Shoffr — the gold
              standard of rides.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work-highlights"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore the work
                <ArrowUpRight className="h-5 w-5" />
              </a>
              <a
                href="https://app.notion.com/p/Shoffr-Work-3078cf31ef1b80dfadfdf0daebb9fdd2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-6 py-3 font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-white"
              >
                Open project notes
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-100 bg-white/85 p-6 shadow-[0_20px_70px_rgba(59,130,246,0.12)] backdrop-blur-sm md:p-10 lg:p-12"
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                <span className="rounded-full bg-blue-50 px-3 py-1">Featured experience</span>
                <span className="text-gray-400">01</span>
              </div>
              <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-5xl">
                Software Engineer
              </h2>
              <p className="mt-3 text-xl font-medium text-blue-600">
                Shoffr — The Gold Standard of Rides
              </p>
              <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
                Working across partner experiences and operational tooling,
                translating real-world ride workflows into reliable product
                features.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                  <Clock3 className="mb-3 h-5 w-5 text-blue-600" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Timeline
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    Feb 2025 — Present
                  </p>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                  <MapPin className="mb-3 h-5 w-5 text-blue-600" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Location
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">Onsite</p>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                  <Layers3 className="mb-3 h-5 w-5 text-blue-600" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Focus
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    Product systems
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-100 to-indigo-100 opacity-70 blur-xl" />
              <div className="relative rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 shadow-xl">
                <div className="flex h-44 items-center justify-center rounded-2xl border border-dashed border-blue-200 bg-white/80">
                  <img
                    src="https://shoffr.in/icon/shoffr-hero-logo.svg"
                    alt="Shoffr logo"
                    className="max-h-24 max-w-[190px] object-contain"
                  />
                </div>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-500">Partner platform</span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-12 border-t border-gray-100 pt-10">
            <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
              Current contributions
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {currentResponsibilities.map((responsibility) => (
                <div
                  key={responsibility}
                  className="flex items-start gap-3 rounded-2xl bg-gradient-to-r from-blue-50/80 to-white p-4 text-gray-600"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <Check className="h-4 w-4 text-white" />
                  </span>
                  <p className="leading-6">{responsibility}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {[
                "Next.js",
                "Tailwind CSS",
                "Java Spring Boot",
                "MySQL",
              ].map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="work-highlights" className="px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-2xl"
          >
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-500">
              Work notes
            </p>
            <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              Problems worth solving.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              A collection of the product areas documented in my Shoffr work
              notes. Each one represents a chance to make a complex workflow
              feel simpler.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workHighlights.map((item, index) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group rounded-2xl border border-gray-100 bg-white/85 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_35px_rgba(59,130,246,0.12)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-blue-500">
                    {item.number}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-gray-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-500" />
                </div>
                <h3 className="mt-8 min-h-[4rem] text-xl font-bold leading-snug text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
                <div className="mt-6 h-1 w-10 rounded-full bg-blue-200 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-500" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-10 text-white shadow-xl shadow-blue-500/20 md:px-12 md:py-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                Want the full context?
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Read the project notes on Notion.
              </h2>
            </div>
            <a
              href="https://app.notion.com/p/Shoffr-Work-3078cf31ef1b80dfadfdf0daebb9fdd2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              View notes
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Work;
