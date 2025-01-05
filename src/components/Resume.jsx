import React from "react";
import resumePDF from "../assets/VishnuResume.pdf";

const Resume = () => {
  return (
    <div id="resume" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">My Resume</h1>
      <div className="w-full flex justify-center">
        <embed
          src={resumePDF}
          type="application/pdf"
          className="w-full max-w-screen-lg h-[80vh] rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Resume;
