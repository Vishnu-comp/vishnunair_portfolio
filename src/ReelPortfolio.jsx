import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Github,
  Menu,
  X,
  Trophy,
  Code2,
  GraduationCap,
} from "lucide-react";
import { site } from "./data/site";
import resume from "./assets/VishnuResume.pdf";
const craveImage = "https://github.com/user-attachments/assets/b03a310e-4238-4c11-a038-254607cc616c";
const intervoImage = "https://github.com/user-attachments/assets/d64c04ba-8429-439b-ae19-fe38a6e69622";
const certificate = "https://github.com/user-attachments/assets/7086f200-ad9b-497b-b743-ee89530c4073";
import "./ReelPortfolio.css";

const sections = [
  "about",
  "skills",
  "work",
  "experience",
  "achievements",
  "contact",
];
const skills = [
  [
    "Jv",
    "Java",
    "Languages",
    "Java and object-oriented programming for backend applications.",
  ],
  [
    "Js",
    "JavaScript",
    "Languages",
    "Interactive interfaces and full-stack web applications.",
  ],
  [
    "Ts",
    "TypeScript",
    "Languages",
    "Typed frontend development with Next.js and React.",
  ],
  [
    "Py",
    "Python",
    "Languages",
    "Python and Flask in the Intervo interview platform.",
  ],
  [
    "Re",
    "React",
    "Frontend",
    "Component-based interfaces across my web projects.",
  ],
  [
    "Nx",
    "Next.js",
    "Frontend",
    "Partner-portal interfaces and ride workflows at Shoffr.",
  ],
  ["Rx", "Redux", "Frontend", "State management for frontend applications."],
  [
    "Tw",
    "Tailwind CSS",
    "Frontend",
    "Responsive layouts and reusable interface styling.",
  ],
  [
    "Sb",
    "Spring Boot",
    "Backend",
    "Java services behind Shoffr workflows and CraveMate.",
  ],
  ["No", "Node.js", "Backend", "Server-side JavaScript for MERN applications."],
  [
    "Ex",
    "Express",
    "Backend",
    "REST APIs and backend routing for web applications.",
  ],
  ["Fl", "Flask", "Backend", "Python services in the Intervo project."],
  [
    "My",
    "MySQL",
    "Databases",
    "Relational data for backend services at Shoffr.",
  ],
  [
    "Mg",
    "MongoDB",
    "Databases",
    "Document databases for Unishare and other MERN projects.",
  ],
  [
    "So",
    "Socket.io",
    "Backend",
    "Real-time polls, messages and live responses.",
  ],
  ["Gi", "Git", "Tools", "Version control and collaboration across projects."],
  ["Dk", "Docker", "Tools", "Containers in my development toolkit."],
  ["Pm", "Postman", "Tools", "Testing and exploring REST APIs."],
  ["Vs", "VS Code", "Tools", "My editor for building and working with code."],
  [
    "Gm",
    "Gemini API",
    "Tools",
    "AI-assisted resource search and query resolution in Unishare.",
  ],
];
const projects = [
  {
    name: "CraveMate",
    type: "FOOD ORDERING / FULL STACK",
    desc: "From craving to checkout.",
    body: "A responsive food-ordering app with search, filters and real-time inventory updates.",
    stack: ["React", "Spring Boot", "MongoDB", "Tailwind CSS"],
    image: craveImage,
    github: "https://github.com/Vishnu-comp/CraveMate_frontend",
    live: "https://vishnunairakasaairfd.vercel.app/",
  },
  {
    name: "Unishare",
    type: "COMMUNITY / MERN + AI",
    desc: "Share more. Find more.",
    body: "A college resource-sharing platform for borrowing and lending, with encrypted user data and Gemini-powered assistance.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Gemini"],
    github: "https://github.com/Vishnu-comp/UNISHARE",
    live: "https://unishare-ten.vercel.app/",
  },
  {
    name: "Intervo",
    type: "INTERVIEW AUTOMATION",
    desc: "A better hiring workflow.",
    body: "Interview management with progress tracking, interviewer analytics, randomized questions and proctoring.",
    stack: ["React", "Node.js", "MongoDB", "Python", "Flask"],
    image: intervoImage,
    github: "https://github.com/Vishnu-comp/intervo-backend",
    live: "https://intervoproject.com",
  },
  {
    name: "Intervue",
    type: "REAL-TIME CLASSROOM",
    desc: "Make every voice count.",
    body: "Live classroom polls, instant results and real-time discussion between teachers and students.",
    stack: ["React", "Socket.io", "Node.js", "Express"],
    github: "https://github.com/Vishnu-comp/Intervue",
    live: "https://intervue-six.vercel.app/",
  },
];
const timeline = [
  {
    year: "2025",
    tag: "BUILDING IN PRODUCTION",
    title: "Full Stack Developer",
    place: "Shoffr · February 2025 - Present",
    text: "Trip prioritization, co-passenger booking, CSV reconciliation and multi-feed dashcam interfaces. Next.js on the frontend. Java and Spring Boot behind it.",
    link: true,
  },
  {
    year: "2025",
    tag: "EDUCATION",
    title: "Master of Computer Applications",
    place: "Christ University · 2023 - 2025",
    text: "Computer applications, software development and a deeper foundation for building end-to-end products.",
  },
  {
    year: "2024",
    tag: "FIRST PROFESSIONAL STEPS",
    title: "Junior Software Development Intern",
    place: "ICIER · May - July 2024",
    text: "Built MERN applications, React interfaces, MongoDB schemas and server-side APIs with Express and Node.js.",
  },
  {
    year: "2023",
    tag: "EDUCATION",
    title: "Bachelor of Computer Applications",
    place: "Kristu Jayanti College · 2020 - 2023",
    text: "The start of my journey in programming and software development.",
  },
];
function External({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
function SectionTitle({ number, label, children }) {
  return (
    <div className="rp-section-title">
      <p className="rp-eyebrow">
        {number} <span /> {label}
      </p>
      <h2>{children}</h2>
    </div>
  );
}
function IdentityCard() {
  const [tilt, setTilt] = useState(0);
  const [dragging, setDragging] = useState(false);
  return (
    <div className="rp-id-stage">
      <div className="rp-lanyard" aria-hidden="true">
        <span>VISHNU / DEVELOPER</span>
      </div>
      <button
        type="button"
        className={`rp-id ${dragging ? "dragging" : ""}`}
        aria-label="Interactive developer ID card. Drag to tilt, or use left and right arrow keys."
        style={{ "--tilt": `${tilt}deg` }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (dragging) {
            const r = e.currentTarget.parentElement.getBoundingClientRect();
            setTilt(
              Math.max(
                -22,
                Math.min(22, (e.clientX - r.left - r.width / 2) / 7),
              ),
            );
          }
        }}
        onPointerUp={() => {
          setDragging(false);
          setTilt(0);
        }}
        onPointerCancel={() => {
          setDragging(false);
          setTilt(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            setTilt(e.key === "ArrowLeft" ? -15 : 15);
          }
          if (e.key === "Escape") setTilt(0);
        }}
        onBlur={() => setTilt(0)}
      >
        <div className="rp-id-top">
          <Code2 size={19} />
          <span>
            DEVELOPER ID<small>CREATIVE / TECHNICAL</small>
          </span>
          <span className="rp-id-dot" />
        </div>
        <div
          className="rp-id-photo"
          aria-label="VN monogram portrait placeholder"
        >
          <span>VN</span>
          <i>01</i>
        </div>
        <h3>VISHNU NAIR</h3>
        <p>FULL STACK DEVELOPER</p>
        <div className="rp-barcode" aria-hidden="true" />
        <small>BENGALURU, INDIA</small>
      </button>
      <span className="rp-drag-hint">↔ drag my card</span>
    </div>
  );
}
export default function ReelPortfolio() {
  const [active, setActive] = useState("about");
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState("All");
  const [skillIndex, setSkillIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const achievementsRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const skill = skills[skillIndex];
  const selected = projects[projectIndex];
  const filter = (name) => {
    setCategory(name);
    if (name !== "All") setSkillIndex(skills.findIndex((s) => s[2] === name));
  };
  return (
    <div className="reel-portfolio" id="hero">
      <a className="rp-skip" href="#about">
        Skip to content
      </a>
      <header className="rp-nav">
        <a href="#home" className="rp-brand" aria-label="Vishnu Nair home">
          <b>
            VN<span>®</span>
          </b>
          <span>
            Vishnu Nair
            <br />
            <small>Developer / Bengaluru</small>
          </span>
        </a>
        <button
          type="button"
          className="rp-menu"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav aria-label="Main navigation" className={menu ? "is-open" : ""}>
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setMenu(false)}
              className={active === s ? "active" : ""}
            >
              {s === "work"
                ? "Projects"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </nav>
      </header>
      <main>
        <section id="home" className="rp-hero">
          <div className="rp-hero-name" aria-hidden="true">
            VISHNU
          </div>
          <div className="rp-hero-kicker">
            <span className="rp-status-dot" /> Open to opportunities
          </div>
          <div
            className="rp-portrait"
            aria-label="VN monogram. Replace with Vishnu's own full-body photo or video."
          >
            <div className="rp-orbit orbit-one" />
            <div className="rp-orbit orbit-two" />
            <div className="rp-portrait-type">
              VN
              <span>
                THE PERSON
                <br />
                BEHIND THE CODE.
              </span>
            </div>
            <span className="rp-portrait-caption">
              VISHNU NAIR / FULL STACK DEVELOPER
            </span>
          </div>
          <div className="rp-hero-bottom">
            <div>
              <p className="rp-eyebrow">CODE WITH PURPOSE.</p>
              <h1>
                Full Stack
                <br />
                Developer<span>.</span>
              </h1>
              <p className="rp-hero-sub">
                Thoughtful interfaces. Dependable backends.
              </p>
            </div>
            <div className="rp-hero-actions">
              <a href="#work" className="rp-button">
                Explore my work <ArrowUpRight size={16} />
              </a>
              <div>
                <External href={site.links.github}>GitHub ↗</External>
                <a href={`mailto:${site.email}`}>Say hello ↗</a>
              </div>
            </div>
          </div>
          <a className="rp-scroll" href="#about" aria-label="Scroll to About">
            <ArrowDown size={16} />
          </a>
          <p className="rp-hero-corner">REACT / NEXT.JS / JAVA / SPRING BOOT</p>
        </section>
        <section id="about" className="rp-section rp-about">
          <div>
            <SectionTitle number="01" label="ABOUT ME">
              Hi, I'm <em>Vishnu.</em>
            </SectionTitle>
            <p className="rp-about-copy">
              A full stack developer who cares about what happens on{" "}
              <i>both sides</i> of the screen.
            </p>
            <p>
              I build web applications with React, Next.js, Java and Spring
              Boot. At Shoffr, I work on the tools and workflows that keep rides
              moving, from booking interfaces to backend services.
            </p>
            <p>
              My projects explore community sharing, interview automation and
              real-time learning. I like turning a complicated workflow into
              something simple to use.
            </p>
            <a
              className="rp-button"
              href={resume}
              download="Vishnu_Nair_Resume.pdf"
            >
              My resume <ArrowUpRight size={16} />
            </a>
          </div>
          <IdentityCard />
          <dl className="rp-facts">
            <div>
              <dt>BASED IN</dt>
              <dd>Bengaluru, India</dd>
            </div>
            <div>
              <dt>CURRENTLY AT</dt>
              <dd>Shoffr</dd>
            </div>
            <div>
              <dt>EDUCATION</dt>
              <dd>MCA, Christ University</dd>
            </div>
            <div>
              <dt>MY FOCUS</dt>
              <dd>Full stack development</dd>
            </div>
            <div className="rp-facts-note">
              A little curiosity.
              <br />
              <em>A lot of building.</em>
            </div>
          </dl>
        </section>
        <section id="skills" className="rp-section rp-skills">
          <span id="services" />
          <SectionTitle number="02" label="MY TOOLKIT">
            The periodic table <em>of my stack.</em>
          </SectionTitle>
          <div className="rp-skill-layout">
            <div>
              <div className="rp-filters" aria-label="Filter skills">
                {[
                  "All",
                  "Languages",
                  "Frontend",
                  "Backend",
                  "Databases",
                  "Tools",
                ].map((c) => (
                  <button
                    type="button"
                    key={c}
                    aria-pressed={category === c}
                    onClick={() => filter(c)}
                    className={category === c ? "active" : ""}
                  >
                    <span className={`rp-swatch ${c.toLowerCase()}`} />
                    {c}
                  </button>
                ))}
              </div>
              <div className="rp-elements">
                {skills.map((s, i) => (
                  <button
                    key={s[1]}
                    type="button"
                    className={`rp-element cat-${s[2].toLowerCase()} ${skillIndex === i ? "selected" : ""} ${category !== "All" && category !== s[2] ? "muted" : ""}`}
                    aria-pressed={skillIndex === i}
                    aria-label={`${s[1]}, ${s[2]}`}
                    onClick={() => {
                      setSkillIndex(i);
                      setCategory("All");
                    }}
                  >
                    <small>{String(i + 1).padStart(2, "0")}</small>
                    <strong>{s[0]}</strong>
                    <span>{s[1]}</span>
                  </button>
                ))}
              </div>
              <p className="rp-tiny">
                Select an element to see where it fits in my work.
              </p>
            </div>
            <aside className="rp-skill-detail" aria-live="polite">
              <div className={`rp-big-element cat-${skill[2].toLowerCase()}`}>
                <small>{String(skillIndex + 1).padStart(2, "0")}</small>
                <b>{skill[0]}</b>
                <span>{skill[1]}</span>
              </div>
              <p className="rp-eyebrow">{skill[2]}</p>
              <h3>{skill[1]}</h3>
              <p>{skill[3]}</p>
            </aside>
          </div>
        </section>
        <section id="work" className="rp-section rp-projects">
          <span id="portfolio" />
          <span id="github" />
          <SectionTitle number="03" label="SELECTED WORK">
            Things I've <em>built.</em>
          </SectionTitle>
          <div className="rp-project-accordion">
            <article className="rp-project-open" key={selected.name}>
              <div className="rp-project-copy">
                <p className="rp-eyebrow">
                  0{projectIndex + 1} / {selected.type}
                </p>
                <h3>{selected.name}</h3>
                <h4>{selected.desc}</h4>
                <p>{selected.body}</p>
                <div className="rp-tags">
                  {selected.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="rp-project-links">
                  <External className="rp-button" href={selected.github}>
                    <Github size={16} /> View on GitHub{" "}
                    <ArrowUpRight size={14} />
                  </External>
                  <External href={selected.live}>Live site ↗</External>
                </div>
              </div>
              <div
                className={`rp-project-image ${!selected.image ? "is-graphic" : ""}`}
              >
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={`${selected.name} project preview`}
                    loading="lazy"
                  />
                ) : (
                  <div className="rp-project-graphic">
                    <span>{selected.name === "Unishare" ? "↗↙" : "▥"}</span>
                    <strong>{selected.name}</strong>
                    <p>
                      {selected.name === "Unishare"
                        ? "Borrow. Lend. Connect."
                        : "Ask. Answer. Learn."}
                    </p>
                    <small>PROJECT COVER / {selected.stack[0]}</small>
                  </div>
                )}
              </div>
            </article>
            <div className="rp-project-tabs" aria-label="Choose a project">
              {projects.map((p, i) => (
                <button
                  type="button"
                  key={p.name}
                  aria-pressed={projectIndex === i}
                  className={projectIndex === i ? "active" : ""}
                  onClick={() => setProjectIndex(i)}
                >
                  <span>0{i + 1}</span>
                  <strong>{p.name}</strong>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
          </div>
          <div className="rp-section-tail">
            <span>Small details. Real problems. Working products.</span>
            <External href={site.links.github}>
              More on GitHub <ArrowUpRight size={14} />
            </External>
          </div>
        </section>
        <section className="rp-section rp-learning">
          <div>
            <p className="rp-eyebrow">STAYING CURIOUS</p>
            <h2>
              Always <em>learning.</em>
            </h2>
          </div>
          <ul>
            <li>
              <GraduationCap size={22} />
              <div>
                <h3>Java Foundation Course</h3>
                <p>Oracle Academy · 2025</p>
              </div>
            </li>
            <li>
              <Code2 size={22} />
              <div>
                <h3>AWS Academy Cloud Foundations</h3>
                <p>AWS Academy · 2025</p>
              </div>
            </li>
          </ul>
        </section>
        <section id="experience" className="rp-section rp-experience">
          <span id="education" />
          <span id="internship" />
          <SectionTitle number="04" label="THE JOURNEY">
            Education & <em>experience.</em>
          </SectionTitle>
          <div className="rp-timeline">
            {timeline.map((t, i) => (
              <article key={t.title}>
                <div className="rp-year">
                  {t.year}
                  <span>0{i + 1}</span>
                </div>
                <div className="rp-timeline-content">
                  <p className="rp-eyebrow">{t.tag}</p>
                  <h3>{t.title}</h3>
                  <p className="rp-place">{t.place}</p>
                  <p>{t.text}</p>
                  {t.link && (
                    <Link className="rp-text-link" to="/work">
                      Explore my work at Shoffr <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="achievements" className="rp-section rp-achievements">
          <div className="rp-achievement-heading">
            <SectionTitle number="05" label="MILESTONES">
              Proud <em>moments.</em>
            </SectionTitle>
            <div className="rp-arrow-controls">
              <button
                type="button"
                aria-label="Previous achievement"
                onClick={() =>
                  achievementsRef.current.scrollBy({
                    left: -380,
                    behavior: "smooth",
                  })
                }
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next achievement"
                onClick={() =>
                  achievementsRef.current.scrollBy({
                    left: 380,
                    behavior: "smooth",
                  })
                }
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div
            className="rp-achievement-track"
            ref={achievementsRef}
            tabIndex="0"
            aria-label="Achievements, scroll horizontally"
          >
            <article>
              <Trophy />
              <p>GYANITH 2024</p>
              <h3>Hackathon</h3>
              <span>NIT Puducherry</span>
              <strong>
                3<em>rd</em>
              </strong>
              <External href={certificate}>View certificate ↗</External>
            </article>
            <article>
              <Code2 />
              <p>GYANITH 2024</p>
              <h3>Code Hunt</h3>
              <span>NIT Puducherry</span>
              <strong>
                3<em>rd</em>
              </strong>
            </article>
            <article>
              <Trophy />
              <p>SHELLS 2024</p>
              <h3>Treasure Hunt</h3>
              <span>Kristu Jayanti College</span>
              <strong>
                1<em>st</em>
              </strong>
            </article>
          </div>
        </section>
        <section id="contact" className="rp-section rp-contact">
          <span id="whyhireme" />
          <span id="ask-ai" />
          <p className="rp-eyebrow">
            06 <span /> HAVE SOMETHING IN MIND?
          </p>
          <h2>
            Let's build
            <br />
            <em>something good.</em>
            <a href={`mailto:${site.email}`} aria-label="Email Vishnu">
              <ArrowUpRight />
            </a>
          </h2>
          <div className="rp-contact-bottom">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div>
              <External href={site.links.github}>GitHub ↗</External>
              <External href={site.links.linkedin}>LinkedIn ↗</External>
              <a href={resume} download>
                Resume ↗
              </a>
              <Link to="/ask-ai">Ask AI ↗</Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="rp-footer">
        <a href="#home" className="rp-footer-brand">
          VN.
        </a>
        <span>Vishnu Nair / Made with care and code.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
  }
