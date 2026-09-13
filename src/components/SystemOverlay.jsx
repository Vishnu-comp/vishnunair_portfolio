import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  Terminal as TerminalIcon,
  Mail,
  Github,
  Linkedin,
  Download,
  Moon,
  User,
  FolderKanban,
  Route as RouteIcon,
  IdCard,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "../data/site";
import { scrollToSection } from "../hooks/useNavigation";
import { applyTheme, getInitialTheme, THEMES } from "../utils/theme";
import { cx } from "../utils/theme";

/**
 * Developer easter eggs, one overlay component:
 *
 *  • Ctrl/Cmd+K  -> fuzzy COMMAND PALETTE (fast navigation + actions)
 *  • ` (backquote) or the palette's "Open developer terminal"
 *                -> a fake shell with real commands: help, whoami, neofetch,
 *                   skills, projects, journey, contact, theme, go, download,
 *                   sudo hire --now … Tab completes, ↑/↓ replays history.
 *
 * Both are keyboard-first, close on Escape, lock body scroll while open and
 * are mounted inside the Router so commands can navigate.
 */

const ASCII_V = [
  "██╗   ██╗",
  "██║   ██║",
  "██║   ██║",
  "╚██╗ ██╔╝",
  " ╚████╝ ",
  "  ╚═══╝  ",
];

const line = (t, c) => ({ t, c });

