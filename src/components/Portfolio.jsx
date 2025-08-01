

import React, { useState, useEffect } from "react";
import { AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Portfolio = () => {
  const [currentSlideFirst, setCurrentSlideFirst] = useState(0);
  const [currentSlideSecond, setCurrentSlideSecond] = useState(0);
  const [currentSlideThird, setCurrentSlideThird] = useState(0);
  const [currentSlideFourth, setCurrentSlideFourth] = useState(0);

  const imagesFirst = [
    "https://github.com/user-attachments/assets/b03a310e-4238-4c11-a038-254607cc616c",
    "https://github.com/user-attachments/assets/a870cbd5-4e50-4ee9-a0b2-848fe9705752",
    "https://github.com/user-attachments/assets/686e7bed-5248-418f-8331-af6284a7a8e9",
    "https://github.com/user-attachments/assets/b32b8a0a-ecc8-417a-9c85-fd894fee42bf",
  ];

const imagesSecond = [
  "https://image2url.com/images/1754030458454-fcd6be93-749d-4719-98c2-3d7c32befaa7.png",
  "https://image2url.com/images/1754030542377-823b6452-1c34-475a-b81e-cde2c0829f2b.png",
  "https://image2url.com/images/1754030565507-c2c3af9a-a27b-4265-9974-f0c48079ce68.png",
  "https://image2url.com/images/1754030585510-912ad539-3104-4b07-84da-6e4b5966e270.png",
  "https://image2url.com/images/1754030603698-edd3e82f-f7a0-414c-92c2-7e47745c3eae.png",
  "https://image2url.com/images/1754030623609-56959ec6-607c-415b-aad5-d50e0c55aca7.png",
  "https://image2url.com/images/1754030642182-d976743f-2a0c-459a-a417-3b2b281dcf46.png",
  "https://image2url.com/images/1754030662057-f49c905f-76c3-4497-8b9c-b1bf36dfc2d5.png",
  "https://image2url.com/images/1754030678378-56a151be-4b70-470e-bb1e-c64e798d1d1b.png",
  "https://image2url.com/images/1754030693647-fb9aff43-d28a-41ed-b512-140e89593cee.png",
];


  const imagesThird = [
    "https://github.com/user-attachments/assets/67cf4df6-6fd7-4f29-ac9c-6f15fc95c627",
    "https://github.com/user-attachments/assets/d64c04ba-8429-439b-ae19-fe38a6e69622",
    "https://github.com/user-attachments/assets/c1f73f86-803c-4674-b77a-9c92fbc5bd8a",
    "https://github.com/user-attachments/assets/d32de42a-4479-46ed-a865-eab11095f7f9",
    "https://github.com/user-attachments/assets/ac048772-0a42-4e20-92e6-9c72f28da985",
    "https://github.com/user-attachments/assets/aa053c7e-0f66-4490-b6db-860c189f4f8a",
    "https://github.com/user-attachments/assets/265c8560-d708-4112-a9e1-f993b91fb9dc",
    "https://github.com/user-attachments/assets/ad47cd8d-7d2c-43d2-bfb2-6eeeb605634f",
  ];

  const imagesFourth = [
    "https://image2url.com/images/1754031199982-ae91512c-b86b-4a1c-be0d-30eb8110240c.png",
    "https://image2url.com/images/1754031220046-ee80ab30-0a2c-44c5-9b90-fe3571b056ae.png",
    "https://image2url.com/images/1754031233051-dcc30fe3-7dc0-48b5-80e8-787df2965ca7.png",
    "https://image2url.com/images/1754031248588-51d0aa72-cbe0-4e82-83ea-8b7f292b40ab.png",
    "https://image2url.com/images/1754031261862-61530556-1bb3-45ee-937e-2f4bc0d0060a.png",
    "https://image2url.com/images/1754031279225-8391bd44-4084-447f-bd3c-760e2fbc9c37.png",
  ];

  const handleSlideChange = (direction, currentSlide, setCurrentSlide, maxLength) => {
    if (direction === "next") {
      setCurrentSlide((prev) => (prev + 1) % maxLength);
    } else {
      setCurrentSlide((prev) => (prev - 1 + maxLength) % maxLength);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideFirst((prev) => (prev + 1) % imagesFirst.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imagesFirst.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideSecond((prev) => (prev + 1) % imagesSecond.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imagesSecond.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideThird((prev) => (prev + 1) % imagesThird.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imagesThird.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideFourth((prev) => (prev + 1) % imagesFourth.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imagesFourth.length]);

  const ProjectSection = ({
    title,
    description,
    technologies,
    images,
    currentSlide,
    setCurrentSlide,
    caseStudyText,
    githubLink,
    deployedLink,
  }) => (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 mt-16 px-4 group">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between w-full lg:w-1/3 border border-gray-100 hover:border-blue-200 transition-all duration-300">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
            {title}
            <span className="block mt-2 w-24 h-1 bg-blue-500 rounded group-hover:w-32 transition-all duration-300"></span>
          </h2>
          <div className="flex flex-wrap gap-2 my-6">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-600 text-xs md:text-sm font-medium px-4 py-1.5 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">
            {description}
          </h3>
          <ul className="space-y-4 text-gray-600 text-base md:text-lg">
            {caseStudyText.map((text, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 space-y-4">

          <div className="flex gap-4 pt-2">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
            >
              <AiOutlineGithub className="text-2xl text-gray-700 hover:text-blue-500 transition-colors duration-200" />
            </a>
            <a
              href={deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
            >
              <AiOutlineLink className="text-2xl text-gray-700 hover:text-blue-500 transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/3 relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] group">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <div className="relative w-full h-full">
            <img
              src={images[currentSlide]}
              alt={`${title} Slider`}
              className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-500"
            />

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                handleSlideChange("prev", currentSlide, setCurrentSlide, images.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={() =>
                handleSlideChange("next", currentSlide, setCurrentSlide, images.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-blue-500 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50/50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
          My Projects
          <span className="block mt-4 w-24 mx-auto h-1.5 bg-blue-500 rounded-full"></span>
        </h2>
        <p className="text-gray-600 text-center mt-6 text-lg max-w-2xl mx-auto">
          Explore my latest work and projects that showcase my skills in web development and design.
        </p>
      </div>

      <ProjectSection
        title="Unishare"
        description="Community Sharing Platform"
        technologies={["MongoDb", "ExpressJs", "React", "NodeJs","Tailwind CSS",]}
        images={imagesSecond}
        currentSlide={currentSlideSecond}
        setCurrentSlide={setCurrentSlideSecond}
        githubLink="https://github.com/Vishnu-comp/UNISHARE"
        deployedLink="https://unishare-ten.vercel.app/"
        caseStudyText={[
          "Developed a web app for borrowing, lending, and sharing resources within a college community",
          "Implemented data encryption and validation to ensure user data security.",
          "Designed a user-friendly interface to enhance communication and efficiency",
        ]}
      />

      <ProjectSection
        title="CraveMate"
        description="Food Ordering Web App"
        technologies={["React", "SpringBoot", "MongoDb", "Tailwind CSS"]}
        images={imagesFirst}
        currentSlide={currentSlideFirst}
        setCurrentSlide={setCurrentSlideFirst}
        githubLink="https://github.com/Vishnu-comp/CraveMate_frontend"
        deployedLink="https://vishnunairakasaairfd.vercel.app/"
        caseStudyText={[
          "Developed a responsive web app for food ordering with mobile compatibility.",
          "Added advanced search and filter options for better user experience.",
          "Built an inventory system with real-time stock updates to manage item availability.",
        ]}
      />

      <ProjectSection
        title="Intervo"
        description="Simplify Hiring Amplify Talent"
        technologies={[
          "MongoDb",
          "ExpressJs",
          "React",
          "NodeJs",
          "Python",
          "Flask",
          "Tailwind CSS",
        ]}
        images={imagesThird}
        currentSlide={currentSlideThird}
        setCurrentSlide={setCurrentSlideThird}
        githubLink="https://github.com/Vishnu-comp/intervo-backend"
        deployedLink="https://intervoproject.com"
        caseStudyText={[
          "Automated interview management to replace manual processes.",
          "Tracked interview progress and analyzed interviewer performance.",
          "Implemented random question generation and proctoring features",
        ]}
      />
    <ProjectSection
      title="Interactive Learning with Real-Time Polls"
      description="A real-time classroom polling app for interactive learning"
      technologies={[
        "React.js",
        "Tailwind CSS",
        "Socket.io",
        "Node.js",
        "Express.js"
      ]}
      images={imagesFourth}
      currentSlide={currentSlideFourth}
      setCurrentSlide={setCurrentSlideFourth}
      githubLink="https://github.com/Vishnu-comp/Intervue"
      deployedLink="https://intervue-six.vercel.app/"
      caseStudyText={[
        "Built a real-time polling system to enhance classroom engagement.",
        "Enabled teachers to create polls, monitor responses live, and chat with students.",
        "Allowed students to respond to polls, view results instantly, and participate in real-time discussions.",
        "Implemented socket-based architecture to support efficient live data streaming.",
        "Emphasized usability with a smooth, intuitive UI for both teachers and students."
      ]}
    />

    </div>
  );
};

export default Portfolio;

