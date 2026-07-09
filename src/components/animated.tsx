// "use client";

// import React, { useState } from "react";
// import Image from "next/image";

// // Using explicit relative pathing to resolve correctly inside your src structure
// import herostill from "../images/hero1.png";
// import herohover from "../images/hero.png";

// export default function Animated() {
//   const [isHovered, setIsHovered] = useState(false);

//   const containerStyle: React.CSSProperties = {
//     position: "relative",
//     width: "100%",
//     maxWidth: 440,
//     aspectRatio: "9/16",
//     overflow: "hidden",
//     maskImage: "linear-gradient(to top, transparent 0%, black 20%)",
//     WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 20%)",
//   };

//   const baseImageStyle: React.CSSProperties = {
//     objectFit: "cover",
//     objectPosition: "top center",
//     padding: "1rem 1rem 0px",
//     transition:
//       "filter 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
//   };

//   return (
//     <div
//       className="reveal"
//       data-hover
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={containerStyle}
//     >
//       {/* Still/Default Image (Grayscale base) */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           transform: isHovered ? "scale(1.05)" : "scale(1)",
//           filter: isHovered ? "grayscale(0%)" : "grayscale(15%)",
//           transition:
//             "filter 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
//         }}
//       >
//         <Image
//           src={herostill}
//           alt="Muskan - Brand Strategist"
//           fill
//           priority
//           style={baseImageStyle}
//         />
//       </div>

//       {/* Hover Image Layer (Smooth Opacity Fade-In) */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           opacity: isHovered ? 1 : 0,
//           transform: isHovered ? "scale(1.05)" : "scale(1)",
//           transition:
//             "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
//         }}
//       >
//         <Image
//           src={herohover}
//           alt="Muskan - Brand Strategist Active"
//           fill
//           style={baseImageStyle}
//         />
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Image from "next/image";

import herostill from "../images/hero1.png";
import herohover from "../images/hero.png";

export default function Animated() {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "100%",
    aspectRatio: "315 / 603", // actual ratio of hero.png
    overflow: "hidden",
    padding: "1rem 1rem 0",
    boxSizing: "border-box",
    maskImage: "linear-gradient(to top, transparent 0%, black 20%)",
    WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 20%)",
  };

  const imageStyle: React.CSSProperties = {
    objectFit: "contain",
    objectPosition: "bottom center",
  };

  return (
    <div
      className="reveal"
      data-hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={containerStyle}
    >
      {/* Default Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? "scale(1)" : "scale(0.97)",
          filter: isHovered ? "grayscale(0%)" : "grayscale(15%)",
          transformOrigin: "bottom center",
          transition:
            "opacity .85s ease, filter .85s ease, transform .85s ease",
        }}
      >
        <Image src={herostill} alt="Muskan" fill priority style={imageStyle} />
      </div>

      {/* Hover Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "scale(1)" : "scale(0.97)",
          transformOrigin: "bottom center",
          transition: "opacity .85s ease, transform .85s ease",
        }}
      >
        <Image src={herohover} alt="Muskan Active" fill style={imageStyle} />
      </div>
    </div>
  );
}
