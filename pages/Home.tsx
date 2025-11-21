import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, Crown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/AnimatedSection';
import { SERVICES } from '../constants';

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-950">
        {/* Background Parallax */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/70 to-stone-950" />
        </motion.div>

        {/* Warm Glows */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        
        {/* Content */}
        <motion.div 
          style={{ opacity }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-gold-400/50"></div>
              <span className="text-gold-400 font-display tracking-[0.2em] text-sm uppercase">
                Est. 2010
              </span>
              <div className="h-[1px] w-12 bg-gold-400/50"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-stone-100 mb-8 tracking-tight leading-tight">
              ELEVATING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">EVERY MOMENT</span>
            </h1>
            
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              We curate prestigious audio-visual experiences for weddings, galas, and corporate events. Precision, elegance, and excellence in every detail.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/booking">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] min-w-[180px]">
                  Book Now
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[180px] border-stone-600 text-stone-300 hover:text-gold-300 hover:border-gold-400" icon={<ArrowRight className="w-4 h-4" />}>
                  Our Packages
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-stone-500 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-display text-gold-500/50">Discover</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold-500/0 via-gold-500/50 to-gold-500/0" />
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 bg-stone-950 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Prestige Equipment", desc: "Top-tier L-Acoustics and Martin Audio systems for flawless sound.", icon: Crown },
              { title: "White Glove Service", desc: "Our uniformed technicians ensure a discreet and professional execution.", icon: Award },
              { title: "Bespoke Design", desc: "Lighting and staging tailored specifically to your venue's architecture.", icon: Star }
            ].map((item, i) => (
              <div key={i} className="bg-stone-900/50 border border-stone-800/50 rounded-sm p-10 hover:bg-stone-900 transition-colors group duration-500 hover:border-gold-500/20">
                <div className="w-14 h-14 rounded-full bg-gold-900/10 border border-gold-500/20 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                  <item.icon className="text-gold-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-100 mb-4 font-display tracking-wide">{item.title}</h3>
                <p className="text-stone-400 leading-relaxed font-light text-sm">{item.desc}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Showcase Preview */}
      <section className="py-32 relative overflow-hidden bg-stone-950">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-20 border-b border-stone-800 pb-8">
            <AnimatedSection>
              <span className="text-gold-500 font-display tracking-widest text-sm uppercase mb-2 block">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-100">Recent <span className="text-gold-400 italic">Masterpieces</span></h2>
            </AnimatedSection>
            <Link to="/events" className="hidden md:flex items-center gap-2 text-gold-400 hover:text-gold-200 text-sm tracking-widest uppercase font-medium transition-colors">View All Projects <ArrowRight className="w-4 h-4"/></Link>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 auto-rows-[400px]">
            {[
              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2162&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1514525253440-b393452e23e7?q=80&w=1974&auto=format&fit=crop'
            ].map((src, i) => (
              <StaggerItem key={i} className={`relative group overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}>
                <img src={src} alt="Event" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-gold-400 text-xs tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">Wedding Production</p>
                  <h4 className="text-white font-display font-bold text-2xl">The Vanderbilt Gala</h4>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 bg-stone-900 relative">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
         
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-100 mb-6">Exquisite <span className="text-gold-400">Details</span></h2>
            <p className="text-stone-400 max-w-2xl mx-auto font-light">State-of-the-art technology meets refined aesthetics.</p>
          </AnimatedSection>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
             {SERVICES.map((service) => (
               <StaggerItem key={service.id} className="bg-stone-950 border border-stone-800 p-8 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col items-center text-center rounded-sm">
                 <div className="mb-6 group-hover:scale-110 transition-transform duration-500 p-3 rounded-full bg-stone-900 group-hover:bg-gold-900/20 border border-stone-800 group-hover:border-gold-500/20">
                   {service.icon}
                 </div>
                 <h3 className="text-sm font-bold text-stone-200 font-display uppercase tracking-wider group-hover:text-gold-300 transition-colors">{service.title}</h3>
               </StaggerItem>
             ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-stone-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-900/20 via-stone-950 to-stone-950" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-stone-100 mb-8">Ready to <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">Create Magic?</span></h2>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-16 font-light">Reserve your date with Beat Audio and experience the pinnacle of event production.</p>
            <Link to="/booking">
              <Button variant="primary" size="lg" className="px-16 py-6 text-lg shadow-[0_0_60px_rgba(212,175,55,0.2)]">
                Start Your Journey
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Home;