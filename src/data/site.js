/**
 * Single source of truth for every personal detail used across the site.
 * Edit values here — no need to hunt through components.
 */

export const site = {
  name: "Vishnu Nair",
  role: "Software Development Engineer / Full Stack Developer",
  email: "vishnunair2323@gmail.com",

  /** Rotated by the hero typewriter, in order. */
  roles: [
    "Full-Stack Developer",
    "Software Development Engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js + Spring Boot Engineer",
  ],

  /** Green-dot pill above the hero heading. */
  availability: "Open to opportunities · Bengaluru / Remote",

  /** Floating credential cards layered over the hero headshot. */
  currentRole: { title: "Software Engineer", org: "Shoffr · Feb 2025 – Present" },
  educationChip: "MCA · Christ University",

  /** Hero stat strip. Values are strings so "2+" style entries work. */
  stats: [
    { value: "2+", label: "Years Experience" },
    { value: "4", label: "Shipped Projects" },
    { value: "44", label: "Public Repos" },
  ],

  /**
   * WhatsApp quick-contact number in international format, digits only
   * (no "+", no spaces). Sourced from the public resume (+91-9967418222).
   * Change it here and the hero icon, footer icon and floating button all
   * update. Set to "" to hide the WhatsApp entry points again.
   */
  whatsapp: "919967418222",

  /** Prefilled WhatsApp message used by the floating button. */
  whatsappMessage: "Hi Vishnu, I came across your portfolio and would love to connect.",

  /** Phone as stored in the vCard / tel: links. */
  phone: "+919967418222",
  /** Phone as displayed on the contact card. */
  phoneDisplay: "+91 99674 18222",

  /** GitHub username that powers the GitHub Activity widget. */
  githubUsername: "Vishnu-comp",

  /**
   * Contact form delivery.
   *
   * Leave "" to use Formsubmit.co's free AJAX endpoint for `email` above
   * (no signup; the owner clicks a one-time activation link on first use).
   *
   * If you later prefer Formspree/Web3Forms, paste the endpoint URL here
   * (e.g. "https://formspree.io/f/xyzabcq") and the same JSON payload will be
   * POSTed to it instead.
   */
  contactEndpoint: "",

  /**
   * Stack you use professionally that GitHub's per-repo "primary language"
   * field cannot see — private company repos (Shoffr), and frameworks that
   * GitHub buckets under the host language (Next.js -> JavaScript, JSX,
   * Tailwind -> CSS).
   *
   * The Activity widget shows these as "Also working with" underneath the
   * detected language bar, so the section doesn't under-sell you when most
   * public repos are older college lab work.
   */
  stackLanguages: [
    "Next.js",
    "React",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "Tailwind CSS",
    "Docker",
  ],

  links: {
    github: "https://github.com/Vishnu-comp",
    linkedin: "https://www.linkedin.com/in/vishnu-nair-aa462b245/",
    live: "https://vishnunairportfolio.vercel.app/",
    work: "https://www.notion.so/Shoffr-Work-3078cf31ef1b80dfadfdf0daebb9fdd2",
  },

  logo: "/logos.png",
};

/**
 * Navbar / footer / mobile-tab navigation, defined once and reused in three
 * places (previously copy-pasted separately for desktop and mobile menus).
 *
 * `isRoute` -> react-router <Link>. Otherwise it's an on-page anchor scroll.
 */
export const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#education", label: "Education" },
  { href: "#internship", label: "Internship" },
  { href: "/work", label: "Work", isRoute: true },
  { href: "#portfolio", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#achievements", label: "Achievements" },
  { href: "#whyhireme", label: "Contact Me" },
];

/** Condensed set used by the mobile sticky bottom tab bar (max 5 fits nicely). */
export const mobileNavItems = [
  { href: "#hero", label: "Home" },
  { href: "#portfolio", label: "Projects" },
  { href: "/work", label: "Work", isRoute: true },
  { href: "#github", label: "GitHub" },
  { href: "#whyhireme", label: "Contact" },
];

export default site;

/**
 * Role-tailored resume switcher (/resume?role=...).
 * One entry per target role. Each panel is a curated spotlight — the full
 * PDF embedded below it on /resume stays the canonical document.
 */
