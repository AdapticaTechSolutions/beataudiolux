
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/AnimatedSection';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-stone-950">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-stone-100 mb-6">
            Technical <span className="text-gold-400">Mastery</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto font-light">
            We stock the latest inventory of professional audio, lighting, and video equipment to ensure your event looks and sounds spectacular.
          </p>
        </AnimatedSection>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service) => (
            <StaggerItem key={service.id} className="group relative bg-stone-900/40 border border-stone-800 rounded-sm overflow-hidden hover:border-gold-500/40 transition-all duration-700 hover:-translate-y-2">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-gold-900/10 transition-colors duration-500" />
                <div className="absolute top-6 right-6 w-12 h-12 bg-stone-950/80 backdrop-blur border border-gold-500/30 rounded-full flex items-center justify-center text-gold-400">
                  {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}
                </div>
              </div>
              
              <div className="p-10 relative">
                <h3 className="text-2xl font-bold text-stone-100 font-display mb-4 tracking-wide group-hover:text-gold-300 transition-colors">{service.title}</h3>
                <p className="text-stone-400 mb-8 leading-relaxed text-sm font-light">{service.description}</p>
                
                <div className="flex items-center justify-between mt-auto border-t border-stone-800 pt-6">
                  <span className="text-gold-500 font-display text-lg">₱{service.price.toLocaleString()}</span>
                  <Link to="/booking">
                    <Button variant="outline" size="sm" className="rounded-full hover:bg-gold-500 hover:text-stone-900 border-stone-700 text-stone-400">
                      Add to Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
};

export default Services;
