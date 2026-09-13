import React from "react";
import resumePDF from "../assets/VishnuResume.pdf";
import useSeo from "../hooks/useSeo";

const Resume = () => {
  useSeo({
    title: "Resume — Vishnu Nair | MCA, Software Development Engineer",
    description:
      "View and download the resume of Vishnu Nair: Software Development Engineer with React, Next.js, Java Spring Boot and Node.js experience at Shoffr and ICIER.",
    path: "/resume",
  });

  return (
    <div id="resume" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#0b1120] dark:to-slate-900 py-16 px-4">
      <div className="w-full max-w-screen-lg">
      <br/>
      <br/>
        <div className="flex justify-between items-center mb-8">
          
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">My Resume</h1>
          <a
            href={resumePDF}
            download
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download PDF
          </a>
        </div>
        <div className="bg-white dark:bg-slate-900/80 p-4 rounded-xl shadow-lg">
          <embed
            src={resumePDF}
            type="application/pdf"
            className="w-full h-[80vh] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Resume;
