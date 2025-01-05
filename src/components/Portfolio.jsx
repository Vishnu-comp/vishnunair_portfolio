// import React from "react";

// const Portfolio = () => {
//   return (
//     <div className="bg-white py-16 px-6">
//       {/* First Section */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0">
//         {/* Left Content (Text) */}
//         <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col justify-between flex-1 lg:flex-[0.3]">
//           <div>
//             <div className="flex gap-2 mb-4">
//               <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">RTL</span>
//               <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Localization</span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Mobile App Design for Right-to-Left Languages</h3>
//             <p className="text-gray-600 text-sm">
//               Designing for 120M+ users worldwide: dive into RTL localization challenges, from interface mirroring to cultural nuances, boosting user engagement.
//             </p>
//           </div>
//           <a
//             href="#"
//             className="text-blue-500 font-medium mt-6 inline-block hover:underline"
//           >
//             See full case study &rarr;
//           </a>
//         </div>

//         {/* Right Content (Image) */}
//         <div className="flex items-center justify-center flex-1 lg:flex-[0.5]">
//           <img
//             src="https://github.com/user-attachments/assets/7d11b8fb-3148-4138-b595-af666e0741ff"
//             alt="RTL Design Preview"
//             className="rounded-lg shadow-lg w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Second Section */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 mt-12">
//         {/* Left Content (Image) */}
//         <div className="flex items-center justify-center flex-1 lg:flex-[0.5]">
//           <img
//             src="https://github.com/user-attachments/assets/558d3009-6c26-4764-ac5c-9d763158781b"
//             alt="Crypto Wallet Preview"
//             className="rounded-lg shadow-lg w-full h-full object-cover"
//           />
//         </div>

//         {/* Right Content (Text) */}
//         <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col justify-between flex-1 lg:flex-[0.3]">
//           <div>
//             <div className="flex gap-2 mb-4">
//               <span className="bg-pink-200 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">Mobile App</span>
//               <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">FinTech</span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Is Humanizing Crypto Even Possible?</h3>
//             <p className="text-gray-600 text-sm">
//               Can we ever truly humanize crypto? Can we make crypto simple and user-friendly? The short answer: no.
//             </p>
//           </div>
//           <a
//             href="#"
//             className="text-blue-500 font-medium mt-6 inline-block hover:underline"
//           >
//             Learn more &rarr;
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;



// import React, { useState, useEffect } from "react";
// import { AiOutlineGithub, AiOutlineLink } from "react-icons/ai";

// const Portfolio = () => {
//   const [currentSlideFirst, setCurrentSlideFirst] = useState(0);
//   const [currentSlideSecond, setCurrentSlideSecond] = useState(0);
//   const [currentSlideThird, setCurrentSlideThird] = useState(0);

//   const imagesFirst = [
//     "https://github.com/user-attachments/assets/a870cbd5-4e50-4ee9-a0b2-848fe9705752",
//     "https://github.com/user-attachments/assets/686e7bed-5248-418f-8331-af6284a7a8e9",
//     "https://github.com/user-attachments/assets/b32b8a0a-ecc8-417a-9c85-fd894fee42bf",
//     "https://github.com/user-attachments/assets/b03a310e-4238-4c11-a038-254607cc616c",
//   ];

//   const imagesSecond = [
//     "https://github.com/user-attachments/assets/67dd52cc-18e1-4def-b8d4-30fc3a4b271e",
//     "https://github.com/user-attachments/assets/3e64e8b7-fbc0-452b-9068-6955d5a4802a",
//     "https://github.com/user-attachments/assets/4cb4b5bf-d5b7-4f9f-a42b-e21c35398c71",
//     "https://github.com/user-attachments/assets/633fa130-35c0-4381-8785-d060474c39f9",
//     "https://github.com/user-attachments/assets/4bbea010-9610-4ac3-ac98-ae9bed4b854a",
//   ];

//   const imagesThird = [
//     "https://github.com/user-attachments/assets/739e40d4-5002-4f26-8e04-b614ae621a67",
//     "https://github.com/user-attachments/assets/d64c04ba-8429-439b-ae19-fe38a6e69622",
//     "https://picsum.photos/200?random=11",
//     "https://picsum.photos/200?random=12",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlideFirst((prev) => (prev + 1) % imagesFirst.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [imagesFirst.length]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlideSecond((prev) => (prev + 1) % imagesSecond.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [imagesSecond.length]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlideThird((prev) => (prev + 1) % imagesThird.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [imagesThird.length]);

