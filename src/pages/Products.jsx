import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Sparkles, SlidersHorizontal } from 'lucide-react';
import BottleDisplay from '../components/BottleDisplay';

export default function Products({ FLAVOR_DATA, handleAddToCart, isCartAnimating, activeFlavorKey }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [likedProducts, setLikedProducts] = useState({});

  const flavors = Object.values(FLAVOR_DATA);

  // Toggle favorite liked product
  const toggleLike = (id) => {
    setLikedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Tag items for filtering demonstration
  const getProductTags = (id) => {
    switch (id) {
      case 'hazelnut': return ['Nutty', 'Low Glycemic', 'Best Seller'];
      case 'berry': return ['Fruity', 'High Antioxidant', 'Energy'];
      case 'chocolate': return ['Rich Cacao', 'High Protein', 'Post-workout'];
      case 'vanilla': return ['Classic', 'Mild Sweet', 'Daily Base'];
      default: return [];
    }
  };

  // Filter logic
  const filteredProducts = flavors.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'protein') return product.id === 'chocolate' || product.id === 'hazelnut';
    if (filter === 'fruity') return product.id === 'berry';
    if (filter === 'organic') return product.id === 'hazelnut' || product.id === 'vanilla';
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-12"
    >
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/40 border border-stone-200 shadow-sm text-xs font-bold uppercase tracking-widest text-stone-600">
          <Sparkles size={12} className="text-amber-500" /> Complete Meal in a Bottle
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-none font-sans">
          Fuel Your Day.<br />Discover Our Flavors.
        </h1>
        <p className="text-stone-500 text-sm md:text-base leading-relaxed">
          Balanced, delicious, and complete. Every Go Meal flavor delivers 26 essential vitamins, prebiotic fiber, and plant protein to keep you performing at your peak.
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={14} className="text-stone-500 mr-2" />
          {[
            { id: 'all', label: 'All Flavors' },
            { id: 'protein', label: 'High Protein' },
            { id: 'fruity', label: 'Antioxidant/Fruity' },
            { id: 'organic', label: 'Classic/Organic' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === btn.id
                  ? 'bg-stone-900 text-white shadow-md shadow-stone-900/15 ring-1 ring-stone-900/10 font-extrabold'
                  : 'bg-white/40 border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-white/70'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-stone-500">
          Showing <span className="text-stone-900 font-bold">{filteredProducts.length}</span> Flavors
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => {
          const tags = getProductTags(product.id);
          const isLiked = likedProducts[product.id];
          const isCurrentActive = product.id === activeFlavorKey;

          return (
            <motion.div
              key={product.id}
              layout
              whileHover={{ y: -8 }}
              className="flex flex-col rounded-[32px] bg-white border border-stone-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-350"
            >
              {/* Product Preview Card Top (Colored background) */}
              <div 
                className="relative aspect-square flex items-center justify-center p-6 transition-all duration-500"
                style={{ backgroundColor: `${product.colors.bgRight}30` }}
              >
                {/* Micro heart button */}
                <button 
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-stone-100 shadow-sm cursor-pointer hover:bg-white transition-colors"
                >
                  <Heart 
                    size={16} 
                    className={`transition-colors ${
                      isLiked ? 'fill-red-500 stroke-red-500 animate-ping-once' : 'text-stone-400 hover:text-stone-600'
                    }`} 
                  />
                </button>

                {/* Micro category tag */}
                <div 
                  className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-sm"
                  style={{ backgroundColor: product.colors.accentText }}
                >
                  {tags[0]}
                </div>

                {/* SVG Bottle visual display */}
                <div className="w-full max-w-[150px] aspect-[2/3] flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <BottleDisplay 
                    activeFlavor={product.id}
                    bottleColor={product.colors.bottle}
                    labelBgColor={product.colors.labelBg}
                    isCartAnimating={false} // Only animate in hero view
                    onBottleClick={() => handleAddToCart(product.id)}
                  />
                </div>
              </div>

              {/* Product Info Card Bottom */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-extrabold text-stone-850">{product.name}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Macros grid */}
                <div className="grid grid-cols-3 gap-1 text-center py-2 border-y border-stone-100 text-[10px] font-semibold text-stone-500 uppercase tracking-wide bg-stone-50/50 rounded-xl">
                  <div>
                    <span className="block font-bold text-stone-800 text-xs">26g</span> Protein
                  </div>
                  <div>
                    <span className="block font-bold text-stone-800 text-xs">32g</span> Carbs
                  </div>
                  <div>
                    <span className="block font-bold text-stone-800 text-xs">10g</span> Fats
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Per Bottle</span>
                    <span className="text-lg font-black text-stone-900 leading-none">$4.50</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product.id)}
                    className="p-3 rounded-2xl flex items-center justify-center text-white cursor-pointer shadow-md shadow-black/5"
                    style={{ backgroundColor: product.colors.accentText }}
                  >
                    <ShoppingCart size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
