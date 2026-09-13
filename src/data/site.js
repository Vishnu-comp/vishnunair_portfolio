/**
 * Single source of truth for every personal detail used across the site.
 * Edit values here — no need to hunt through components.
 */

export const site = {
  name: "Vishnu Nair",
  role: "Software Development Engineer / Full Stack Developer",
  email: "vishnunair2323@gmail.com",

  /**
   * WhatsApp quick-contact number in international format, digits only
   * (no "+", no spaces). Example for India: "919876543210".
   * Leave as "" to hide the WhatsApp floating button entirely.
   */
  whatsapp: "",

  /** Prefilled WhatsApp message used by the floating button. */
  whatsappMessage: "Hi Vishnu, I came across your portfolio and would love to connect.",

  /** GitHub username that powers the GitHub Activity widget. */
  githubUsername: "Vishnu-comp",

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
