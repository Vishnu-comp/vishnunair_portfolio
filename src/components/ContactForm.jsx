import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiUser, FiMessageSquare } from "react-icons/fi";
import {
  HiArrowRight,
  HiCheckCircle,
  HiExclamationCircle,
  HiOutlineMailOpen,
} from "react-icons/hi";
import { Loader2 } from "lucide-react";
import { site } from "../data/site";
import { cx } from "../utils/theme";

/**
 * Working contact form.
 *
 * Delivery (no backend, no signup):
 *   1. If `site.contactEndpoint` is set (e.g. a Formspree/Web3Forms URL) the
 *      JSON payload is POSTed there.
 *   2. Otherwise it goes to Formsubmit.co's AJAX endpoint for `site.email`.
 *      Formsubmit is free for static sites and CORS-enabled, so this works
 *      from the browser with no server. NOTE: on the very first submission
 *      Formsubmit emails the owner a one-time activation link; after clicking
 *      it, every message is forwarded to the inbox in real time.
 *   3. If the request fails (offline, rate-limited, service down) the UI
 *      offers a prefilled mailto: fallback so a visitor is never dead-ended.
 */

const fieldClasses = [
  "w-full pl-12 pr-4 py-3.5 rounded-xl border backdrop-blur-sm",
  "border-gray-200 bg-white/50 text-gray-900 placeholder-gray-400",
  "dark:border-slate-600/80 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder-slate-500",
  "focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-gold-500/30 dark:focus:border-gold-500",
  "transition-all duration-200 outline-none",
].join(" ");

const errorFieldClasses = fieldClasses + " border-rose-400 dark:border-rose-500/70 focus:border-rose-500 focus:ring-rose-200 dark:focus:ring-rose-500/30";

const labelClasses =
  "text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 block";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (values) => {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please tell me your name.";
  if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That email address doesn't look right.";
  if (values.message.trim().length < 10)
    errors.message = "A little more detail helps — 10 characters minimum.";
  return errors;
};

const ContactForm = () => {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  const errors = validate(values);
  const showError = (field) => touched[field] && errors[field];

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    // Leaving an error banner behind once a retry succeeds
    if (status === "error") setStatus("idle");
  };

  const handleBlur = (field) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  const mailtoFallback = () => {
    const subject = `Portfolio enquiry from ${values.name || "a visitor"}`;
    const body = `${values.message}\n\n— ${values.name} (${values.email})`;
    return `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length > 0) return;

    // Honeypot filled => bot. Pretend success, send nothing.
    if (e.currentTarget.honey?.value) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      _subject: `Portfolio contact: ${values.name.trim()}`,
      _template: "table",
    };

    const endpoint =
      site.contactEndpoint || `https://formsubmit.co/ajax/${site.email}`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Service responded ${res.status}`);
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
      setTouched({});
    } catch (err) {
      setErrorMessage(
        err?.message || "The message service could not be reached."
      );
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    /* overflow-hidden: the animated blobs drift up to ~30px past the
       viewport edges mid-keyframe; without clipping they make the whole
       document wider than the screen and the page can be panned sideways
       on mobile (drifting the fixed navbar / bottom tab bar with it). */
    <section className="relative min-h-screen overflow-hidden py-20 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-slate-900/60 dark:via-transparent dark:to-slate-900/40 -z-10"></div>
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob dark:bg-gold-500/10 dark:mix-blend-normal"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-delay-2000 dark:bg-gold-400/10 dark:mix-blend-normal"></div>

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-gold-100 dark:to-gold-600">
              Let's Connect
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Messages go
            straight to my inbox.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gold-500 dark:to-gold-600 transform -skew-y-6 rounded-3xl shadow-xl opacity-10 dark:opacity-15"></div>
          <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-12">
            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
              {/* Honeypot — invisible to humans, irresistible to bots */}
              <input
                type="text"
                name="honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Input */}
                <div className="relative">
                  <label htmlFor="contact-name" className={labelClasses}>
                    Your Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={values.name}
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      aria-invalid={Boolean(showError("name"))}
                      className={showError("name") ? errorFieldClasses : fieldClasses}
                      placeholder="John Doe"
                    />
                  </div>
                  <AnimatePresence>
                    {showError("name") && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-sm text-rose-500"
                        role="alert"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="contact-email" className={labelClasses}>
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      aria-invalid={Boolean(showError("email"))}
                      className={showError("email") ? errorFieldClasses : fieldClasses}
                      placeholder="john@example.com"
                    />
                  </div>
                  <AnimatePresence>
                    {showError("email") && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-sm text-rose-500"
                        role="alert"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Message Input */}
              <div className="relative">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="contact-message" className={labelClasses}>
                    Your Message
                  </label>
                  <span
                    className={cx(
                      "text-xs tabular-nums",
                      values.message.length > 500
                        ? "text-rose-500"
                        : "text-gray-400 dark:text-slate-500"
                    )}
                    aria-hidden="true"
                  >
                    {values.message.length}/500
                  </span>
                </div>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-gray-400 dark:text-slate-500" />
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="6"
                    maxLength={500}
                    required
                    value={values.message}
                    onChange={handleChange("message")}
                    onBlur={handleBlur("message")}
                    aria-invalid={Boolean(showError("message"))}
                    className={showError("message") ? errorFieldClasses : fieldClasses}
                    placeholder="Tell me about your project, goals, and timeline..."
                  />
                </div>
                <AnimatePresence>
                  {showError("message") && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-sm text-rose-500"
                      role="alert"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Status banners */}
              <AnimatePresence>
                {status === "sent" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                  >
                    <HiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <p className="text-sm leading-6">
                      <strong className="font-semibold">Message sent!</strong>{" "}
                      It's on its way to my inbox — I usually reply within a
                      day. (First time? I may need to click a one-time
                      activation link from my mail provider before deliveries
                      start.)
                    </p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
                  >
                    <HiExclamationCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <div className="text-sm leading-6">
                      <p>
                        <strong className="font-semibold">
                          Couldn't send that.
                        </strong>{" "}
                        {errorMessage || "The message service is unreachable."}{" "}
                        You can try again, or send it directly:
                      </p>
                      <a
                        href={mailtoFallback()}
                        className="mt-2 inline-flex items-center gap-2 font-semibold underline underline-offset-2"
                      >
                        <HiOutlineMailOpen className="h-4 w-4" />
                        Open in my email app instead
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={sending ? undefined : { scale: 1.02 }}
                whileTap={sending ? undefined : { scale: 0.98 }}
                className={cx(
                  "w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600",
                  "text-white font-medium rounded-xl shadow-lg",
                  "hover:shadow-blue-500/25 hover:shadow-xl",
                  "transform transition-all duration-200",
                  "focus:ring-4 focus:ring-blue-200 dark:focus:ring-gold-500/30 focus:outline-none",
                  "flex items-center justify-center gap-2 group",
                  sending && "cursor-wait opacity-80"
                )}
              >
                {sending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </motion.button>

              <p className="text-center text-xs text-gray-400 dark:text-slate-500">
                Delivered to {site.email} · no data is stored on this site
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
