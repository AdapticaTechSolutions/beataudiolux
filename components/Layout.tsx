
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Music, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Lock } from 'lucide-react';
import { Button } from './ui/Button';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Events', path: '/events' },
    { name: 'Venues', path: '/venues' },
    { name: 'Partners', path: '/partners' },
    { name: 'Contact', path: '/contact' },
  ];

  // Hide main layout elements if we are in admin section, but allow login page to have layout if desired (or handle in App.tsx)
  // For now, we keep layout for public pages. Admin pages use AdminLayout which replaces this.
  // If this Layout is wrapping specific routes in App.tsx, we are good.

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-gold-500/30 selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? 'bg-stone-950/90 backdrop-blur-xl border-b border-gold-500/10 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 z-50 group">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform duration-500">
              <Music className="text-stone-900 w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-widest text-stone-100 leading-none">
                BEAT
              </span>
              <span className="font-display text-xs tracking-[0.3em] text-gold-400 leading-none">
                AUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm uppercase tracking-widest font-medium hover:text-gold-400 transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-gold-400' : 'text-stone-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/booking">
              <Button variant="gold-glass" size="sm" className="!rounded-full border-gold-500/30 hover:bg-gold-500/10">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden z-50 text-stone-100 hover:text-gold-400 transition-colors p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-stone-950 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-2xl font-display font-bold text-stone-100 hover:text-gold-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" className="mt-4">
                <Button variant="primary" size="lg">Book Your Event</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-0 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <Music className="text-stone-900 w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-widest text-stone-100">
                BEAT <span className="text-gold-400">AUDIO</span>
              </span>
            </div>
            <p className="text-stone-400 max-w-md mb-8 leading-relaxed font-light">
              Providing premium technical production for exclusive weddings, corporate galas, and private events. We transform spaces into timeless experiences.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-gold-500 hover:text-stone-900 transition-all duration-300 border border-stone-700 text-stone-400">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold-100 font-display font-bold mb-6 tracking-wider">Quick Links</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">Our Story</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">Premium Services</Link></li>
              <li><Link to="/venues" className="hover:text-gold-400 transition-colors">Exclusive Venues</Link></li>
              <li><Link to="/booking" className="hover:text-gold-400 transition-colors">Request a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-100 font-display font-bold mb-6 tracking-wider">Contact</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-1" />
                <span>123 Audio Ave, Luxury District<br/>Sound City, SC 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>concierge@beataudio.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-600 text-xs uppercase tracking-widest">
          <div>&copy; {new Date().getFullYear()} Beat Audio Production. Designed for Excellence.</div>
          <Link to="/admin/login" className="flex items-center gap-2 hover:text-gold-500 transition-colors opacity-50 hover:opacity-100">
             <Lock size={12} /> Admin Portal
          </Link>
        </div>
      </footer>

      {/* Persistent Booking CTA */}
      {location.pathname !== '/booking' && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Link to="/booking">
            <Button variant="primary" className="rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] px-8 py-4 text-base font-bold animate-bounce-slow">
              Book Now
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Layout;