//   return (
//     <div className="bg-white py-16 px-6">
//       <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-10">
//         MY PROJECT
//         <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
//       </h2>
//       <br />
//       {/* First Section */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0">
//         <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col justify-between flex-1 lg:flex-[0.3]">
//           <div>
//             <h2 className="text-3xl font-bold text-center text-gray-800">
//               CraveMate
//               <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
//             </h2>
//             <br />
//             <div className="flex gap-2 mb-4">
//               <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
//                 React
//               </span>
//               <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                 SpringBoot
//               </span>
//               <span className="bg-red-200 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
//                 MongoDb
//               </span>
//               <span className="bg-pink-200 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
//                 Tailwind Css
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//               Food Ordering Web App
//             </h3>
//             <p className="text-gray-600 text-lg">
//   <ul className="list-disc list-inside">
//     <li>Developed a responsive web app for food ordering with mobile compatibility.</li>
//     <li>Added advanced search and filter options for better user experience.</li>
//     <li>Built an inventory system with real-time stock updates to manage item availability.</li>
//   </ul>
// </p>

//           </div>
//           <a
//             href="#"
//             className="text-blue-500 font-medium mt-6 inline-block hover:underline"
//           >
//             See full case study &rarr;
//           </a>
//           <div className="flex gap-4 mt-4">
//             <a href="https://github.com/your-github-link" target="_blank" rel="noopener noreferrer">
//               <AiOutlineGithub className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//             <a href="https://your-deployed-link.com" target="_blank" rel="noopener noreferrer">
//               <AiOutlineLink className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//           </div>
//         </div>
//         <div className="flex items-center justify-center flex-1 lg:flex-[0.7] relative">
//           <img
//             src={imagesFirst[currentSlideFirst]}
//             alt="First Section Slider"
//             className="rounded-lg shadow-lg w-full h-[500px] object-contain"
//           />
//         </div>
//       </div>

//       {/* Second Section */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 mt-12">
//         <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col justify-between flex-1 lg:flex-[0.3]">
//           <div>
//             <h2 className="text-3xl font-bold text-center text-gray-800">
//               Unishare
//               <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
//             </h2>
//             <br />
//             <div className="flex gap-2 mb-4">
//               <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
//                 MongoDb
//               </span>
//               <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                 ExpressJs
//               </span>
//               <span className="bg-red-200 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
//                 React
//               </span>
//               <span className="bg-pink-200 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
//                 NodeJs
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">
//               Community Sharing Platform  
//             </h3>
//             <p className="text-gray-600 text-lg">
//   <ul className="list-disc list-inside">
//     <li>Developed an web app for borrowing, lending, and sharing resources within a college community</li>
//     <li>Implemented data encryption and validation to ensure user data security.</li>
//     <li>Designed a user-friendly interface to enhance communication and efficiency</li>
//   </ul>
// </p>
//           </div>
//           <a
//             href="#"
//             className="text-blue-500 font-medium mt-6 inline-block hover:underline"
//           >
//             Learn more &rarr;
//           </a>
//           <div className="flex gap-4 mt-4">
//             <a href="https://github.com/your-github-link" target="_blank" rel="noopener noreferrer">
//               <AiOutlineGithub className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//             <a href="https://your-deployed-link.com" target="_blank" rel="noopener noreferrer">
//               <AiOutlineLink className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//           </div>
//         </div>
//         <div className="flex items-center justify-center flex-1 lg:flex-[0.7] relative">
//           <img
//             src={imagesSecond[currentSlideSecond]}
//             alt="Second Section Slider"
//             className="rounded-lg shadow-lg w-full h-[500px] object-contain"
//           />
//         </div>
//       </div>

