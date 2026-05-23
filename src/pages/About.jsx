import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldAlert, Award, Star, Compass } from 'lucide-react';

export default function About() {
  const brandValues = [
    {
      title: "100% Vegan & Clean",
      desc: "Zero dairy, zero soy, zero GMOs. Just pure, clean sprouted yellow pea proteins and wholesome oats.",
      icon: CheckCircle2,
      color: "#A0C49D"
    },
    {
      title: "Nutritional Integrity",
      desc: "Exactly 26 bioactive essential vitamins and minerals in active forms that your body actually absorbs.",
      icon: Compass,
      color: "#F9D949"
    },
    {
      title: "Zero Added Sugars",
      desc: "Naturally sweetened with organic stevia leaves, ensuring low glycemic index energy without sugar crashes.",
      icon: ShieldAlert,
      color: "#FF8E9E"
    },
    {
      title: "Premium Craftsmanship",
      desc: "Voted #1 complete nutrition meal replacement in customer satisfaction, taste profile, and texture smoothness.",
      icon: Award,
      color: "#C58940"
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "The Genesis",
      desc: "Our founders noticed that busy professionals skipped healthy food for fast-food snacks. The dream for a perfect, quick liquid nutrition profile was born."
    },
    {
      year: "2025",
      title: "Lab R&D & Formulation",
      desc: "Spent 10 months consulting nutritionists and chemists to balance macronutrient percentages (Protein, Fats, Carbs) with zero texture grittiness."
    },
    {
      year: "2025",
      title: "The Go Meal Launch",
      desc: "Launched our flagship Hazelnut formulation online. Gained 10,000+ loyal monthly subscribers within the first 60 days."
    },
    {
      year: "2026",
      title: "Flavor Horizons",
      desc: "Expanded the line into Wild Berry Rush, Cacao Delight, and Golden Vanilla, delivering nutrition for all tastebuds."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-16"
    >
      {/* Brand Story Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 border border-stone-200 shadow-sm text-xs font-bold uppercase tracking-wider text-stone-600">
            <Star size={12} className="text-amber-500 fill-amber-500" /> Voted Best Nutrition Formulation 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-[1.08] font-sans">
            Life Moves Fast.<br />Your Meal Should Too.
          </h1>
          <p className="text-stone-650 leading-relaxed text-sm md:text-base">
            At Go Meal, we believe that a busy schedule shouldn't require compromising your health. We formulated a complete, nutrient-rich beverage designed to substitute any breakfast, lunch, or dinner, offering real-food fuel in under 10 seconds.
          </p>
          <p className="text-stone-500 leading-relaxed text-sm md:text-base">
            Every bottle is locally crafted, gluten-free, vegan, and packed with bioactive essential vitamins. It's clean, modern energy made simple.
          </p>
        </div>

        {/* Brand Image showcase with custom decorative layers */}
        <div className="relative flex justify-center items-center p-8">
          <div className="absolute inset-0 bg-stone-200/40 rounded-[48px] -rotate-2 -z-10" />
          <div className="absolute inset-0 bg-stone-100/60 rounded-[48px] rotate-3 -z-20" />
          <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] w-full bg-stone-200">
            <img 
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&fit=crop&q=80" 
              alt="Fresh ingredients" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values Grid Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-black text-stone-850 font-serif">Core Brand Values</h2>
          <p className="text-xs sm:text-sm text-stone-500">We stand by clean sourcing, biological integrity, and zero compromises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl bg-white border border-stone-150 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
              >
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${val.color}30` }}
                >
                  <Icon size={24} style={{ color: val.color }} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-stone-850 text-base leading-snug">{val.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-12 bg-white/30 backdrop-blur-md p-8 sm:p-12 rounded-[40px] border border-white/40 shadow-sm">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-black text-stone-850 font-serif">Our Journey</h2>
          <p className="text-xs sm:text-sm text-stone-500">How we engineered liquid nutrition to redefine modern food.</p>
        </div>

        <div className="relative border-l border-stone-200 ml-4 md:ml-32 space-y-8">
          {timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative pl-8 md:pl-16 group"
            >
              {/* Year indicator pill floating left of timeline on desktop */}
              <div className="hidden md:block absolute left-[-120px] top-1 text-right w-20 font-black text-stone-850 font-sans text-xl">
                {item.year}
              </div>

              {/* Glowing timeline node dot */}
              <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-stone-800 border-2 border-white ring-4 ring-stone-100 group-hover:bg-amber-500 transition-colors" />

              <div className="space-y-1 max-w-2xl">
                <span className="block md:hidden text-stone-400 font-extrabold text-xs mb-1">{item.year}</span>
                <h3 className="font-serif font-extrabold text-lg text-stone-850 leading-tight">{item.title}</h3>
                <p className="text-xs sm:text-sm text-stone-550 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
