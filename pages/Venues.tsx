import React from 'react';
import { motion } from 'framer-motion';
import { VENUES } from '../constants';
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/AnimatedSection';
import { MapPin, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Venues: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-stone-950">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-stone-100 mb-6">
            Partner <span className="text-gold-400">Venues</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto font-light">
            We are the accredited supplier for these premium locations, ensuring a hassle-free setup and white-glove service.
          </p>
        </AnimatedSection>

        <StaggerChildren className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {VENUES.map((venue, i) => (
            <StaggerItem key={venue.id} className="break-inside-avoid">
              <div className="group relative rounded-sm overflow-hidden bg-stone-900 border border-stone-800 hover:border-gold-500/30 transition-colors duration-500">
                <div className="relative">
                   <img src={venue.image} alt={venue.name} className="w-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" style={{ height: `${300 + (i % 3) * 100}px` }} />
                   <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent opacity-90" />
                   
                   <div className="absolute bottom-0 left-0 p-8 w-full">
                     <h3 className="text-2xl font-display font-bold text-stone-100 mb-3 tracking-wide">{venue.name}</h3>
                     <div className="flex items-center gap-6 text-stone-400 text-xs uppercase tracking-wider mb-6">
                       <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-gold-500" /> {venue.location}</span>
                       <span className="flex items-center gap-2"><Users className="w-3 h-3 text-gold-500" /> {venue.capacity} pax</span>
                     </div>
                     
                     <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                       <Button variant="outline" size="sm" className="w-full mt-2 border-stone-600 hover:border-gold-400">View Gallery</Button>
                     </div>
                   </div>
                </div>
              </div>
            </StaggerItem>
          ))}
           {/* Duplicates for layout demo */}
           {VENUES.map((venue, i) => (
            <StaggerItem key={`${venue.id}-dup`} className="break-inside-avoid">
              <div className="group relative rounded-sm overflow-hidden bg-stone-900 border border-stone-800 hover:border-gold-500/30 transition-colors duration-500">
                <div className="relative">
                   <img src={venue.image} alt={venue.name} className="w-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" style={{ height: `${400 - (i % 2) * 50}px` }} />
                   <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent opacity-90" />
                   
                   <div className="absolute bottom-0 left-0 p-8 w-full">
                     <h3 className="text-2xl font-display font-bold text-stone-100 mb-3 tracking-wide">{venue.name}</h3>
                     <div className="flex items-center gap-6 text-stone-400 text-xs uppercase tracking-wider mb-6">
                       <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-gold-500" /> {venue.location}</span>
                       <span className="flex items-center gap-2"><Users className="w-3 h-3 text-gold-500" /> {venue.capacity} pax</span>
                     </div>
                     
                     <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                       <Button variant="outline" size="sm" className="w-full mt-2 border-stone-600 hover:border-gold-400">View Gallery</Button>
                     </div>
                   </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
};

export default Venues;