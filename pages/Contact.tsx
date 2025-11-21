import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/AnimatedSection';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen relative bg-stone-950">
      <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Info */}
          <AnimatedSection>
            <span className="text-gold-500 font-display text-sm tracking-widest uppercase mb-4 block">Inquiries</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-stone-100 mb-10">Get In <span className="text-gold-400">Touch</span></h1>
            <p className="text-stone-400 text-lg mb-16 font-light leading-relaxed max-w-md">
              For exclusive bookings or to schedule a consultation with our production designers, please contact our concierge.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 rounded-sm bg-stone-900 border border-stone-800 flex items-center justify-center text-gold-500 shrink-0 group-hover:border-gold-500/30 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-stone-100 font-bold text-xl mb-2 font-display">Call Us</h3>
                  <p className="text-stone-400 font-light">+1 (555) 123-4567</p>
                  <p className="text-stone-500 text-sm mt-1">Mon-Fri, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 rounded-sm bg-stone-900 border border-stone-800 flex items-center justify-center text-gold-500 shrink-0 group-hover:border-gold-500/30 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-stone-100 font-bold text-xl mb-2 font-display">Email Us</h3>
                  <p className="text-stone-400 font-light">concierge@beataudio.com</p>
                  <p className="text-stone-400 font-light">bookings@beataudio.com</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 rounded-sm bg-stone-900 border border-stone-800 flex items-center justify-center text-gold-500 shrink-0 group-hover:border-gold-500/30 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-stone-100 font-bold text-xl mb-2 font-display">Visit Our Studio</h3>
                  <p className="text-stone-400 font-light">123 Audio Ave, Luxury District</p>
                  <p className="text-stone-400 font-light">Sound City, SC 90210</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.2}>
             <div className="bg-stone-900/30 backdrop-blur-xl border border-stone-800 rounded-sm p-10 md:p-14 shadow-2xl">
               <h3 className="text-2xl font-display font-bold text-stone-100 mb-8">Send a Message</h3>
               <form className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="text-xs font-bold text-gold-500 uppercase tracking-widest">First Name</label>
                     <input type="text" className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/40 outline-none transition-colors text-sm" />
                   </div>
                   <div className="space-y-3">
                     <label className="text-xs font-bold text-gold-500 uppercase tracking-widest">Last Name</label>
                     <input type="text" className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/40 outline-none transition-colors text-sm" />
                   </div>
                 </div>
                 
                 <div className="space-y-3">
                   <label className="text-xs font-bold text-gold-500 uppercase tracking-widest">Email</label>
                   <input type="email" className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/40 outline-none transition-colors text-sm" />
                 </div>

                 <div className="space-y-3">
                   <label className="text-xs font-bold text-gold-500 uppercase tracking-widest">Message</label>
                   <textarea rows={4} className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/40 outline-none transition-colors text-sm"></textarea>
                 </div>

                 <Button variant="primary" className="w-full" icon={<Send className="w-4 h-4" />}>
                   Send Message
                 </Button>
               </form>
             </div>
          </AnimatedSection>

        </div>

        {/* Map */}
        <div className="mt-32 rounded-sm overflow-hidden border border-stone-800 h-96 grayscale invert-[.95] opacity-80">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844797932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629790692890!5m2!1sen!2sus" 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen={true} 
             loading="lazy"
           />
        </div>
      </div>
    </div>
  );
};

export default Contact;