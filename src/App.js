import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Work from "./components/Work";
import Resume from "./components/Resume";
import CardPage from "./components/CardPage";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ReelPortfolio from "./ReelPortfolio";
import AskAI from "./components/AskAI";
import { Analytics } from "@vercel/analytics/react";
function DetailPage({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-surface dark:text-slate-200">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ReelPortfolio />} />
        <Route
          path="/ask-ai"
          element={
            <DetailPage>
              <div className="pt-24">
                <AskAI />
              </div>
            </DetailPage>
          }
        />
        <Route
          path="/work"
          element={
            <DetailPage>
              <Work />
            </DetailPage>
          }
        />
        <Route
          path="/resume"
          element={
            <DetailPage>
              <Resume />
            </DetailPage>
          }
        />
        <Route
          path="/card"
          element={
            <DetailPage>
              <CardPage />
            </DetailPage>
          }
        />
        <Route
          path="*"
          element={
            <DetailPage>
              <NotFound />
            </DetailPage>
          }
        />
      </Routes>
      <Analytics />
    </Router>
  );
}
export default App;
