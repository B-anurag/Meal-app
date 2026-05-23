import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Reviews() {
  const [reviewCount, setReviewCount] = useState(4820);

  // Animate count-up on load
  useEffect(() => {
    let start = 4820;
    const end = 5240;
    const duration = 2000; // ms
    const incrementTime = Math.floor(duration / (end - start));
    
    const timer = setInterval(() => {
      start += 3;
      if (start >= end) {
        setReviewCount(end);
        clearInterval(timer);
      } else {
        setReviewCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, []);

  const avatars = [
    { name: "John D.", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80" },
    { name: "Sarah K.", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80" },
    { name: "Alex M.", src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&fit=crop&q=80" }
  ];

  return (
    <div className="flex items-center gap-4 py-2">
      {/* Avatars group with staggered load and hover pop effects */}
      <div className="flex -space-x-3.5">
        {avatars.map((avatar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.5, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 260, 
              damping: 20, 
              delay: idx * 0.15 
            }}
            whileHover={{ 
              scale: 1.15, 
              zIndex: 10,
              marginRight: "4px"
            }}
            className="w-10 h-10 rounded-full border-2 border-stone-50 overflow-hidden shadow-sm cursor-pointer transition-all duration-200"
          >
            <img 
              src={avatar.src} 
              alt={avatar.name} 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        ))}
      </div>

      {/* Review details & Count-up text */}
      <div className="flex flex-col items-start">
        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-0.5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, type: 'spring' }}
            >
              <Star size={14} className="fill-amber-400 stroke-amber-400" />
            </motion.div>
          ))}
        </div>
        
        {/* Counter Text */}
        <p className="text-xs text-stone-500 font-semibold leading-none">
          <span className="text-stone-850 font-extrabold">{reviewCount.toLocaleString()}+</span> Reviews
          <span className="text-[10px] text-stone-400 font-normal ml-1">Customers Are Satisfied</span>
        </p>
      </div>
    </div>
  );
}
