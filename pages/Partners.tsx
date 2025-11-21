import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PARTNERS } from '../constants';
import { AnimatedSection } from '../components/AnimatedSection';

const CATEGORIES = ['All', 'Stylists', 'Catering', 'Food Carts', 'Photobooth', 'Event Planners'];

const Partners: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredPartners = activeTab === 'All' 
    ? PARTNERS 
    : PARTNERS.filter(p => p.category === activeTab);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-stone-950">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-stone-100 mb-6">Trusted <span className="text-gold-400">Purveyors</span></h1>
          <p className="text-stone-400 text-lg font-light">We collaborate with the industry's finest to complete your event experience.</p>
        </AnimatedSection>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full border transition-all duration-300 font-display text-xs tracking-widest uppercase ${
                activeTab === cat 
                ? 'bg-gold-500 text-stone-900 border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                : 'bg-transparent text-stone-500 border-stone-800 hover:border-gold-500/30 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPartners.map((partner) => (
              <motion.div
                key={partner.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-sm overflow-hidden group hover:border-gold-500/20"
              >
                <div className="h-56 overflow-hidden">
                  <img src={partner.image} alt={partner.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0" />
                </div>
                <div className="p-8">
                  <div className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-3">{partner.category}</div>
                  <h3 className="text-2xl font-display font-bold text-stone-100 mb-3 tracking-wide">{partner.name}</h3>
                  <p className="text-stone-400 text-sm font-light leading-relaxed">{partner.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;