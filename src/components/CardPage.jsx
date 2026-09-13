import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ContactCard from "./ContactCard";
import useSeo from "../hooks/useSeo";

/**
 * Standalone, print-optimised version of the career-fair card.
 * Ctrl/Cmd+P here produces a single clean sheet: navbar, footer, FABs and the
 * action buttons all carry .no-print.
 */
const CardPage = () => {
  useSeo({
    title: "Contact Card — Vishnu Nair | vCard + QR",
    description:
      "Save Vishnu Nair's contact in one tap (vCard), or scan the QR codes for the portfolio site and WhatsApp chat.",
    path: "/card",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/40 px-4 pt-28 pb-16 dark:from-slate-950 dark:via-[#0b1120] dark:to-slate-900">
      <div className="mx-auto max-w-4xl">
        <ContactCard standalone />

        <div className="no-print mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CardPage;
