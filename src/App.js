import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Services from "./components/TopSkills";
import Education from "./components/Education";
import WhyHireMe from "./components/ContactForm";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import Resume from "./components/Resume";
import { Achievement } from "./components/Achiement";
import InternshipExperience from "./components/Internship";
import Work from "./components/Work";
import GithubActivity from "./components/GithubActivity";
import ContactCard from "./components/ContactCard";
import CardPage from "./components/CardPage";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import FloatingActions from "./components/FloatingActions";
import MobileBottomNav from "./components/MobileBottomNav";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white text-gray-800 dark:bg-surface dark:text-slate-200">
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
                  <div id="education">
                    <Education />
                  </div>
                  <div id="internship">
                    <InternshipExperience />
                  </div>
                  <div id="portfolio">
                    <Portfolio />
                  </div>
                  <div id="github">
                    <GithubActivity />
                  </div>
                  <div id="achievements">
                    <Achievement />
                  </div>
                  <div id="services">
                    <Services />
                  </div>
                  <div id="whyhireme">
                    <WhyHireMe />
                  </div>
                  <div id="connect">
                    <section className="bg-gray-50/70 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900/40">
                      <div className="mx-auto max-w-5xl">
                        <div className="mb-10 text-center">
                          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
                            Grab My Card
                          </h2>
                          <span className="mx-auto mt-4 block h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-slate-400">
                            Meeting in person? Save my contact in one tap, or
                            scan either QR code — no typing, no typos.
                          </p>
                        </div>
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
      <Analytics />
    </Router>
  );
}

export default App;
