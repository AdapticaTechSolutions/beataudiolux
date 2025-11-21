import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, Sliders, Lightbulb, Award } from 'lucide-react';
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/AnimatedSection';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-950">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/80 to-stone-950" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="mb-6 inline-flex items-center gap-4 border-b border-gold-500/30 pb-4">
              <span className="text-gold-400 font-display tracking-[0.3em] text-sm uppercase">
                Est. Sabater Trading
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-stone-100 mb-8 leading-tight">
              THE <span className="text-gold-400">HEARTBEAT</span> <br />
              OF YOUR EVENT
            </h1>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed">
              "We provide the Beat to your Special Occasions."
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Grid */}
            <AnimatedSection className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1974&auto=format&fit=crop" 
                  alt="Sound Engineering" 
                  className="rounded-sm shadow-lg mt-12 grayscale-[20%] hover:grayscale-0 transition-all duration-500 border border-stone-800" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
                  alt="Event Lighting" 
                  className="rounded-sm shadow-lg grayscale-[20%] hover:grayscale-0 transition-all duration-500 border border-stone-800" 
                />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold-500/5 blur-[100px] rounded-full" />
            </AnimatedSection>

            {/* Content */}
            <div className="space-y-12">
              <AnimatedSection delay={0.2}>
                <h2 className="text-4xl font-display font-bold text-stone-100 mb-6">
                  Curated <span className="text-gold-400">Excellence</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 transition-colors">
                      <Sliders className="text-gold-400 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-stone-200 mb-2">Tailored to Your Investment</h3>
                      <p className="text-stone-400 font-light leading-relaxed">
                        Using quality sound equipment tuned specifically to your budget needs. We believe premium audio should be accessible, providing the best value for every production scale.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 transition-colors">
                      <Lightbulb className="text-gold-400 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-stone-200 mb-2">Expert Recommendations</h3>
                      <p className="text-stone-400 font-light leading-relaxed">
                        We give honest, professional recommendations according to your needs. From specific speaker requirements to the perfect blend of lights and atmospheric effects.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                 <div className="bg-stone-900/30 border border-gold-500/20 p-8 rounded-sm backdrop-blur-sm">
                   <div className="flex items-center gap-4 mb-4">
                     <Award className="text-gold-500 w-6 h-6" />
                     <span className="text-gold-200 font-display tracking-widest uppercase text-sm font-bold">Management</span>
                   </div>
                   <p className="text-stone-300 font-light italic">
                     "Beat Audio Lights and Sound is Owned and Managed by Sabater Trading."
                   </p>
                 </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-stone-900 relative border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection className="mb-16">
             <h2 className="text-4xl font-display font-bold text-stone-100 mb-4">The <span className="text-gold-400">Beat Audio</span> Standard</h2>
             <p className="text-stone-400 max-w-2xl mx-auto font-light">Precision engineering meets artistic vision.</p>
          </AnimatedSection>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Precision', desc: 'Every decibel measured, every light cue timed to perfection.', icon: Mic2 },
              { title: 'Passion', desc: 'We treat every event as if it were our own masterpiece.', icon: Award },
              { title: 'Prestige', desc: 'High-end equipment that looks as good as it sounds.', icon: Lightbulb },
            ].map((item, i) => (
              <StaggerItem key={i} className="p-10 bg-stone-950 border border-stone-800 rounded-sm hover:border-gold-500/30 transition-colors duration-500 group">
                <div className="mb-6 inline-block p-4 bg-stone-900 rounded-full group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-stone-100 mb-4">{item.title}</h3>
                <p className="text-stone-400 font-light">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <div className="mt-20">
            <Link to="/booking">
              <Button variant="primary" size="lg" className="px-12">Start Planning Your Event</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;