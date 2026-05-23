import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// SVG Artwork for each flavor label
const LabelArtwork = ({ flavor }) => {
  switch (flavor) {
    case 'hazelnut':
      return (
        <g opacity="0.85">
          {/* Leaves */}
          <path d="M60 70 Q45 50 65 30 Q85 50 70 70 Z" fill="#3A4D39" />
          <path d="M65 75 Q80 60 90 80 Q75 95 65 75 Z" fill="#4F6F52" />
          {/* Nuts */}
          <circle cx="55" cy="80" r="14" fill="#8F8070" />
          <path d="M41 80 A14 14 0 0 0 69 80 Z" fill="#AC9C8D" />
          <circle cx="75" cy="90" r="12" fill="#7A6B5D" />
          <path d="M63 90 A12 12 0 0 0 87 90 Z" fill="#9C8C7D" />
          {/* Branch stem */}
          <path d="M40 40 Q60 55 65 75" stroke="#3A4D39" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      );
    case 'berry':
      return (
        <g opacity="0.85">
          {/* Berry 1 (Strawberry shape) */}
          <path d="M45 45 C45 30 75 30 75 45 C75 60 60 75 60 75 C60 75 45 60 45 45 Z" fill="#A21232" />
          {/* Leaf Cap */}
          <path d="M52 38 Q60 43 68 38 Q60 32 52 38" fill="#3E8E41" />
          <circle cx="58" cy="48" r="1" fill="#FFB3B3" />
          <circle cx="64" cy="52" r="1" fill="#FFB3B3" />
          <circle cx="52" cy="55" r="1" fill="#FFB3B3" />
          <circle cx="68" cy="46" r="1" fill="#FFB3B3" />
          
          {/* Berry 2 (Blueberry) */}
          <circle cx="80" cy="75" r="14" fill="#2E4F4F" />
          <circle cx="80" cy="75" r="12" fill="#0E2F2F" />
          {/* Blueberry crown */}
          <path d="M74 67 L80 71 L86 67 L83 75 L77 75 Z" fill="#2E4F4F" opacity="0.8" />

          {/* Swirly Vine */}
          <path d="M35 80 Q50 60 45 40 Q40 20 60 25" stroke="#3E8E41" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      );
    case 'chocolate':
      return (
        <g opacity="0.85">
          {/* Cacao Pod */}
          <path d="M40 70 C30 50 45 25 65 30 C85 35 90 60 75 85 C60 110 50 90 40 70 Z" fill="#3E2723" />
          {/* Cacao Highlights */}
          <path d="M46 65 C40 53 50 37 62 38" stroke="#D7CCC8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          
          {/* Drips / Cream Waves */}
          <path d="M30 40 C50 40 50 55 70 55 C90 55 90 40 110 40 L110 110 L30 110 Z" fill="#5D4037" opacity="0.4" />
          <path d="M30 50 C45 50 50 65 65 65 C80 65 85 50 110 50 L110 110 L30 110 Z" fill="#3E2723" opacity="0.6" />
          <path d="M30 65 C40 65 45 75 55 75 C65 75 70 65 110 65 L110 110 L30 110 Z" fill="#27120F" />
        </g>
      );
    case 'vanilla':
      return (
        <g opacity="0.85">
          {/* Orchid Petals */}
          <path d="M60 60 C40 40 40 20 60 30 C80 20 80 40 60 60 Z" fill="#FDF6EC" stroke="#E6C594" strokeWidth="1" />
          <path d="M60 60 C35 60 20 70 40 80 C60 90 55 70 60 60 Z" fill="#FDF6EC" stroke="#E6C594" strokeWidth="1" />
          <path d="M60 60 C85 60 100 70 80 80 C60 90 65 70 60 60 Z" fill="#FDF6EC" stroke="#E6C594" strokeWidth="1" />
          <path d="M60 60 C50 80 40 100 60 95 C80 100 70 80 60 60 Z" fill="#FAF0DD" stroke="#E6C594" strokeWidth="1" />
          
          {/* Pistils / Center */}
          <circle cx="60" cy="60" r="5" fill="#E6A23C" />
          <circle cx="60" cy="60" r="2" fill="#C27D13" />

          {/* Vanilla Pod / Stick */}
          <path d="M35 90 C60 60 80 50 95 30" stroke="#4A3B32" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M38 92 C62 62 82 52 97 32" stroke="#6D5C50" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      );
    default:
      return null;
  }
};

export default function BottleDisplay({ activeFlavor, bottleColor, labelBgColor, isCartAnimating, onBottleClick }) {
  const containerRef = useRef(null);

  // Parallax Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth fluid 3D tilt
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });

  // Shift highlights and reflections inside the SVG dynamically during tilt
  const highlightX = useTransform(mouseX, [-0.5, 0.5], [10, -10]);
  const highlightY = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const shadowTranslateX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const yVal = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onBottleClick}
      className="relative flex items-center justify-center cursor-pointer w-full max-w-[450px] aspect-[3/4] preserve-3d"
      style={{ perspective: 1000 }}
    >
      {/* Dynamic Floor Shadow */}
      <motion.div 
        className="absolute bottom-4 left-1/2 w-48 h-8 bg-black/15 blur-xl rounded-full -translate-x-1/2"
        style={{ x: shadowTranslateX, scale: useTransform(mouseY, [-0.5, 0.5], [0.9, 1.1]) }}
      />

      {/* Main 3D Tilting Card */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
        animate={isCartAnimating ? {
          scale: [1, 0.85, 0.2, 0.2, 1],
          y: [0, 50, -450, -450, 0],
          x: [0, 20, 250, 250, 0],
          rotate: [0, -10, -45, -45, 0],
          opacity: [1, 1, 0, 0, 1],
          transition: { duration: 1.2, ease: [0.6, -0.28, 0.735, 0.045] }
        } : { scale: 1, y: 0, x: 0, rotate: 0, opacity: 1 }}
        className="relative w-full h-full flex items-center justify-center active:scale-95 transition-transform duration-200"
      >
        {/* SVG Bottle Illustration */}
        <svg 
          viewBox="0 0 300 600" 
          className="w-full h-full drop-shadow-2xl overflow-visible animate-float"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <defs>
            {/* Cylindrical Gradient for Bottle Body */}
            <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={bottleColor} />
              <stop offset="25%" stopColor={lightenDarkenColor(bottleColor, 20)} />
              <stop offset="50%" stopColor={lightenDarkenColor(bottleColor, 40)} />
              <stop offset="75%" stopColor={bottleColor} />
              <stop offset="100%" stopColor={lightenDarkenColor(bottleColor, -25)} />
            </linearGradient>

            {/* Reflection Overlay */}
            <linearGradient id="reflectGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="10%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* BOTTLE BODY PATH */}
          <motion.path 
            d="M 105,140 L 195,140 C 195,170 240,180 240,220 L 240,490 C 240,515 220,530 190,530 L 110,530 C 80,530 60,515 60,490 L 60,220 C 60,180 105,170 105,140 Z" 
            fill="url(#bottleGrad)"
            transition={{ duration: 0.8 }}
          />

          {/* BOTTLE LABEL */}
          <g transform="translate(0, 0)">
            {/* Label Background */}
            <motion.rect 
              x="90" 
              y="235" 
              width="120" 
              height="180" 
              rx="12" 
              fill={labelBgColor}
              transition={{ duration: 0.8 }}
              className="drop-shadow-md"
            />
            
            {/* Label Content: Micro illustration */}
            <g transform="translate(90, 240)">
              <LabelArtwork flavor={activeFlavor} />
            </g>

            {/* Three nutritional squares at the bottom of the label */}
            <g transform="translate(115, 385)">
              <motion.rect x="0" y="0" width="16" height="16" rx="3" fill="#ffffff" opacity="0.9" className="drop-shadow-sm" />
              <motion.rect x="27" y="0" width="16" height="16" rx="3" fill="#ffffff" opacity="0.9" className="drop-shadow-sm" />
              <motion.rect x="54" y="0" width="16" height="16" rx="3" fill="#ffffff" opacity="0.9" className="drop-shadow-sm" />
            </g>
          </g>

          {/* BOTTLE NECK COLLAR */}
          <motion.path 
            d="M 102,140 L 198,140 L 195,152 L 105,152 Z" 
            fill={lightenDarkenColor(bottleColor, -15)} 
          />

          {/* WHITE SCREW CAP */}
          <path 
            d="M 100,135 H 200 V 90 C 200,80 190,75 170,75 H 130 C 110,75 100,80 100,90 Z" 
            fill="#F6F6F6" 
            className="drop-shadow-sm"
          />
          {/* Cap Shadows / Ribs */}
          <g opacity="0.12">
            <rect x="105" y="80" width="4" height="52" rx="2" fill="#000000" />
            <rect x="113" y="78" width="4" height="54" rx="2" fill="#000000" />
            <rect x="121" y="77" width="4" height="55" rx="2" fill="#000000" />
            <rect x="129" y="76" width="4" height="56" rx="2" fill="#000000" />
            <rect x="137" y="75" width="4" height="57" rx="2" fill="#000000" />
            <rect x="145" y="75" width="4" height="57" rx="2" fill="#000000" />
            <rect x="153" y="75" width="4" height="57" rx="2" fill="#000000" />
            <rect x="161" y="76" width="4" height="56" rx="2" fill="#000000" />
            <rect x="169" y="77" width="4" height="55" rx="2" fill="#000000" />
            <rect x="177" y="78" width="4" height="54" rx="2" fill="#000000" />
            <rect x="185" y="80" width="4" height="52" rx="2" fill="#000000" />
            <rect x="193" y="84" width="4" height="48" rx="2" fill="#000000" />
          </g>
          {/* Cap highlight curve */}
          <path d="M 100,90 Q 150,98 200,90" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.7" />

          {/* DYNAMIC SHADING & SPECULAR REFLECTION OVERLAY */}
          <motion.path 
            d="M 105,140 L 195,140 C 195,170 240,180 240,220 L 240,490 C 240,515 220,530 190,530 L 110,530 C 80,530 60,515 60,490 L 60,220 C 60,180 105,170 105,140 Z" 
            fill="url(#reflectGrad)"
            style={{ x: highlightX, y: highlightY }}
            pointerEvents="none"
          />

          {/* Subtle Outer Bottle Glow Rim */}
          <motion.path 
            d="M 105,140 L 195,140 C 195,170 240,180 240,220 L 240,490 C 240,515 220,530 190,530 L 110,530 C 80,530 60,515 60,490 L 60,220 C 60,180 105,170 105,140 Z" 
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            opacity="0.3"
            pointerEvents="none"
          />
        </svg>

        {/* Hover Cue */}
        <div className="absolute inset-0 bg-radial from-transparent to-black/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
      </motion.div>
    </div>
  );
}

// Utility function to lighten/darken color code dynamically for gradients
function lightenDarkenColor(col, amt) {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}