export default function SystemOverlay() {
  const [mode, setMode] = useState(null); // null | "palette" | "terminal"
  const navigate = useNavigate();

  /* ------------------------------------------------------------ *
   * Command engine (shared by the terminal; palette wraps these)
   * ------------------------------------------------------------ */
  const runCommand = useCallback(
    (raw) => {
      const [cmd, ...args] = raw.trim().split(/\s+/);
      const arg = (args[0] || "").toLowerCase();
      const out = [];

      switch ((cmd || "").toLowerCase()) {
        case "":
          return out;
        case "help":
          out.push(
            line("Available commands:", "text-blue-300"),
            line("  whoami                 who is behind this site"),
            line("  neofetch               system card, terminal style"),
            line("  skills [group]         frontend | backend | db | languages | tools | ai"),
            line("  projects               shipped work + live links"),
            line("  journey                BCA → MCA → ICIER → Shoffr, one line each"),
            line("  contact                email / phone / whatsapp"),
            line("  socials                github / linkedin"),
            line("  go <target>            hero | internship | projects | github | contact | work | resume | card"),
            line("  theme <dark|light>     switch theme"),
            line("  download <resume|vcard>  fetch the file"),
            line("  date                   server-local time in Bengaluru"),
            line("  clear / exit           wipe screen / close terminal"),
            line("Tip: Tab completes, ↑/↓ replays history, Ctrl+L clears.", "text-slate-500")
          );
          return out;
        case "whoami":
          out.push(
            line("Vishnu Nair — Software Development Engineer / Full Stack Developer.", "text-emerald-300"),
            line("Bengaluru, IN · building ride-tech product systems at Shoffr."),
            line("Stack: React, Next.js, TypeScript, Java Spring Boot, Node.js, MongoDB, MySQL."),
            line("Looking for: challenging SDE roles. Run `contact` to reach out.", "text-slate-400")
          );
          return out;
        case "neofetch": {
          const theme = getInitialTheme();
          const rows = [
            ["user", "vishnu@portfolio"],
            ["role", "SDE / Full Stack @ Shoffr"],
            ["shell", "psh 2.0 (React 18)"],
            ["uptime", "5+ yrs (since BCA 2020)"],
            ["stack", "Next.js · Spring · Node"],
            ["ai", "Claude Code · Cursor · Codex"],
            ["locale", "Bengaluru, IN (IST)"],
            ["theme", theme],
          ];
          ASCII_V.forEach((art, i) => {
            const kv = rows[i];
            out.push(
              line(
                `  ${art}   ${kv ? `${kv[0].padEnd(7, " ")}: ${kv[1]}` : ""}`,
                i === 0 ? "text-blue-400" : "text-blue-400"
              )
            );
          });
          return out;
        }
        case "skills": {
          const groups = {
            frontend: ["React", "Next.js", "Redux", "TypeScript", "JavaScript"],
            backend: ["Express", "Spring Boot", "RabbitMQ"],
            db: ["MongoDB", "MySQL"],
            languages: ["Java", "Python", "C", "C++", "R"],
            tools: ["Git", "Docker", "Postman", "VS Code"],
            ai: ["Claude Code", "Codex", "ChatGPT", "Cursor", "Antigravity"],
          };
          if (arg && groups[arg]) {
            out.push(line(`${arg}: `, "text-blue-300"), line("  " + groups[arg].join(" · ")));
          } else {
            Object.entries(groups).forEach(([k, v]) =>
              out.push(line(`  ${k.padEnd(10, " ")}${v.join(" · ")}`))
            );
            out.push(line("Filter with: skills frontend|backend|db|languages|tools|ai", "text-slate-500"));
          }
          return out;
        }
        case "projects":
          out.push(
            line("  Unishare      MERN community sharing platform   unishare-ten.vercel.app", "text-emerald-300"),
            line("  CraveMate     food ordering, real-time stock    (live demo on Vercel)"),
            line("  Intervo       automated interview management    intervoproject.com"),
            line("  Intervue      real-time classroom polls (sockets)  intervue-six.vercel.app"),
            line("Scroll to them: go projects", "text-slate-500")
          );
          return out;
        case "journey":
          out.push(
            line("  Sep 2020 – Jul 2023   BCA @ Kristu Jayanti College (83%)", "text-emerald-300"),
            line("  Jul 2023 – May 2025   MCA @ Christ University (73%)"),
            line("  May 2024 – Jul 2024   Jr. Software Development Intern @ ICIER"),
            line("  Feb 2025 – Present    Software Engineer @ Shoffr   ← now", "text-emerald-300")
          );
          out.push(line("On the page: go internship", "text-slate-500"));
          return out;
        case "contact":
          out.push(
            line(`  email     ${site.email}`, "text-emerald-300"),
            line(`  phone     ${site.phoneDisplay} (WhatsApp)`),
            line(`  site      ${site.links.live}`),
            line("Recruiters: the contact form delivers straight to my inbox.", "text-slate-400")
          );
          return out;
        case "socials":
          out.push(line(`  github    ${site.links.github}`), line(`  linkedin  ${site.links.linkedin}`));
          return out;
        case "go":
        case "open": {
          const map = {
            hero: { hash: "#hero" },
            education: { hash: "#education" },
            internship: { hash: "#internship" },
            projects: { hash: "#portfolio" },
            github: { hash: "#github" },
            achievements: { hash: "#achievements" },
            contact: { hash: "#whyhireme" },
            work: { route: "/work" },
            resume: { route: "/resume" },
            card: { route: "/card" },
          };
          const target = map[arg];
          if (!target) {
            return [line(`go: unknown target "${arg}" — try: ${Object.keys(map).join(", ")}`, "text-rose-400")];
          }
          setMode(null);
          setTimeout(() => {
            if (target.route) navigate(target.route);
            else if (window.location.pathname !== "/") {
              navigate("/");
              setTimeout(() => scrollToSection(target.hash), 120);
            } else scrollToSection(target.hash);
          }, 60);
          return [line(`Jumping to ${arg}…`, "text-blue-300")];
        }
        case "theme": {
          const next = arg === "dark" || arg === "light" ? arg : getInitialTheme() === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
          applyTheme(next);
          return [line(`Theme switched to ${next}.`, "text-emerald-300")];
        }
        case "download": {
          if (arg === "vcard" || arg === "vcf") {
            const a = document.createElement("a");
            a.href = "/vishnu-nair.vcf";
            a.download = "Vishnu-Nair.vcf";
            a.click();
            return [line("vCard download started — one tap and I'm in your contacts.", "text-emerald-300")];
          }
          navigate("/resume");
          setMode(null);
          return [line("Opening the resume page — hit “Download PDF”.", "text-blue-300")];
        }
        case "date":
          return [
            line(
              new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                dateStyle: "full",
                timeStyle: "short",
              }) + " (IST)"
            ),
          ];
        case "clear":
          return "CLEAR";
        case "exit":
        case "quit":
          setMode(null);
          return [line("bye 👋", "text-slate-400")];
        case "sudo": {
          if (args.join(" ").includes("hire")) {
            setTimeout(() => {
              setMode(null);
              setTimeout(() => {
                if (window.location.pathname !== "/") navigate("/");
                setTimeout(() => scrollToSection("#whyhireme"), 150);
              }, 60);
            }, 900);
            return [
              line("[sudo] password for recruiter: ********", "text-slate-500"),
              line("Permission granted. Opening contact channel…", "text-emerald-300"),
            ];
          }
          return [line("sudo: nice try. This portfolio runs on plain user privileges.", "text-amber-300")];
        }
        case "hello":
        case "hi":
          return [line("Hey! You found the shell. `help` lists what it knows.", "text-emerald-300")];
        default:
          return [
            line(`psh: command not found: ${cmd}`, "text-rose-400"),
            line("Type `help` for the command list.", "text-slate-500"),
          ];
      }
    },
    [navigate]
  );

  /* ------------------------------------------------------------ *
   * Global keybindings
   * ------------------------------------------------------------ */
  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement;
      const typing =
        el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMode((m) => (m === "palette" ? null : "palette"));
        return;
      }
      if (e.key === "Escape") {
        setMode(null);
        return;
      }
      if (!typing && (e.key === "`" || e.code === "Backquote")) {
        e.preventDefault();
        setMode((m) => (m === "terminal" ? null : "terminal"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mode ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mode]);

  /* ------------------------------------------------------------ *
   * Palette actions
   * ------------------------------------------------------------ */
  const actions = useMemo(
    () => [
      { label: "Go to: Home", icon: User, keywords: "hero top start", run: () => { setMode(null); setTimeout(() => { if (window.location.pathname !== "/") navigate("/"); else scrollToSection("#hero"); }, 60); } },
      { label: "Go to: Internship & Experience", icon: RouteIcon, keywords: "career education internship experience shoffr ici", run: () => { setMode(null); setTimeout(() => { if (window.location.pathname !== "/") { navigate("/"); setTimeout(() => scrollToSection("#internship"), 120); } else scrollToSection("#internship"); }, 60); } },
      { label: "Go to: Projects", icon: FolderKanban, keywords: "portfolio work unishare cravemate intervo intervue", run: () => { setMode(null); setTimeout(() => { if (window.location.pathname !== "/") { navigate("/"); setTimeout(() => scrollToSection("#portfolio"), 120); } else scrollToSection("#portfolio"); }, 60); } },
      { label: "Go to: GitHub activity", icon: Github, keywords: "contributions streak repos", run: () => { setMode(null); setTimeout(() => { if (window.location.pathname !== "/") { navigate("/"); setTimeout(() => scrollToSection("#github"), 120); } else scrollToSection("#github"); }, 60); } },
      { label: "Go to: Contact", icon: Mail, keywords: "hire email form whatsapp connect", run: () => { setMode(null); setTimeout(() => { if (window.location.pathname !== "/") { navigate("/"); setTimeout(() => scrollToSection("#whyhireme"), 120); } else scrollToSection("#whyhireme"); }, 60); } },
      { label: "Open: Work at Shoffr", icon: RouteIcon, keywords: "shoffr experience job page", run: () => { setMode(null); navigate("/work"); } },
      { label: "Open: Resume", icon: Download, keywords: "cv pdf download", run: () => { setMode(null); navigate("/resume"); } },
      { label: "Open: Career-fair card", icon: IdCard, keywords: "qr vcard print contact card", run: () => { setMode(null); navigate("/card"); } },
      { label: "Open: Developer terminal", icon: TerminalIcon, keywords: "shell console easter egg commands", run: () => setMode("terminal") },
      { label: "Download: vCard", icon: Download, keywords: "contact save vcf phone", run: () => { setMode(null); const a = document.createElement("a"); a.href = "/vishnu-nair.vcf"; a.download = "Vishnu-Nair.vcf"; a.click(); } },
      { label: "Email Vishnu", icon: Mail, keywords: "mail contact", href: `mailto:${site.email}` },
      { label: "WhatsApp Vishnu", icon: FaWhatsapp, keywords: "chat message", href: site.whatsapp ? `https://wa.me/${site.whatsapp}` : undefined },
      { label: "GitHub profile", icon: Github, keywords: "repos code", href: site.links.github },
      { label: "LinkedIn profile", icon: Linkedin, keywords: "network cv", href: site.links.linkedin },
      { label: "Toggle theme", icon: Moon, keywords: "dark light mode switch", run: () => { applyTheme(getInitialTheme() === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK); } },
    ],
    [navigate]
  );

  return (
    <>
      <AnimatePresence>
        {mode === "palette" && <Palette actions={actions} onClose={() => setMode(null)} />}
        {mode === "terminal" && <TerminalShell runCommand={runCommand} onClose={() => setMode(null)} />}
      </AnimatePresence>
    </>
  );
}

