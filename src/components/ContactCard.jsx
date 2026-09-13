import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Printer,
  Download,
} from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { site } from "../data/site";

/**
 * Career-fair contact card.
 *
 *  - "Save contact" downloads public/vishnu-nair.vcf (vCard 3.0 with embedded
 *    photo) - one tap on a phone booth-adds the full contact.
 *  - The two QR codes (portfolio URL, WhatsApp chat) are static PNGs in
 *    public/ so they scan even if every script on the page fails.
 *  - "Print" produces a clean single-card sheet: navbar, footer, FABs and the
 *    button row itself carry .no-print and disappear in print media.
 *
 * Rendered twice: as the #connect section on the home page, and standalone on
 * the /card route (the printable version).
 */

const waHref = site.whatsapp
  ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
      site.whatsappMessage
    )}`
  : null;

const rows = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phoneDisplay, href: `tel:${site.phone}` },
  ...(waHref
    ? [{ icon: FaWhatsapp, label: "WhatsApp", value: "Chat now", href: waHref, external: true }]
    : []),
  { icon: MapPin, label: "Based in", value: "Bengaluru, India" },
  { icon: Globe, label: "Portfolio", value: site.links.live.replace(/^https?:\/\//, ""), href: site.links.live, external: true },
  { icon: FaLinkedin, label: "LinkedIn", value: "/in/vishnu-nair", href: site.links.linkedin, external: true },
  { icon: FaGithub, label: "GitHub", value: "@Vishnu-comp", href: site.links.github, external: true },
];

const QrTile = ({ src, caption, sub }) => (
  <figure className="flex flex-col items-center gap-3">
    <div className="rounded-2xl bg-white p-3 shadow-lg shadow-slate-900/10 ring-1 ring-gray-100 dark:ring-slate-700/60">
      <img
        src={src}
        alt={`QR code — ${caption}`}
        width={148}
        height={148}
        loading="lazy"
        decoding="async"
        className="h-[148px] w-[148px]"
      />
    </div>
    <figcaption className="text-center">
      <span className="block text-sm font-semibold text-gray-800 dark:text-slate-100">
        {caption}
      </span>
      <span className="block text-xs text-gray-500 dark:text-slate-400">{sub}</span>
    </figcaption>
  </figure>
);

const ContactCard = ({ standalone = false }) => (
  <div
    className={
      "relative overflow-hidden rounded-3xl border border-gray-100 bg-white/90 shadow-2xl shadow-blue-500/10 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/85 " +
      (standalone ? "p-6 sm:p-10" : "p-6 sm:p-10")
    }
  >
    {/* accent wash */}
    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-500/10" aria-hidden="true" />

    <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      {/* ---------- identity + rows ---------- */}
      <div>
        <div className="flex items-center gap-4">
          <img
            src="/logos.png"
            alt={`${site.name} logo`}
            width={56}
            height={56}
            className="h-14 w-14 rounded-2xl shadow-md"
          />
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{site.name}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {site.role}
            </p>
          </div>
        </div>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {rows.map((row) => {
            const Icon = row.icon;
            const content = (
              <>
                <Icon className="h-4 w-4 flex-shrink-0 text-blue-500 dark:text-blue-400" aria-hidden="true" />
                <span className="truncate">{row.value}</span>
              </>
            );
            const cls =
              "flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/70 px-3.5 py-2.5 text-sm text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-700 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-blue-500/40 dark:hover:text-blue-300";
            return (
              <li key={row.label}>
                {row.href ? (
                  <a
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    className={cls}
                    aria-label={`${row.label}: ${row.value}`}
                  >
                    {content}
                  </a>
                ) : (
                  <span className={cls}>{content}</span>
                )}
              </li>
            );
          })}
        </ul>

        {/* actions — hidden when printing */}
        <div className="no-print mt-8 flex flex-wrap gap-3">
          <a
            href="/vishnu-nair.vcf"
            download="Vishnu-Nair.vcf"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Save contact (.vcf)
          </a>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              WhatsApp me
            </a>
          )}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print card
          </button>
        </div>
      </div>

      {/* ---------- QR tiles ---------- */}
      <div className="flex flex-wrap items-start justify-center gap-8 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-6 dark:border-slate-700/60 dark:bg-slate-800/30 sm:flex-nowrap sm:justify-around">
        <QrTile
          src="/qr-portfolio.png"
          caption="Portfolio"
          sub="scan → vishnunairportfolio.vercel.app"
        />
        <QrTile src="/qr-whatsapp.png" caption="WhatsApp" sub="scan → instant chat" />
      </div>
    </div>

    {/* print-only footer line so a printed card carries the URL in text too */}
    <p className="relative mt-8 hidden text-center text-xs text-gray-500 print:block dark:text-slate-400">
      {site.links.live} · {site.email} · {site.phoneDisplay}
    </p>
  </div>
);

export default ContactCard;
