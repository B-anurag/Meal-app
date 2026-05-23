import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle } from 'lucide-react';

const MacroRing = ({ value, label, percentage, color, textColor }) => {
  // SVG properties
  const radius = 35;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/40 shadow-sm">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Track Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-black/5"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>
        {/* Value Label inside */}
        <span className="absolute text-xs font-bold font-sans text-stone-800">{value}</span>
      </div>
      <span className="mt-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">{label}</span>
    </div>
  );
};

export default function NutritionDrawer({ isOpen, onClose, activeFlavor, flavorData }) {
  if (!flavorData) return null;

  const accentColor = flavorData.colors.accentText;

  // Drawer Animation Configurations
  const drawerVariants = {
    hidden: { x: '100%', opacity: 0.8 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 30 }
    },
    exit: { 
      x: '100%', 
      opacity: 0.8,
      transition: { type: 'spring', stiffness: 300, damping: 35 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Shadow overlay */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Drawer Wrapper */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-stone-50/95 border-l border-white/20 shadow-2xl z-50 overflow-y-auto flex flex-col transition-theme"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-200/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${flavorData.colors.bgRight}40` }}
                >
                  <Sparkles size={20} style={{ color: accentColor }} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 leading-none">{flavorData.name}</h3>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentColor }}>Nutrition Profile</span>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-stone-200/50 transition-colors text-stone-500 hover:text-stone-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-8 flex-1">
              
              {/* Tagline Box */}
              <div 
                className="p-5 rounded-2xl border transition-theme"
                style={{ 
                  backgroundColor: `${flavorData.colors.bgRight}15`,
                  borderColor: `${flavorData.colors.bgRight}40`
                }}
              >
                <p className="font-serif italic text-lg leading-relaxed" style={{ color: accentColor }}>
                  "{flavorData.tagline} {flavorData.boldWord}"
                </p>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                  {flavorData.description}
                </p>
              </div>

              {/* Macro Rings Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-700">Macronutrients (Per 330ml Meal)</h4>
                <div className="grid grid-cols-4 gap-2">
                  <MacroRing value="26g" label="Protein" percentage={52} color={flavorData.colors.bgRight} textColor={accentColor} />
                  <MacroRing value="32g" label="Carbs" percentage={22} color={flavorData.colors.bgRight} textColor={accentColor} />
                  <MacroRing value="10g" label="Fats" percentage={15} color={flavorData.colors.bgRight} textColor={accentColor} />
                  <MacroRing value="26" label="Vitamins" percentage={100} color={flavorData.colors.bgRight} textColor={accentColor} />
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-700">Clean Ingredients List</h4>
                <div className="space-y-3 bg-white/40 p-4 rounded-2xl border border-stone-200/50">
                  {[
                    "Organic Gluten-Free Oat Milk Base",
                    "Sprouted Yellow Pea Protein & Flaxseed",
                    "Cold-Pressed Virgin Sunflower Oil (Omega 3 & 6)",
                    "Natural Flavors & Stevia Leaf Extract",
                    "Prebiotic Chicory Root Fiber (6g)",
                    "26 Bioactive Essential Vitamins & Minerals"
                  ].map((ingredient, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: flavorData.colors.bgRight }} />
                      <span className="text-sm text-stone-600 font-medium leading-tight">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom badge details */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-stone-100 rounded-xl">
                  <span className="block text-xl font-extrabold text-stone-800">400</span>
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Calories</span>
                </div>
                <div className="p-3 bg-stone-100 rounded-xl">
                  <span className="block text-xl font-extrabold text-stone-800">Low</span>
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Glycemic</span>
                </div>
                <div className="p-3 bg-stone-100 rounded-xl">
                  <span className="block text-xl font-extrabold text-stone-800">100%</span>
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Vegan</span>
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-stone-200/50 bg-white/30 backdrop-blur-sm">
              <button 
                onClick={onClose}
                className="w-full py-4 rounded-xl text-white font-bold text-center shadow-lg transition-transform active:scale-98"
                style={{ backgroundColor: accentColor }}
              >
                Back to Product
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
