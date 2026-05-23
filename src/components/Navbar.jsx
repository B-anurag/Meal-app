import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingBag } from 'lucide-react';

export default function Navbar({ cartCount, isCartWobbling, activeFlavorColor, onCartClick }) {
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-12 w-full max-w-7xl mx-auto relative z-35">
      {/* Brand Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <NavLink to="/" className="font-serif text-2xl font-black tracking-tight text-stone-900">
          Go <span style={{ color: activeFlavorColor }} className="transition-theme">Meal</span>
        </NavLink>
      </motion.div>

      {/* Nav Menu Links with sliding glass pill highlight */}
      <div className="flex items-center bg-white/30 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/40 shadow-sm relative">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
              className={({ isActive }) => 
                `relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide rounded-full transition-colors duration-300 z-10 ${
                  isActive ? 'text-stone-850' : 'text-stone-500 hover:text-stone-800'
                }`
              }
            >
              {item.name}
              
              {/* Sliding Active Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full shadow-sm -z-10"
                  style={{ backgroundColor: `${activeFlavorColor}35` }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              
              {/* Sliding Hover Outline Highlight */}
              {hoveredPath === item.path && !isActive && (
                <motion.div
                  layoutId="hoverPill"
                  className="absolute inset-0 rounded-full border border-black/5 -z-10 bg-white/20"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Actions: User Profile & Shopping Cart */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* User profile */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm border border-white/40 text-stone-600 hover:text-stone-800 hover:bg-white/80 transition-colors shadow-sm"
        >
          <User size={18} />
        </motion.button>

        {/* Shopping Cart with dynamic spring shaking animation */}
        <motion.button
          id="shopping-bag"
          onClick={onCartClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isCartWobbling ? {
            rotate: [0, -12, 12, -8, 8, -4, 4, 0],
            scale: [1, 1.15, 1.15, 1, 1],
            transition: { duration: 0.6, ease: "easeInOut" }
          } : {}}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm border border-white/40 text-stone-600 hover:text-stone-800 hover:bg-white/80 transition-colors shadow-sm relative"
        >
          <ShoppingBag size={18} />
          
          {/* Cart Item Badge */}
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={cartCount}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center shadow-md shadow-black/15 transition-theme"
              style={{ backgroundColor: activeFlavorColor }}
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </div>
    </nav>
  );
}
