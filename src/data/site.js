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
   * The scrollytelling timeline (#journey). One entry per milestone, in
   * chronological order; `current` marks the in-progress role (pulsing dot).
   */
  journey: [
    {
      period: "Sep 2020 – Jul 2023",
      title: "Bachelor of Computer Applications",
      org: "Kristu Jayanti College",
      location: "Bengaluru",
      kind: "education",
      score: "83%",
      summary: "Where the debugging addiction started.",
      points: [
        "Core foundations: data structures, DBMS, operating systems, networks.",
        "First shipped web projects — and first production bugs.",
      ],
      tech: ["C", "C++", "Java", "Python"],
    },
    {
      period: "Jul 2023 – May 2025",
      title: "Master of Computer Applications",
      org: "Christ (Deemed to be University)",
      location: "Bengaluru",
      kind: "education",
      score: "73%",
      summary: "Went from assignments to real, deployed products.",
      points: [
        "Built Unishare, CraveMate and Intervo as full-stack MERN/Spring projects.",
        "Focus areas: web architecture, databases, software engineering.",
      ],
      tech: ["MERN", "Spring Boot", "MySQL"],
    },
    {
      period: "May 2024 – Jul 2024",
      title: "Junior Software Development Intern",
      org: "ICIER",
      location: "Remote",
      kind: "work",
      summary: "First professional codebase; learned to ship on someone else's repo.",
      points: [
        "Developed production web applications on the MERN stack.",
        "Designed MongoDB schemas and Express APIs consumed by real users.",
      ],
      tech: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
      period: "Feb 2025 – Present",
      title: "Software Engineer",
      org: "Shoffr — The Gold Standard of Rides",
      location: "Onsite · Bengaluru",
      kind: "work",
      current: true,
      summary: "Owning product surfaces end-to-end in a live ride-tech platform.",
      points: [
        "Trip-importance prioritization + co-passenger modules for the partner portal.",
        "CSV data reconciliation and a multi-feed dashcam view (front/rear/cabin).",
      ],
      tech: ["Next.js", "Tailwind", "Java Spring Boot", "MySQL"],
    },
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
  { href: "#journey", label: "Journey" },
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
