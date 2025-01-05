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

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Main Page */}
          <Route
            path="/"
            element={
              <>
                <div id="hero">
                  <br/>
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
          {/* Resume Page */}
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
