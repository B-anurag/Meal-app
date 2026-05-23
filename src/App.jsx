import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import NutritionDrawer from './components/NutritionDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';

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
  const location = useLocation();

  // Rotate to next flavor in hero
  const handleNextFlavor = () => {
    const currentIndex = FLAVOR_KEYS.indexOf(activeFlavorKey);
    const nextIndex = (currentIndex + 1) % FLAVOR_KEYS.length;
    setActiveFlavorKey(FLAVOR_KEYS[nextIndex]);
  };

  // Add to cart execution
  const handleAddToCart = (flavorId = null) => {
    // If a specific flavor was added (e.g. from the Products grid), set it as active
    if (flavorId && FLAVOR_DATA[flavorId]) {
      setActiveFlavorKey(flavorId);
    }
    
    if (isCartAnimating) return;
    setIsCartAnimating(true);

    setTimeout(() => {
      setCartCount(prev => prev + 1);
      setIsCartWobbling(true);
      setIsCartAnimating(false);

      // Trigger Confetti near the shopping bag
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.2, x: 0.8 },
        colors: [
          flavorId && FLAVOR_DATA[flavorId] ? FLAVOR_DATA[flavorId].colors.bgRight : activeFlavor.colors.bgRight,
          flavorId && FLAVOR_DATA[flavorId] ? FLAVOR_DATA[flavorId].colors.accentText : activeFlavor.colors.accentText,
          '#ffffff'
        ],
        ticks: 200
      });

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
      {/* Top Navigation */}
      <Navbar 
        cartCount={cartCount} 
        isCartWobbling={isCartWobbling} 
        activeFlavorColor={activeFlavor.colors.accentText}
        onCartClick={() => setIsDrawerOpen(true)}
      />

      {/* Pages Container with Route transitions */}
      <div className="flex-1 w-full flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <Home 
                  activeFlavorKey={activeFlavorKey}
                  setActiveFlavorKey={setActiveFlavorKey}
                  activeFlavor={activeFlavor}
                  FLAVOR_KEYS={FLAVOR_KEYS}
                  FLAVOR_DATA={FLAVOR_DATA}
                  handleNextFlavor={handleNextFlavor}
                  handleAddToCart={handleAddToCart}
                  isCartAnimating={isCartAnimating}
                  setIsDrawerOpen={setIsDrawerOpen}
                />
              } 
            />
            
            <Route 
              path="/products" 
              element={
                <Products 
                  FLAVOR_DATA={FLAVOR_DATA}
                  handleAddToCart={handleAddToCart}
                  isCartAnimating={isCartAnimating}
                  activeFlavorKey={activeFlavorKey}
                />
              } 
            />
            
            <Route 
              path="/about" 
              element={<About />} 
            />
            
            <Route 
              path="/contact" 
              element={<Contact activeFlavor={activeFlavor} />} 
            />
          </Routes>
        </AnimatePresence>
      </div>

      {/* Floating Info Icon that triggers drawer */}
      <motion.button
        onClick={() => setIsDrawerOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 left-6 p-4 rounded-full bg-white shadow-xl border border-stone-200 z-30 flex items-center gap-2 cursor-pointer group"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-stone-600 group-hover:rotate-12 transition-transform"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <span className="text-xs font-bold text-stone-700 max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 ease-out whitespace-nowrap">
          View Macros
        </span>
      </motion.button>

      {/* Slide-out Nutritional Drawer */}
      <NutritionDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeFlavor={activeFlavorKey}
        flavorData={activeFlavor}
      />
    </div>
  );
}
