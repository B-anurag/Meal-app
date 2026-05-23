import React from 'react';
import { ChevronRight, ShoppingCart, Info } from 'lucide-react';
import BottleDisplay from '../components/BottleDisplay';
import Reviews from '../components/Reviews';
import { motion } from 'framer-motion';

export default function Home({
  activeFlavorKey,
  setActiveFlavorKey,
  activeFlavor,
  FLAVOR_KEYS,
  FLAVOR_DATA,
  handleNextFlavor,
  handleAddToCart,
  isCartAnimating,
  setIsDrawerOpen
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 relative z-10 px-6 md:px-12 pb-12"
    >
      {/* Left Side Content (7 Columns) */}
      <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pr-0 lg:pr-8 py-8 lg:py-0">
        
        {/* Animated Flavor Badges */}
        <div className="flex flex-wrap gap-2.5 items-center">
          {FLAVOR_KEYS.map((key) => {
            const f = FLAVOR_DATA[key];
            const isSelected = key === activeFlavorKey;
            return (
              <button
                key={key}
                onClick={() => setActiveFlavorKey(key)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 border flex items-center gap-1.5 cursor-pointer ${
                  isSelected 
                    ? 'shadow-sm translate-y-[-2px]' 
                    : 'bg-white/40 border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-white/60'
                }`}
                style={isSelected ? { 
                  backgroundColor: `${f.colors.bgRight}25`,
                  borderColor: f.colors.bgRight,
                  color: f.colors.accentText
                } : {}}
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full block border border-black/10" 
                  style={{ backgroundColor: f.colors.bottle }}
                />
                {f.name.split(' ')[1] || f.name}
              </button>
            );
          })}
        </div>

        {/* Heading with layout animation */}
        <div className="space-y-3">
          <motion.div
            key={activeFlavorKey}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.08] font-sans">
              {activeFlavor.titleLine1}<br />
              {activeFlavor.titleLine2}
            </h1>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tight font-serif transition-colors duration-500"
              style={{ color: activeFlavor.colors.accentText }}
            >
              {activeFlavor.titleHighlight}
            </h2>
          </motion.div>
        </div>

        {/* Description Text */}
        <motion.p
          key={activeFlavorKey}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-stone-600 leading-relaxed text-sm md:text-base max-w-xl"
        >
          {activeFlavor.description}
        </motion.p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Order Now Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className="px-8 py-4 rounded-full font-bold text-white text-sm tracking-wider uppercase shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer"
            style={{ backgroundColor: activeFlavor.colors.accentText }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Order Now <ShoppingCart size={16} />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>

          {/* Learn More Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsDrawerOpen(true)}
            className="px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase border-2 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            style={{ 
              borderColor: activeFlavor.colors.accentText,
              color: activeFlavor.colors.accentText,
              backgroundColor: 'rgba(255, 255, 255, 0.4)'
            }}
          >
            Learn More <Info size={16} />
          </motion.button>
        </div>

        {/* Reviews Rating Social Proof */}
        <div className="pt-4 border-t border-stone-200/50">
          <Reviews />
        </div>

      </div>

      {/* Right Side Visual Product Column (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[450px] lg:min-h-0 select-none">
        
        {/* CURVED BACKGROUND SHAPE */}
        <div className="absolute inset-0 overflow-hidden rounded-[40px] -z-10 shadow-inner">
          <motion.div 
            className="absolute inset-0 transition-theme"
            style={{ backgroundColor: activeFlavor.colors.bgRight }}
          />
          <motion.div 
            className="absolute -left-20 -bottom-20 w-[400px] h-[400px] rounded-full bg-white/10 blur-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute -right-20 -top-20 w-[350px] h-[350px] rounded-full bg-black/5 blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* BACKGROUND TEXT: GIANT VERTICAL ROTATED OUTLINE TEXT */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none h-full flex items-center overflow-hidden w-28">
          <motion.div
            key={activeFlavorKey}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.15, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.7 }}
            className="text-outline uppercase font-serif font-black tracking-widest text-6xl leading-none select-none text-right"
            style={{ 
              color: activeFlavor.colors.accentText,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed'
            }}
          >
            {activeFlavor.verticalText}
          </motion.div>
        </div>

        {/* GLASS BADGE OVERLAY: PRODUCT NAME */}
        <div className="absolute left-6 top-1/3 py-8 px-3 rounded-full bg-white/30 backdrop-blur-md shadow-lg border border-white/20 flex items-center justify-center select-none z-20">
          <motion.div
            key={activeFlavorKey}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
          >
            <span className="font-bold text-sm tracking-widest uppercase" style={{ color: activeFlavor.colors.accentText }}>
              {activeFlavor.name}
            </span>
          </motion.div>
        </div>

        {/* ACTIVE FLAVOR BOTTLE DISPLAY WITH MOTION */}
        <div className="relative z-10 w-full flex items-center justify-center p-4">
          <motion.div
            key={activeFlavorKey}
            initial={{ opacity: 0, x: -100, rotate: -25, scale: 0.85 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              rotate: 0, 
              scale: 1,
              transition: { 
                type: 'spring', 
                stiffness: 140, 
                damping: 18, 
                mass: 0.8 
              }
            }}
            exit={{ 
              opacity: 0, 
              x: 100, 
              rotate: 25, 
              scale: 0.85,
              transition: { duration: 0.4 } 
                }}
                className="w-full flex justify-center"
              >
                <BottleDisplay 
                  activeFlavor={activeFlavorKey}
                  bottleColor={activeFlavor.colors.bottle}
                  labelBgColor={activeFlavor.colors.labelBg}
                  isCartAnimating={isCartAnimating}
                  onBottleClick={handleAddToCart}
                />
              </motion.div>
            </div>

            {/* NEXT FLAVOR NAVIGATION CIRCLE */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextFlavor}
              className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white/95 text-stone-800 shadow-xl border border-stone-150 flex items-center justify-center cursor-pointer group z-25"
            >
              <div className="absolute inset-[-4px] rounded-full border-2 border-white/40 pulse-ring -z-10 pointer-events-none" />
              
              <ChevronRight 
                size={24} 
                className="group-hover:translate-x-0.5 transition-transform duration-300"
                style={{ color: activeFlavor.colors.accentText }}
              />
            </motion.button>

          </div>

        </motion.div>
  );
}
