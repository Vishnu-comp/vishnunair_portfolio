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
                </>
              }
            />
            {/* Work Page */}
            <Route path="/work" element={<Work />} />
            {/* Resume Page */}
            <Route path="/resume" element={<Resume />} />
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
