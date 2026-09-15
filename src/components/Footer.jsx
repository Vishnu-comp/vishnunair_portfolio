import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Github, Linkedin, Mail, MapPin, Heart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { navItems, site } from "../data/site";
import { useSectionNavigation } from "../hooks/useNavigation";

/**
 * Site footer.
 *
 * Also the thing the floating action buttons and the mobile tab bar visually
 * sit on top of — without it the page used to just stop after the contact form.
 */
const Footer = () => {
  const { goTo } = useSectionNavigation();
  const year = new Date().getFullYear();

  const waHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        site.whatsappMessage
      )}`
    : null;

  const socials = [
    {
      label: "GitHub",
      href: site.links.github,
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: site.links.linkedin,
      icon: Linkedin,
    },
    {
      label: "Email",
      href: `mailto:${site.email}`,
      icon: Mail,
    },
    // Only rendered when a number is configured in src/data/site.js
    ...(waHref
      ? [{ label: "WhatsApp", href: waHref, icon: FaWhatsapp, accent: true }]
      : []),
  ];

  return (
    <footer className="no-print relative border-t border-gray-200 bg-white pt-16 pb-28 md:pb-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block transition-transform hover:scale-105">
              <img
                src={site.logo}
                alt={`${site.name} logo`}
                className="h-12 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-600 dark:text-slate-400">
              {site.role} building scalable, high-performance web applications
              with React, Next.js, Java Spring Boot and Node.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-slate-500">
              <MapPin className="h-4 w-4 text-blue-500 dark:text-gold-400" aria-hidden="true" />
              Bengaluru, India · Open to opportunities
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      social.href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    aria-label={social.label}
                    title={social.label}
                    className={
                      social.accent
                        ? "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                        : "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-gold-500 dark:hover:text-gold-300"
                    }
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Explore
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-gold-300"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goTo(item)}
                      className="text-left text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-gold-300"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
              <li>
                <Link
                  to="/resume"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-gold-300"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-gold-300"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-gold-300"
                >
                  {site.links.live.replace(/^https?:\/\//, "")}
                </a>
              </li>
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-gold-300"
                >
                  LinkedIn profile
                </a>
              </li>
              <li>
                <Link
                  to="/card"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-gold-300"
                >
                  Career-fair card (QR + vCard)
                </Link>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-gold-500 dark:hover:text-gold-300"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              Back to top
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 text-sm text-gray-500 sm:flex-row dark:border-slate-800 dark:text-slate-500">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            Built with React, Tailwind CSS & Framer Motion
            <Heart className="h-4 w-4 text-rose-500" aria-hidden="true" />
            <span className="mx-1 text-gray-300 dark:text-slate-700" aria-hidden="true">·</span>
            <span className="text-gray-400 dark:text-slate-500">
              press{" "}
              <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-gray-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                Ctrl
              </kbd>
              +
              <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-gray-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                K
              </kbd>{" "}
              or{" "}
              <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-gray-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                ~
              </kbd>{" "}
              for secrets
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