//       {/* Third Section */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 mt-12">
//         <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col justify-between flex-1 lg:flex-[0.3]">
//           <div>
//             <h2 className="text-3xl font-bold text-center text-gray-800">
//               Intervo
//               <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
//             </h2>
//             <br />
//             <div className="flex gap-2 mb-4">
//               <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
//                 MongoDb
//               </span>
//               <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                 ExpressJs
//               </span>
//               <span className="bg-red-200 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
//                 React
//               </span>
//               <span className="bg-pink-200 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
//                 NodeJs
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//               Simplify Hiring Amplify Talent
//             </h3>
//             <p className="text-gray-600 text-lg">
//   <ul className="list-disc list-inside">
//     <li>Automated interview management to replace manual processes.</li>
//     <li>Tracked interview progress and analyzed interviewer performance.</li>
//     <li>Implemented random question generation and proctoring features</li>
//   </ul>
// </p>
//           </div>
//           <a
//             href="#"
//             className="text-blue-500 font-medium mt-6 inline-block hover:underline"
//           >
//             Read more &rarr;
//           </a>
//           <div className="flex gap-4 mt-4">
//             <a href="https://github.com/your-github-link" target="_blank" rel="noopener noreferrer">
//               <AiOutlineGithub className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//             <a href="https://your-deployed-link.com" target="_blank" rel="noopener noreferrer">
//               <AiOutlineLink className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//           </div>
//         </div>
//         <div className="flex items-center justify-center flex-1 lg:flex-[0.7] relative">
//           <img
//             src={imagesThird[currentSlideThird]}
//             alt="Third Section Slider"
//             className="rounded-lg shadow-lg w-full h-[500px] object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;






// import React, { useState, useEffect } from "react";
// import { AiOutlineGithub, AiOutlineLink } from "react-icons/ai";

// const Portfolio = () => {
//   const [currentSlideFirst, setCurrentSlideFirst] = useState(0);
//   const [currentSlideSecond, setCurrentSlideSecond] = useState(0);
//   const [currentSlideThird, setCurrentSlideThird] = useState(0);

//   const imagesFirst = [
//     "https://github.com/user-attachments/assets/a870cbd5-4e50-4ee9-a0b2-848fe9705752",
//     "https://github.com/user-attachments/assets/686e7bed-5248-418f-8331-af6284a7a8e9",
//     "https://github.com/user-attachments/assets/b32b8a0a-ecc8-417a-9c85-fd894fee42bf",
//     "https://github.com/user-attachments/assets/b03a310e-4238-4c11-a038-254607cc616c",
//   ];

//   const imagesSecond = [
//     "https://github.com/user-attachments/assets/67dd52cc-18e1-4def-b8d4-30fc3a4b271e",
//     "https://github.com/user-attachments/assets/3e64e8b7-fbc0-452b-9068-6955d5a4802a",
//     "https://github.com/user-attachments/assets/4cb4b5bf-d5b7-4f9f-a42b-e21c35398c71",
//     "https://github.com/user-attachments/assets/633fa130-35c0-4381-8785-d060474c39f9",
//     "https://github.com/user-attachments/assets/4bbea010-9610-4ac3-ac98-ae9bed4b854a",
//   ];

//   const imagesThird = [
//     "https://github.com/user-attachments/assets/739e40d4-5002-4f26-8e04-b614ae621a67",
//     "https://github.com/user-attachments/assets/d64c04ba-8429-439b-ae19-fe38a6e69622",
//     "https://picsum.photos/200?random=11",
//     "https://picsum.photos/200?random=12",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlideFirst((prev) => (prev + 1) % imagesFirst.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [imagesFirst.length]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlideSecond((prev) => (prev + 1) % imagesSecond.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [imagesSecond.length]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlideThird((prev) => (prev + 1) % imagesThird.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [imagesThird.length]);

//   return (
//     <div className="bg-white py-16 px-6">
//       <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-10">
//         MY PROJECT
//         <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
//       </h2>
//       <br />
//       {/* First Section */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0">
//         <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col justify-between flex-1 lg:flex-[0.3]">
//           <div>
//             <h2 className="text-3xl font-bold text-center text-gray-800">
//               CraveMate
//               <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
//             </h2>
//             <br />
//             <div className="flex gap-2 mb-4">
//               <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
//                 React
//               </span>
//               <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                 SpringBoot
//               </span>
//               <span className="bg-red-200 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
//                 MongoDb
//               </span>
//               <span className="bg-pink-200 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
//                 Tailwind Css
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//               Food Ordering Web App
//             </h3>
//             <p className="text-gray-600 text-lg text-justify">
//               <ul className="list-disc list-inside">
//                 <li>Developed a responsive web app for food ordering with mobile compatibility.</li>
//                 <li>Added advanced search and filter options for better user experience.</li>
//                 <li>Built an inventory system with real-time stock updates to manage item availability.</li>
//               </ul>
//             </p>
//           </div>
//           <a
//             href="#"
//             className="text-blue-500 font-medium mt-6 inline-block hover:underline"
//           >
//             See full case study &rarr;
//           </a>
//           <div className="flex gap-4 mt-4">
//             <a href="https://github.com/your-github-link" target="_blank" rel="noopener noreferrer">
//               <AiOutlineGithub className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//             <a href="https://your-deployed-link.com" target="_blank" rel="noopener noreferrer">
//               <AiOutlineLink className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//           </div>
//         </div>
//         <div className="flex items-center justify-center flex-1 lg:flex-[0.7] relative">
//           <img
//             src={imagesFirst[currentSlideFirst]}
//             alt="First Section Slider"
//             className="rounded-lg shadow-lg w-full h-[500px] object-contain"
//           />
//         </div>
//       </div>

