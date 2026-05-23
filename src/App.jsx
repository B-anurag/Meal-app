import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles, ChevronRight, ShoppingCart, Info } from 'lucide-react';
import Navbar from './components/Navbar';
import BottleDisplay from './components/BottleDisplay';
import NutritionDrawer from './components/NutritionDrawer';
import Reviews from './components/Reviews';

const FLAVOR_DATA = {
  hazelnut: {
    id: 'hazelnut',
    name: 'Heavenly Hazelnut',
    titleLine1: 'Life Moves Fast.',
    titleLine2: 'Your Meal Should Too.',
    titleHighlight: 'Choose Go Meal.',
    description: "GoMeal is modern nutrition for your fast-paced life — a delicious, simple, and balanced drink that's a complete meal, packed with essential nutrients to keep you energized and full longer. Perfect for those moments when you need real food, real quick.",
    tagline: 'Life Moves Fast. Your Meal Should Too.',
    boldWord: 'Choose Go Meal.',
    verticalText: 'Heavenly hazelnut',
    colors: {
      bottle: '#76A035',
      labelBg: '#E2F0D9',
      accentText: '#3A4D39',
      bgLeft: '#FAF9F6',
      bgRight: '#A0C49D',
      buttonHover: '#2E3D2E'
    }
  },
  berry: {
    id: 'berry',
    name: 'Wild Berry Rush',
    titleLine1: 'Vibrant Energy.',
    titleLine2: 'Pure Plant Power.',
    titleHighlight: 'Feel the Rush.',
    description: "GoMeal Wild Berry Rush delivers a vibrant burst of real strawberry, raspberry, and blueberry extracts. Packed with natural antioxidants, fiber, and 26 essential vitamins to fuel your active days with pure berry energy.",
    tagline: 'Vibrant Energy. Pure Antioxidants.',
    boldWord: 'Feel the Rush.',
    verticalText: 'Wild berry rush',
    colors: {
      bottle: '#D63465',
      labelBg: '#FCE4EC',
      accentText: '#5C0632',
      bgLeft: '#FAF8F8',
      bgRight: '#FF8E9E',
      buttonHover: '#4A0427'
    }
  },
  chocolate: {
    id: 'chocolate',
    name: 'Rich Cacao Delight',
    titleLine1: 'Velvet Smooth.',
    titleLine2: 'Indulgent Energy.',
    titleHighlight: 'Satisfy Cravings.',
    description: "Indulge in the velvet-smooth taste of premium dark chocolate. Rich Cacao Delight is the perfect blend of rich cocoa, plant-based proteins, and healthy fats, satisfying your chocolate cravings while feeding your muscles.",
    tagline: 'Velvet Smooth. Indulgently Healthy.',
    boldWord: 'Satisfy Cravings.',
    verticalText: 'Rich cacao delight',
    colors: {
      bottle: '#6D4C41',
      labelBg: '#EFEBE9',
      accentText: '#3E2723',
      bgLeft: '#FAF9F5',
      bgRight: '#C58940',
      buttonHover: '#2E1A16'
    }
  },
  vanilla: {
    id: 'vanilla',
    name: 'Golden Vanilla',
    titleLine1: 'Creamy Perfection.',
    titleLine2: 'Pure Daily Fuel.',
    titleHighlight: 'Pure & Clean.',
    description: "A creamy, smooth, and aromatic classic. Made with real vanilla bean extract, Golden Vanilla offers a subtle, sweet, and comforting taste that delivers a clean and complete nutritional profile, anytime and anywhere.",
    tagline: 'Creamy Perfection. Pure Nutrition.',
    boldWord: 'Pure & Clean.',
    verticalText: 'Golden vanilla classic',
    colors: {
      bottle: '#E8C858',
      labelBg: '#FFFDE7',
      accentText: '#78350F',
      bgLeft: '#FAF9F4',
      bgRight: '#F9D949',
      buttonHover: '#5C280B'
    }
  }
};

const FLAVOR_KEYS = Object.keys(FLAVOR_DATA);

