import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

const FAQItem = ({ question, answer, isOpen, onToggle, accentColor }) => {
  return (
    <div className="border-b border-stone-200/60 last:border-none">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left font-sans font-bold text-stone-850 hover:text-stone-900 transition-colors gap-4 cursor-pointer"
      >
        <span className="text-sm sm:text-base leading-snug">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-stone-400 shrink-0"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-xs sm:text-sm text-stone-550 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Contact({ activeFlavor }) {
  const accentColor = activeFlavor?.colors?.accentText || "#3A4D39";
  const btnHoverColor = activeFlavor?.colors?.buttonHover || "#2E3D2E";
  const lightBgColor = activeFlavor?.colors?.bgRight || "#A0C49D";

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitted(true);

    // Fire client side confetti celebration
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 },
      colors: [accentColor, lightBgColor, '#ffffff']
    });

    // Reset after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  const faqs = [
    {
      question: "Can Go Meal fully replace a breakfast, lunch, or dinner?",
      answer: "Absolutely. Every 330ml bottle of Go Meal delivers exactly 400 calories, 26g plant protein, healthy fats (Omega 3 & 6), prebiotic fibers, and 100% daily ratios of 26 bioactive essential vitamins and minerals. It is scientifically designed to be a complete meal replacement."
    },
    {
      question: "Is Go Meal gluten-free and 100% vegan?",
      answer: "Yes, we are committed to allergen-free nutrition. We use organic, certified gluten-free oat milk bases, sprouted yellow pea protein isolates, and flaxseed extracts. There is absolutely zero dairy, soy, lactose, animal products, or artificial sweeteners."
    },
    {
      question: "How does the flavor-changing subscription option work?",
      answer: "When you subscribe, you can choose to swap flavors or create custom combinations in your dashboard. You can select delivery cycles every 2, 4, or 6 weeks. Delivery dates can be rescheduled, paused, or canceled anytime in your account."
    },
    {
      question: "Which essential vitamins are contained in the recipe?",
      answer: "Our bioactive blend includes active Methylcobalamin (B12), L-Methylfolate (F9), Vitamin D3 (from organic lichen), Vitamin C, Vitamin E, Zinc, Iron, and 19 other trace minerals. They are in bio-available forms for maximum cellular absorption."
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
      {/* Page header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-none font-sans">
          Got Questions?<br />We're Here to Help.
        </h1>
        <p className="text-stone-500 text-sm md:text-base leading-relaxed">
          Need nutritional advice, order assistance, or wholesale inquiries? Write us a message or consult our frequently asked questions.
        </p>
      </div>

      {/* Grid: Form and FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Contact Form Column (5 Columns) */}
        <div className="lg:col-span-5 bg-white border border-stone-150 p-8 rounded-[36px] shadow-sm relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-extrabold text-stone-850">Send Message</h3>
                  <p className="text-xs text-stone-400">Response within 24 hours.</p>
                </div>

                {/* Input Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 bg-stone-50/50 transition-all text-sm"
                    style={{ '--tw-ring-color': accentColor }}
                  />
                </div>

                {/* Input Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 bg-stone-50/50 transition-all text-sm"
                    style={{ '--tw-ring-color': accentColor }}
                  />
                </div>

                {/* Input Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Your Message</label>
                  <textarea
                    required
                    rows="4"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write details..."
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 bg-stone-50/50 transition-all text-sm resize-none"
                    style={{ '--tw-ring-color': accentColor }}
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-2xl text-white font-bold text-sm tracking-wider uppercase shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  style={{ backgroundColor: accentColor }}
                >
                  Send Message <Send size={14} />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="submission-success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div 
                  className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${lightBgColor}30` }}
                >
                  <CheckCircle2 size={36} style={{ color: accentColor }} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-extrabold text-stone-850">Message Sent!</h3>
                  <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                    Thank you for reaching out, <span className="font-bold text-stone-800">{formState.name}</span>. Our nutrition specialists will get back to you shortly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: FAQs Column (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-stone-150 p-6 sm:p-8 rounded-[36px] shadow-sm">
            <h3 className="font-serif text-2xl font-extrabold text-stone-850 mb-4 border-b border-stone-100 pb-4">
              Frequently Asked Questions
            </h3>
            
            <div className="divide-y divide-stone-150">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQIndex === idx}
                  onToggle={() => setOpenFAQIndex(openFAQIndex === idx ? -1 : idx)}
                  accentColor={accentColor}
                />
              ))}
            </div>
          </div>

          {/* Quick info badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-150 flex items-center gap-3 shadow-sm">
              <Mail size={20} className="text-stone-500 shrink-0" style={{ color: accentColor }} />
              <div>
                <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Email Us</span>
                <span className="text-xs font-bold text-stone-800">hello@gomeal.com</span>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-stone-150 flex items-center gap-3 shadow-sm">
              <Phone size={20} className="text-stone-500 shrink-0" style={{ color: accentColor }} />
              <div>
                <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Call Center</span>
                <span className="text-xs font-bold text-stone-800">+1 (800) 555-MEAL</span>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-stone-150 flex items-center gap-3 shadow-sm">
              <MapPin size={20} className="text-stone-500 shrink-0" style={{ color: accentColor }} />
              <div>
                <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">HQ Location</span>
                <span className="text-xs font-bold text-stone-800">San Francisco, CA</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