//       {/* Second Section */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 mt-12">
//         <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col justify-between flex-1 lg:flex-[0.3]">
//           <div>
//             <h2 className="text-3xl font-bold text-center text-gray-800">
//               Unishare
//               <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
//             </h2>
//             <br />
//             <div className="flex gap-2 mb-4">
//               <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
//                 MongoDb
//               </span>
//               <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                 ExpressJs
//               </span>
//               <span className="bg-red-200 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
//                 React
//               </span>
//               <span className="bg-pink-200 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
//                 NodeJs
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">
//               Community Sharing Platform  
//             </h3>
//             <p className="text-gray-600 text-lg text-justify">
//               <ul className="list-disc list-inside">
//                 <li>Developed an web app for borrowing, lending, and sharing resources within a college community</li>
//                 <li>Implemented data encryption and validation to ensure user data security.</li>
//                 <li>Designed a user-friendly interface to enhance communication and efficiency</li>
//               </ul>
//             </p>
//           </div>
//           <a
//             href="#"
//             className="text-blue-500 font-medium mt-6 inline-block hover:underline"
//           >
//             Learn more &rarr;
//           </a>
//           <div className="flex gap-4 mt-4">
//             <a href="https://github.com/your-github-link" target="_blank" rel="noopener noreferrer">
//               <AiOutlineGithub className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//             <a href="https://your-deployed-link.com" target="_blank" rel="noopener noreferrer">
//               <AiOutlineLink className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//           </div>
//         </div>
//         <div className="flex items-center justify-center flex-1 lg:flex-[0.7] relative">
//           <img
//             src={imagesSecond[currentSlideSecond]}
//             alt="Second Section Slider"
//             className="rounded-lg shadow-lg w-full h-[500px] object-contain"
//           />
//         </div>
//       </div>

//       {/* Third Section */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 mt-12">
//         <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col justify-between flex-1 lg:flex-[0.3]">
//           <div>
//             <h2 className="text-3xl font-bold text-center text-gray-800">
//               Intervo
//               <span className="block mt-2 w-20 mx-auto h-1 bg-blue-500 rounded"></span>
//             </h2>
//             <br />
//             <div className="flex gap-2 mb-4">
//               <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
//                 MongoDb
//               </span>
//               <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                 ExpressJs
//               </span>
//               <span className="bg-red-200 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
//                 React
//               </span>
//               <span className="bg-pink-200 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
//                 NodeJs
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//               Simplify Hiring Amplify Talent
//             </h3>
//             <p className="text-gray-600 text-lg text-justify">
//               <ul className="list-disc list-inside">
//                 <li>Automated interview management to replace manual processes.</li>
//                 <li>Tracked interview progress and analyzed interviewer performance.</li>
//                 <li>Implemented random question generation and proctoring features</li>
//               </ul>
//             </p>
//           </div>
//           <a
//             href="#"
//             className="text-blue-500 font-medium mt-6 inline-block hover:underline"
//           >
//             Read more &rarr;
//           </a>
//           <div className="flex gap-4 mt-4">
//             <a href="https://github.com/your-github-link" target="_blank" rel="noopener noreferrer">
//               <AiOutlineGithub className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//             <a href="https://your-deployed-link.com" target="_blank" rel="noopener noreferrer">
//               <AiOutlineLink className="text-2xl text-gray-800 hover:text-blue-500" />
//             </a>
//           </div>
//         </div>
//         <div className="flex items-center justify-center flex-1 lg:flex-[0.7] relative">
//           <img
//             src={imagesThird[currentSlideThird]}
//             alt="Third Section Slider"
//             className="rounded-lg shadow-lg w-full h-[500px] object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;




// import React, { useState, useEffect } from "react";
// import { AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// const Portfolio = () => {
//   const [currentSlideFirst, setCurrentSlideFirst] = useState(0);
//   const [currentSlideSecond, setCurrentSlideSecond] = useState(0);
//   const [currentSlideThird, setCurrentSlideThird] = useState(0);

