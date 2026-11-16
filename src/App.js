import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Services from "./components/TopSkills";
import Education from "./components/Education";
import WhyHireMe from "./components/ContactForm";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import Resume from "./components/Resume";
import InternshipExperience from "./components/Internship";
import { Achievement } from "./components/Achiement";
import Work from "./components/Work";
import GithubActivity from "./components/GithubActivity";
import ContactCard from "./components/ContactCard";
import CardPage from "./components/CardPage";
import SectionHead from "./components/SectionHead";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import FloatingActions from "./components/FloatingActions";
import AskAI from "./components/AskAI";
import MobileBottomNav from "./components/MobileBottomNav";
import SystemOverlay from "./components/SystemOverlay";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-paper text-ink dark:bg-surface dark:text-slate-200">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Main Page */}
            <Route
              path="/"
              element={
                <>
                  <div id="hero">
                    <Hero />
                  </div>
                  <Marquee />
                  <div id="education">
                    <Education />
                  </div>
                  <div id="internship">
                    <InternshipExperience />
                  </div>
                  <div id="portfolio">
                    <Portfolio />
                  </div>
                  <div className="dark mx-2 my-6 overflow-hidden rounded-[2rem] bg-ink text-slate-200 sm:mx-4">
                    <div id="github">
                    <GithubActivity />
                  </div>
                  </div>
                  <div id="achievements">
                    <Achievement />
                  </div>
                  <div className="dark mx-2 my-6 overflow-hidden rounded-[2rem] bg-ink text-slate-200 sm:mx-4">
                    <div id="services">
                    <Services />
                  </div>
                  </div>
                  <div id="whyhireme">
                    <WhyHireMe />
                  </div>
                  {/*
                   * Sits between the contact form and the card on purpose: a
                   * visitor who has read the pitch but isn't ready to email is
                   * exactly the person who wants a second opinion first.
                   */}
                  <div className="dark mx-2 my-6 overflow-hidden rounded-[2rem] bg-ink text-slate-200 sm:mx-4">
                    <div id="ask-ai">
                    <AskAI />
                  </div>
                  </div>
                  <div id="connect">
                    <section className="bg-gray-50/70 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900/40">
                      <div className="mx-auto max-w-[1400px]">
                        <SectionHead n="09" tag="Contact card" title="Grab My Card" sub="Meeting in person? Save my contact in one tap, or scan either QR code — no typing, no typos." />
                        <ContactCard />
                      </div>
                    </section>
                  </div>
                </>
              }
            />
            {/* Work Page */}
            <Route path="/work" element={<Work />} />
            {/* Resume Page */}
            <Route path="/resume" element={<Resume />} />
            {/* Printable career-fair card */}
            <Route path="/card" element={<CardPage />} />
            {/* Anything else -> friendly 404 instead of a blank page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* Persistent overlays — rendered outside <main> so they survive route changes */}
      <FloatingActions />
      <MobileBottomNav />
      <SystemOverlay />
      <Analytics />
    </Router>
  );
}

export default App;
