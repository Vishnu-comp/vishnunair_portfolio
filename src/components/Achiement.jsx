// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export const Achievement = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const certificateImages = [
//     "https://github.com/user-attachments/assets/7086f200-ad9b-497b-b743-ee89530c4073",
//     "https://github.com/user-attachments/assets/86af0e7f-e523-46af-b015-160ca3b53fd3",
//     "https://github.com/user-attachments/assets/684167b4-9ae6-4a8b-a33f-772498e0436c",
//     "https://github.com/user-attachments/assets/39ec5380-e78f-4007-9c48-62113d01ded1",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % certificateImages.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [certificateImages.length]);

//   const goToPrevious = () => {
//     setCurrentSlide((prev) => (prev - 1 + certificateImages.length) % certificateImages.length);
//   };

//   const goToNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % certificateImages.length);
//   };

//   return (
//     <div className="bg-blue-50 py-16 md:py-24">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
//           My Achievements
//           <span className="block mt-4 w-24 mx-auto h-1.5 bg-blue-500 rounded-full"></span>
//         </h2>
//         <p className="text-gray-600 text-center mt-6 text-lg max-w-2xl mx-auto">
//           Certifications and recognition that showcase my expertise and continuous learning journey.
//         </p>

//         <div className="mt-12 relative group">
//           {/* Main Image Container */}
//           <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[600px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//             <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
//               <img
//                 src={certificateImages[currentSlide]}
//                 alt={`Certificate ${currentSlide + 1}`}
//                 className="max-w-full max-h-full object-contain transition-opacity duration-500"
//               />
//             </div>

//             {/* Navigation Arrows */}
//             <button
//               onClick={goToPrevious}
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-700" />
//             </button>
//             <button
//               onClick={goToNext}
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-700" />
//             </button>

//             {/* Progress Indicators */}
//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//               {certificateImages.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`transition-all duration-300 rounded-full ${
//                     currentSlide === index 
//                       ? 'w-8 h-2 bg-blue-500' 
//                       : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Certificate Counter */}
//           <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
//             {currentSlide + 1} / {certificateImages.length}
//           </div>
//         </div>

//         {/* Thumbnails */}
//         {/* <div className="mt-6 flex justify-center gap-4 overflow-x-auto py-4">
//           {certificateImages.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`relative flex-shrink-0 transition-transform duration-300 ${
//                 currentSlide === index ? 'scale-105 ring-2 ring-blue-500' : 'hover:scale-105'
//               }`}
//             >
//               <img
//                 src={image}
//                 alt={`Certificate Thumbnail ${index + 1}`}
//                 className="w-20 h-20 object-cover rounded-lg"
//               />
//               <div className={`absolute inset-0 rounded-lg ${
//                 currentSlide === index ? 'bg-black/0' : 'bg-black/40 hover:bg-black/20'
//               } transition-colors duration-300`} />
//             </button>
//           ))}
//         </div> */}
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Achievement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const certificateImages = [
    "https://github.com/user-attachments/assets/7086f200-ad9b-497b-b743-ee89530c4073",
    "https://github.com/user-attachments/assets/86af0e7f-e523-46af-b015-160ca3b53fd3",
    "https://github.com/user-attachments/assets/684167b4-9ae6-4a8b-a33f-772498e0436c",
    "https://github.com/user-attachments/assets/39ec5380-e78f-4007-9c48-62113d01ded1",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % certificateImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + certificateImages.length) % certificateImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % certificateImages.length);
  };

  return (
    <div className="bg-blue-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
          My Achievements
          <span className="block mt-4 w-24 mx-auto h-1.5 bg-blue-500 rounded-full"></span>
        </h2>
        <p className="text-gray-600 text-center mt-6 text-lg max-w-2xl mx-auto">
          Certifications and recognition that showcase my expertise and continuous learning journey.
        </p>

        <div className="mt-12 relative group">
          {/* Main Image Container */}
          <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[600px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <img
                src={certificateImages[currentSlide]}
                onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
                alt={`Certificate ${currentSlide + 1}`}
                className="max-w-full max-h-full object-contain transition-opacity duration-500"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              aria-label="Previous Certificate"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next Certificate"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Progress Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {certificateImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to certificate ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-8 h-2 bg-blue-500"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Certificate Counter */}
          <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
            {currentSlide + 1} / {certificateImages.length}
          </div>
        </div>
      </div>
    </div>
  );
};