//   const imagesFirst = [
//     "https://github.com/user-attachments/assets/b03a310e-4238-4c11-a038-254607cc616c",
//     "https://github.com/user-attachments/assets/a870cbd5-4e50-4ee9-a0b2-848fe9705752",
//     "https://github.com/user-attachments/assets/686e7bed-5248-418f-8331-af6284a7a8e9",
//     "https://github.com/user-attachments/assets/b32b8a0a-ecc8-417a-9c85-fd894fee42bf",
    
//   ];

//   const imagesSecond = [
//     "https://github.com/user-attachments/assets/67dd52cc-18e1-4def-b8d4-30fc3a4b271e",
//     "https://github.com/user-attachments/assets/3e64e8b7-fbc0-452b-9068-6955d5a4802a",
//     "https://github.com/user-attachments/assets/4cb4b5bf-d5b7-4f9f-a42b-e21c35398c71",
//     "https://github.com/user-attachments/assets/633fa130-35c0-4381-8785-d060474c39f9",
//     "https://github.com/user-attachments/assets/4bbea010-9610-4ac3-ac98-ae9bed4b854a",
//   ];

//   const imagesThird = [
//     "https://github.com/user-attachments/assets/67cf4df6-6fd7-4f29-ac9c-6f15fc95c627",
//     "https://github.com/user-attachments/assets/d64c04ba-8429-439b-ae19-fe38a6e69622",
//     "https://github.com/user-attachments/assets/c1f73f86-803c-4674-b77a-9c92fbc5bd8a",  
//     "https://github.com/user-attachments/assets/d32de42a-4479-46ed-a865-eab11095f7f9",
//     "https://github.com/user-attachments/assets/ac048772-0a42-4e20-92e6-9c72f28da985",
//     "https://github.com/user-attachments/assets/aa053c7e-0f66-4490-b6db-860c189f4f8a",
//     "https://github.com/user-attachments/assets/265c8560-d708-4112-a9e1-f993b91fb9dc",
//     "https://github.com/user-attachments/assets/ad47cd8d-7d2c-43d2-bfb2-6eeeb605634f",
    
//   ];

//   const handleSlideChange = (direction, currentSlide, setCurrentSlide, maxLength) => {
//     if (direction === 'next') {
//       setCurrentSlide((prev) => (prev + 1) % maxLength);
//     } else {
//       setCurrentSlide((prev) => (prev - 1 + maxLength) % maxLength);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlideFirst((prev) => (prev + 1) % imagesFirst.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [imagesFirst.length]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlideSecond((prev) => (prev + 1) % imagesSecond.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [imagesSecond.length]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlideThird((prev) => (prev + 1) % imagesThird.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [imagesThird.length]);

//   const ProjectSection = ({ 
//     title, 
//     description, 
//     technologies, 
//     images, 
//     currentSlide, 
//     setCurrentSlide, 
//     caseStudyText 
//   }) => (
//     <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 mt-16 px-4 group">
//       <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between w-full lg:w-1/3 border border-gray-100 hover:border-blue-200 transition-all duration-300">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
//             {title}
//             <span className="block mt-2 w-24 h-1 bg-blue-500 rounded group-hover:w-32 transition-all duration-300"></span>
//           </h2>
//           <div className="flex flex-wrap gap-2 my-6">
//             {technologies.map((tech, index) => (
//               <span
//                 key={index}
//                 className="bg-blue-50 text-blue-600 text-xs md:text-sm font-medium px-4 py-1.5 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//           <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">
//             {description}
//           </h3>
//           <ul className="space-y-4 text-gray-600 text-base md:text-lg">
//             {caseStudyText.map((text, index) => (
//               <li key={index} className="flex items-start">
//                 <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//                 {text}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="mt-8 space-y-4">
//           <a href="#" className="inline-flex items-center gap-2 text-blue-500 font-medium hover:gap-3 transition-all duration-300 group/link">
//             See case study <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
//           </a>
//           <div className="flex gap-4 pt-2">
//             <a 
//               href="https://github.com/your-github-link" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
//             >
//               <AiOutlineGithub className="text-2xl text-gray-700 hover:text-blue-500 transition-colors duration-200" />
//             </a>
//             <a 
//               href="https://your-deployed-link.com" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
//             >
//               <AiOutlineLink className="text-2xl text-gray-700 hover:text-blue-500 transition-colors duration-200" />
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="w-full lg:w-2/3 relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] group">
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
//           <div className="relative w-full h-full">
//             <img
//               src={images[currentSlide]}
//               alt={`${title} Slider`}
//               className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-500"
//             />
            
