import React from 'react';
import { motion } from 'framer-motion';
import { EVENTS } from '../constants';
import { AnimatedSection } from '../components/AnimatedSection';

const Events: React.FC = () => {
  return (
    <div className="pt-0 min-h-screen bg-stone-950">
      <div className="h-[70vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-stone-950/60 to-stone-950" />
        <AnimatedSection className="relative z-10 text-center">
          <span className="block text-gold-400 font-display tracking-[0.3em] text-sm uppercase mb-4">Our Expertise</span>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-stone-100 mb-6 tracking-tight">
            Events We <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Craft</span>
          </h1>
        </AnimatedSection>
      </div>

      <div className="container mx-auto px-6 pb-32 -mt-32 relative z-20">
        <div className="space-y-40">
          {EVENTS.map((event, index) => (
            <AnimatedSection key={event.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-32`}>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-sm overflow-hidden group shadow-2xl shadow-stone-950 border border-stone-800/50">
                  <div className="absolute inset-0 bg-gold-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                  <img src={event.image} alt={event.title} className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[20%]" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-0 right-0 bg-stone-950/90 border-t border-l border-gold-500/20 px-8 py-4">
                    <span className="text-gold-400 font-display tracking-widest uppercase text-xs">Explore Gallery</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                   <span className="text-gold-500 font-display text-3xl opacity-30">0{index + 1}</span>
                   <div className="h-[1px] flex-grow bg-stone-800"></div>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-stone-100 mb-8">{event.title}</h2>
                <p className="text-stone-300 text-lg leading-relaxed mb-10 font-light">{event.description}</p>
                <p className="text-stone-500 text-sm border-l-2 border-gold-500/30 pl-6 italic">
                  Tailored packages available including stage design, PA systems, and lighting orchestration specific to {event.title.toLowerCase()}.
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;