export default function App() {
  const [activeFlavorKey, setActiveFlavorKey] = useState('hazelnut');
  const [cartCount, setCartCount] = useState(0);
  const [isCartWobbling, setIsCartWobbling] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeFlavor = FLAVOR_DATA[activeFlavorKey];

  // Rotate to next flavor
  const handleNextFlavor = () => {
    const currentIndex = FLAVOR_KEYS.indexOf(activeFlavorKey);
    const nextIndex = (currentIndex + 1) % FLAVOR_KEYS.length;
    setActiveFlavorKey(FLAVOR_KEYS[nextIndex]);
  };

  // Direct select flavor
  const handleSelectFlavor = (key) => {
    setActiveFlavorKey(key);
  };

  // Add to cart execution
  const handleAddToCart = () => {
    if (isCartAnimating) return; // Prevent spamming while animation executes
    setIsCartAnimating(true);

    // After flying animation completes (1.2 seconds in BottleDisplay)
    setTimeout(() => {
      setCartCount(prev => prev + 1);
      setIsCartWobbling(true);
      setIsCartAnimating(false);

      // Trigger Confetti matching flavor colors!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.2, x: 0.8 }, // Fire near the shopping bag
        colors: [activeFlavor.colors.bgRight, activeFlavor.colors.accentText, '#ffffff'],
        ticks: 200
      });

      // Stop shaking after animation ends
      setTimeout(() => {
        setIsCartWobbling(false);
      }, 600);

    }, 1000);
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col relative overflow-hidden transition-theme"
      style={{ backgroundColor: activeFlavor.colors.bgLeft }}
    >
      {/* Top Navbar */}
      <Navbar 
        cartCount={cartCount} 
        isCartWobbling={isCartWobbling} 
        activeFlavorColor={activeFlavor.colors.accentText}
        onCartClick={() => setIsDrawerOpen(true)}
      />

      {/* Main Split Grid Section */}
      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 relative z-10 px-6 md:px-12 pb-12">
        
        {/* Left Side Content (6 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pr-0 lg:pr-8 py-8 lg:py-0">
          
          {/* Animated Flavor Badges */}
          <div className="flex flex-wrap gap-2.5 items-center">
            {FLAVOR_KEYS.map((key) => {
              const f = FLAVOR_DATA[key];
              const isSelected = key === activeFlavorKey;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectFlavor(key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 border flex items-center gap-1.5 ${
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
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </div>

          {/* Description Text */}
          <AnimatePresence mode="wait">
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
          </AnimatePresence>

          {/* Call to Actions Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Order Now Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className="px-8 py-4 rounded-full font-bold text-white text-sm tracking-wider uppercase shadow-xl transition-all duration-300 relative overflow-hidden group"
              style={{ backgroundColor: activeFlavor.colors.accentText }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Order Now <ShoppingCart size={16} />
              </span>
              {/* Hover shine effect */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>

            {/* Learn More Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase border-2 transition-all duration-300 flex items-center gap-2"
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
          
          {/* CURVED BACKGROUND SHAPE (Matches color changes) */}
          <div className="absolute inset-0 overflow-hidden rounded-[40px] -z-10 shadow-inner">
            {/* Main Background Panel */}
            <motion.div 
              className="absolute inset-0 transition-theme"
              style={{ backgroundColor: activeFlavor.colors.bgRight }}
              layoutId="bgPanel"
            />
            
            {/* Outer large circular details */}
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
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </div>

          {/* GLASS BADGE OVERLAY: PRODUCT NAME */}
          <div className="absolute left-6 top-1/3 py-8 px-3 rounded-full bg-white/30 backdrop-blur-md shadow-lg border border-white/20 flex items-center justify-center select-none z-20">
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </div>

          {/* ACTIVE FLAVOR BOTTLE DISPLAY WITH MOTION */}
          <div className="relative z-10 w-full flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </div>

          {/* SWIPE / NEXT FLAVOR NAVIGATION CIRCLE */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextFlavor}
            className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white/95 text-stone-800 shadow-xl border border-stone-150 flex items-center justify-center cursor-pointer group z-25"
          >
            {/* Pulsing indicator ring around button */}
            <div className="absolute inset-[-4px] rounded-full border-2 border-white/40 pulse-ring -z-10 pointer-events-none" />
            
            <ChevronRight 
              size={24} 
              className="group-hover:translate-x-0.5 transition-transform duration-300"
              style={{ color: activeFlavor.colors.accentText }}
            />
          </motion.button>

        </div>

      </div>

      {/* Floating Info Icon that triggers drawer */}
      <motion.button
        onClick={() => setIsDrawerOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 left-6 p-4 rounded-full bg-white shadow-xl border border-stone-200 z-30 flex items-center gap-2 cursor-pointer group"
      >
        <Info size={18} className="text-stone-600 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold text-stone-700 max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 ease-out whitespace-nowrap">
          View Macros
        </span>
      </motion.button>

      {/* Slide-out Nutritional Information Drawer */}
      <NutritionDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeFlavor={activeFlavorKey}
        flavorData={activeFlavor}
      />
    </div>
  );
}