export const resumeRoles = [
  {
    id: "fullstack",
    label: "Full-Stack",
    tagline: "End-to-end product engineer",
    summary:
      "React & Next.js interfaces on Java Spring Boot and Node.js services, with MySQL & MongoDB underneath — shipped to production on Vercel and Docker.",
    skills: [
      "React", "Next.js", "TypeScript", "JavaScript", "Java", "Spring Boot",
      "Node.js", "Express", "MySQL", "MongoDB", "RabbitMQ", "Tailwind CSS", "Docker", "Git",
    ],
    bullets: [
      { org: "Shoffr", text: "Owns partner-portal surfaces end-to-end: trip-prioritization and co-passenger booking modules across Next.js UI and Spring Boot services." },
      { org: "Shoffr", text: "CSV parsing & reconciliation logic that improved financial data accuracy across feeds." },
      { org: "Shoffr", text: "Dashcam module with tabbed navigation switching front / rear / cabin video feeds." },
      { org: "ICIER", text: "Shipped production MERN web apps — MongoDB schemas, Express APIs and React frontends consumed by real users." },
    ],
    projects: [
      { name: "Unishare", note: "MERN community sharing platform", url: "https://unishare-ten.vercel.app/" },
      { name: "CraveMate", note: "Food ordering w/ real-time stock (React + Spring Boot)", url: "https://vishnunairakasaairfd.vercel.app/" },
      { name: "Intervo", note: "Automated interview management (MERN + Flask)", url: "https://intervoproject.com" },
      { name: "Intervue", note: "Real-time classroom polls over Socket.io", url: "https://intervue-six.vercel.app/" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    tagline: "Interfaces that ship",
    summary:
      "React, Next.js, TypeScript and Tailwind — responsive, real-time UIs: sockets, live polls, multi-feed video. This portfolio is itself a React + Tailwind build.",
    skills: [
      "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux",
      "Framer Motion", "Socket.io (client)", "Responsive UI", "Git",
    ],
    bullets: [
      { org: "Shoffr", text: "Dashcam view UI: tab-based switching between front, rear and cabin video feeds." },
      { org: "Shoffr", text: "Partner-portal UX for marking trip importance and managing co-passengers inside one booking." },
      { org: "Intervue", text: "Live polling UI — teachers watch responses stream in while students answer and chat in real time." },
      { org: "ICIER", text: "Built React frontends for production MERN apps with encryption-aware forms and validation." },
    ],
    projects: [
      { name: "Intervue", note: "Real-time classroom polling UI", url: "https://intervue-six.vercel.app/" },
      { name: "Unishare", note: "Community sharing platform UI", url: "https://unishare-ten.vercel.app/" },
      { name: "CraveMate", note: "Responsive ordering app w/ search & filter UX", url: "https://vishnunairakasaairfd.vercel.app/" },
      { name: "This portfolio", note: "React, Tailwind, dark mode, ⌘K palette", url: "https://vishnunairportfolio.vercel.app/" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    tagline: "APIs, data & the plumbing between them",
    summary:
      "Java Spring Boot and Node/Express services, MySQL & MongoDB schemas, RabbitMQ messaging, data reconciliation pipelines and Socket.io servers for live features.",
    skills: [
      "Java", "Spring Boot", "Node.js", "Express", "MySQL", "MongoDB",
      "RabbitMQ", "REST APIs", "Socket.io", "Postman", "Docker", "Git",
    ],
    bullets: [
      { org: "Shoffr", text: "Services behind trip-prioritization and co-passenger modules consumed by the partner portal." },
      { org: "Shoffr", text: "CSV parsing & reconciliation logic improving financial data accuracy." },
      { org: "ICIER", text: "Designed MongoDB schemas and Express APIs for production MERN applications." },
      { org: "Intervo", text: "Interview-automation backend: progress tracking, interviewer analytics, random question generation and proctoring." },
    ],
    projects: [
      { name: "Intervo", note: "Hiring-automation backend (Express + Flask)", url: "https://intervoproject.com" },
      { name: "CraveMate", note: "Spring Boot services + real-time inventory", url: "https://vishnunairakasaairfd.vercel.app/" },
      { name: "Unishare", note: "Express APIs + MongoDB, encrypted user data", url: "https://unishare-ten.vercel.app/" },
      { name: "Intervue", note: "Socket.io server streaming live poll data", url: "https://intervue-six.vercel.app/" },
    ],
  },
];