//             {/* Navigation Arrows */}
//             <button 
//               onClick={() => handleSlideChange('prev', currentSlide, setCurrentSlide, images.length)}
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-700" />
//             </button>
//             <button 
//               onClick={() => handleSlideChange('next', currentSlide, setCurrentSlide, images.length)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-700" />
//             </button>

//             {/* Slide Indicators */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//               {images.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     currentSlide === index ? 'bg-blue-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
//                   }`}
//                   onClick={() => setCurrentSlide(index)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-50/50 py-12 md:py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
//           My Projects
//           <span className="block mt-4 w-24 mx-auto h-1.5 bg-blue-500 rounded-full"></span>
//         </h2>
//         <p className="text-gray-600 text-center mt-6 text-lg max-w-2xl mx-auto">
//           Explore my latest work and projects that showcase my skills in web development and design.
//         </p>
//       </div>


//       <ProjectSection
//         title="Unishare"
//         description="Community Sharing Platform"
//         technologies={["MongoDb", "ExpressJs", "React", "NodeJs"]}
//         images={imagesSecond}
//         currentSlide={currentSlideSecond}
//         setCurrentSlide={setCurrentSlideSecond}
//         caseStudyText={[
//           "Developed an web app for borrowing, lending, and sharing resources within a college community",
//           "Implemented data encryption and validation to ensure user data security.",
//           "Designed a user-friendly interface to enhance communication and efficiency"
//         ]}
//       />


//       <ProjectSection
//         title="CraveMate"
//         description="Food Ordering Web App"
//         technologies={["React", "SpringBoot", "MongoDb", "Tailwind CSS"]}
//         images={imagesFirst}
//         currentSlide={currentSlideFirst}
//         setCurrentSlide={setCurrentSlideFirst}
//         caseStudyText={[
//           "Developed a responsive web app for food ordering with mobile compatibility.",
//           "Added advanced search and filter options for better user experience.",
//           "Built an inventory system with real-time stock updates to manage item availability."
//         ]}
//       />

      

//       <ProjectSection
//         title="Intervo"
//         description="Simplify Hiring Amplify Talent"
//         technologies={["MongoDb", "ExpressJs", "React", "NodeJs","Python","Flask"]}
//         images={imagesThird}
//         currentSlide={currentSlideThird}
//         setCurrentSlide={setCurrentSlideThird}
//         caseStudyText={[
//           "Automated interview management to replace manual processes.",
//           "Tracked interview progress and analyzed interviewer performance.",
//           "Implemented random question generation and proctoring features"
//         ]}
//       />
//     </div>
//   );
// };

// export default Portfolio;


import React, { useState, useEffect } from "react";
import { AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const Portfolio = () => {
  const [currentSlideFirst, setCurrentSlideFirst] = useState(0);
  const [currentSlideSecond, setCurrentSlideSecond] = useState(0);
  const [currentSlideThird, setCurrentSlideThird] = useState(0);

  const imagesFirst = [
    "https://github.com/user-attachments/assets/b03a310e-4238-4c11-a038-254607cc616c",
    "https://github.com/user-attachments/assets/a870cbd5-4e50-4ee9-a0b2-848fe9705752",
    "https://github.com/user-attachments/assets/686e7bed-5248-418f-8331-af6284a7a8e9",
    "https://github.com/user-attachments/assets/b32b8a0a-ecc8-417a-9c85-fd894fee42bf",
  ];

  const imagesSecond = [
    "https://github.com/user-attachments/assets/67dd52cc-18e1-4def-b8d4-30fc3a4b271e",
    "https://github.com/user-attachments/assets/3e64e8b7-fbc0-452b-9068-6955d5a4802a",
    "https://github.com/user-attachments/assets/4cb4b5bf-d5b7-4f9f-a42b-e21c35398c71",
    "https://github.com/user-attachments/assets/633fa130-35c0-4381-8785-d060474c39f9",
    "https://github.com/user-attachments/assets/4bbea010-9610-4ac3-ac98-ae9bed4b854a",
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
          <a
            href="#"
            className="inline-flex items-center gap-2 text-blue-500 font-medium hover:gap-3 transition-all duration-300 group/link"
          >
            See case study{" "}
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
          </a>
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
        technologies={["MongoDb", "ExpressJs", "React", "NodeJs"]}
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
    </div>
  );
};

export default Portfolio;