/* ---------------------------------------------------------------- *
 * Command palette
 * ---------------------------------------------------------------- */
function Palette({ actions, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => (a.label + " " + (a.keywords || "")).toLowerCase().includes(q));
  }, [query, actions]);

  useEffect(() => {
    inputRef.current?.focus();
    setActive(0);
  }, [query]);

  const launch = (action) => {
    if (!action) return;
    if (action.href) {
      window.open(action.href, "_blank", "noopener");
      onClose();
    } else {
      action.run();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); launch(filtered[active]); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/50 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 dark:border-slate-800">
          <Command className="h-4 w-4 text-blue-500" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, open a link, run an action…"
            className="w-full bg-transparent py-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            aria-label="Search commands"
          />
          <kbd className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 dark:border-slate-700 dark:text-slate-500">
            ESC
          </kbd>
        </div>

        <ul className="max-h-[46vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-gray-400 dark:text-slate-500">
              Nothing matches “{query}”.
            </li>
          )}
          {filtered.map((a, i) => {
            const Icon = a.icon;
            return (
              <li key={a.label}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => launch(a)}
                  className={cx(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    i === active
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                      : "text-gray-700 dark:text-slate-300"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span className="flex-1 truncate font-medium">{a.label}</span>
                  {i === active && (
                    <kbd className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 dark:border-slate-700 dark:text-slate-500">
                      ↵
                    </kbd>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 border-t border-gray-100 px-4 py-2.5 text-[11px] text-gray-400 dark:border-slate-800 dark:text-slate-500">
          <span><kbd className="font-semibold">↑↓</kbd> navigate</span>
          <span><kbd className="font-semibold">↵</kbd> run</span>
          <span className="ml-auto hidden sm:inline">psst — press <kbd className="font-semibold">~</kbd> for the terminal</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- *
 * Terminal
 * ---------------------------------------------------------------- */
function TerminalShell({ runCommand, onClose }) {
  const [lines, setLines] = useState(() => [
    line("Vishnu Nair — portfolio shell (psh 2.0)", "text-blue-300"),
    line("An easter egg for the curious. Type `help` to see what it knows.", "text-slate-400"),
    line(""),
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const COMMAND_NAMES = ["help", "whoami", "neofetch", "skills", "projects", "journey", "contact", "socials", "go", "theme", "download", "date", "clear", "exit"];
  const SKILL_GROUPS = ["frontend", "backend", "db", "languages", "tools", "ai"];
  const GO_TARGETS = ["hero", "education", "internship", "projects", "github", "achievements", "contact", "work", "resume", "card"];

  const complete = () => {
    const parts = input.split(/\s+/);
    if (parts.length <= 1) {
      const m = COMMAND_NAMES.filter((c) => c.startsWith(parts[0] || ""));
      if (m.length === 1) setInput(m[0] + " ");
      else if (m.length > 1) setLines((l) => [...l, line(m.join("   "), "text-slate-500")]);
      return;
    }
    const pool = parts[0] === "skills" ? SKILL_GROUPS : parts[0] === "go" || parts[0] === "open" ? GO_TARGETS : [];
    const m = pool.filter((c) => c.startsWith(parts[parts.length - 1] || ""));
    if (m.length === 1) setInput([...parts.slice(0, -1), m[0]].join(" ") + " ");
  };

  const execute = (raw) => {
    setLines((l) => [...l, line(`➜  ~ ${raw}`, "text-emerald-400")]);
    const result = runCommand(raw);
    if (result === "CLEAR") setLines([]);
    else if (Array.isArray(result) && result.length) setLines((l) => [...l, ...result, line("")]);
    setHistory((h) => [raw, ...h].slice(0, 40));
    setHistIdx(-1);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      const raw = input;
      setInput("");
      execute(raw);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next] !== undefined) { setHistIdx(next); setInput(history[next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Developer terminal"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-[#0d1117] shadow-2xl shadow-black/50"
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-slate-800 bg-[#161b22] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-xs text-slate-400">vishnu@portfolio: ~</span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded px-2 py-0.5 font-mono text-xs text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200"
          >
            esc ✕
          </button>
        </div>

        {/* output */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6 text-slate-200"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => (
            <div key={i} className={cx("whitespace-pre-wrap", l.c)}>
              {l.t || "\u00A0"}
            </div>
          ))}
          {/* input line */}
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">➜</span>
            <span className="text-blue-400">~</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent font-mono text-[13px] text-slate-100 caret-blue-400 outline-none"
              aria-label="Terminal command input"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="border-t border-slate-800 bg-[#161b22] px-4 py-1.5 font-mono text-[11px] text-slate-500">
          tab: complete · ↑↓: history · ctrl+L: clear · esc: close
        </div>
      </motion.div>
    </motion.div>
  );
}
