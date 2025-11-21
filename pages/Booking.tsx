
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, MapPin, User, Mail, Phone, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SERVICES, VENUES, EVENT_TYPES } from '../constants';
import { BookingData } from '../types';
import { useStore } from '../context/StoreContext';

// Steps
const STEPS = ['Details', 'Venue', 'Gear', 'Review', 'Success'];

// Initial State
const initialData: BookingData = {
  name: '', email: '', phone: '',
  eventType: '', date: '', time: '', location: '',
  equipment: [], addons: [], notes: ''
};

const Booking: React.FC = () => {
  const { isDateBlocked, addEvent } = useStore();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(initialData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateError, setDateError] = useState<string | null>(null);
  
  // Calculate price based on equipment
  useEffect(() => {
    let total = 0;
    data.equipment.forEach(id => {
      const service = SERVICES.find(s => s.id === id);
      if (service) total += service.price;
    });
    if (data.location) total += 5000; // Logistics fee
    setTotalPrice(total);
  }, [data]);

  const updateField = (field: keyof BookingData, value: any) => {
    if (field === 'date') {
      if (isDateBlocked(value)) {
        setDateError("This date is unavailable. Please select a date at least 30 days from now that isn't already booked.");
        setData(prev => ({ ...prev, [field]: '' })); // Clear invalid date
        return;
      } else {
        setDateError(null);
      }
    }
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEquipment = (id: string) => {
    setData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(id) 
        ? prev.equipment.filter(x => x !== id) 
        : [...prev.equipment, id]
    }));
  };

  const nextStep = () => {
    if (step === 3) {
      // Final submission
      addEvent(data);
    }
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // Get Min Date for Input (Today + 30)
  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  };

  // Confetti effect component
  const Confetti = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gold-400 rounded-sm"
          initial={{ 
            x: window.innerWidth / 2, 
            y: window.innerHeight / 2, 
            scale: 0,
            opacity: 1 
          }}
          animate={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight, 
            opacity: [1, 0],
            rotate: Math.random() * 360,
            scale: [1, 0.5]
          }}
          transition={{ duration: 2.5, ease: "easeOut", delay: Math.random() * 0.5 }}
          style={{ backgroundColor: ['#D4AF37', '#F5EBC4', '#FFFFFF'][Math.floor(Math.random() * 3)] }}
        />
      ))}
    </div>
  );

  return (
    <div className="pt-32 pb-20 min-h-screen flex flex-col relative overflow-hidden bg-stone-950">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-800/50 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl flex-grow flex flex-col">
        
        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex justify-between mb-6 px-2">
            {STEPS.map((s, i) => (
              <div key={s} className={`text-xs font-display font-bold tracking-widest uppercase transition-colors duration-500 ${i <= step ? 'text-gold-400' : 'text-stone-700'}`}>
                {s}
              </div>
            ))}
          </div>
          <div className="h-[1px] bg-stone-800 w-full relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Wizard Content */}
        <div className="bg-stone-900/40 backdrop-blur-xl border border-white/5 rounded-sm p-8 md:p-12 shadow-2xl flex-grow relative min-h-[500px]">
          {step === 4 && <Confetti />}
          
          <AnimatePresence mode="wait">
            {/* STEP 1: Event Details */}
            {step === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="text-center mb-10">
                  <span className="text-gold-500 text-xs tracking-widest uppercase mb-2 block">Step 1 of 5</span>
                  <h2 className="text-3xl font-display font-bold text-stone-100 mb-2">Event Essentials</h2>
                  <p className="text-stone-400 font-light">Select the type of occasion you are hosting.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {EVENT_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => updateField('eventType', type)}
                      className={`p-6 rounded-sm border text-center transition-all duration-300 font-display tracking-wide text-sm ${
                        data.eventType === type 
                        ? 'bg-gold-900/20 border-gold-400 text-gold-200 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                        : 'bg-stone-950/50 border-stone-800 text-stone-500 hover:border-gold-500/30 hover:text-stone-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Date
                    </label>
                    <input 
                      type="date" 
                      min={getMinDate()}
                      value={data.date}
                      onChange={(e) => updateField('date', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 outline-none transition-colors text-sm"
                    />
                    {dateError && (
                      <div className="flex items-center gap-2 text-red-400 text-xs mt-2 animate-pulse">
                        <AlertCircle className="w-3 h-3" /> {dateError}
                      </div>
                    )}
                    <p className="text-stone-600 text-[10px]">Note: Minimum 30 days advance booking required.</p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      Time
                    </label>
                    <input 
                      type="time" 
                      value={data.time}
                      onChange={(e) => updateField('time', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Venue / Location */}
            {step === 1 && (
               <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="text-center mb-10">
                  <span className="text-gold-500 text-xs tracking-widest uppercase mb-2 block">Step 2 of 5</span>
                  <h2 className="text-3xl font-display font-bold text-stone-100 mb-2">The Setting</h2>
                  <p className="text-stone-400 font-light">Choose from our exclusive partner venues or a custom location.</p>
                </div>

                <div className="space-y-3 mb-10">
                  <label className="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Custom Location Address
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter full address..."
                    value={data.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 outline-none transition-colors text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {VENUES.slice(0,4).map(venue => (
                    <div 
                      key={venue.id}
                      onClick={() => updateField('location', venue.name)}
                      className={`group cursor-pointer rounded-sm overflow-hidden border relative h-40 transition-all duration-300 ${
                        data.location === venue.name 
                        ? 'border-gold-400' 
                        : 'border-stone-800 hover:border-gold-500/30'
                      }`}
                    >
                      <img src={venue.image} alt={venue.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500 grayscale-[30%] group-hover:grayscale-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-6 flex flex-col justify-end">
                        <h4 className="text-stone-100 font-display font-bold tracking-wide">{venue.name}</h4>
                        <p className="text-xs text-gold-400/80 uppercase tracking-wider mt-1">{venue.location}</p>
                      </div>
                      {data.location === venue.name && (
                        <div className="absolute top-3 right-3 bg-gold-400 text-stone-950 rounded-full p-1">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Gear Selection */}
            {step === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="text-center mb-10">
                  <span className="text-gold-500 text-xs tracking-widest uppercase mb-2 block">Step 3 of 5</span>
                  <h2 className="text-3xl font-display font-bold text-stone-100 mb-2">Curate Your Experience</h2>
                  <p className="text-stone-400 font-light">Select the technical elements required for your event.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                  {SERVICES.map(service => (
                    <div 
                      key={service.id}
                      onClick={() => toggleEquipment(service.id)}
                      className={`relative p-6 rounded-sm border transition-all cursor-pointer flex items-start gap-4 group ${
                        data.equipment.includes(service.id)
                        ? 'bg-gold-900/10 border-gold-400'
                        : 'bg-stone-950/50 border-stone-800 hover:bg-stone-900'
                      }`}
                    >
                      <div className={`mt-1 p-2 rounded-full border ${
                         data.equipment.includes(service.id) ? 'bg-gold-400 text-stone-950 border-gold-400' : 'bg-stone-900 text-stone-600 border-stone-800'
                      }`}>
                        {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { 
                          className: `w-4 h-4 ${data.equipment.includes(service.id) ? 'text-stone-900' : 'text-stone-500'}` 
                        })}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold font-display text-sm tracking-wide ${data.equipment.includes(service.id) ? 'text-gold-200' : 'text-stone-300'}`}>
                          {service.title}
                        </h4>
                        <p className="text-xs text-stone-500 mt-2 font-light leading-relaxed">{service.description}</p>
                        <p className="text-gold-400/80 font-mono text-xs mt-3">₱{service.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Review & Contact Info */}
            {step === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                 <div className="text-center mb-10">
                  <span className="text-gold-500 text-xs tracking-widest uppercase mb-2 block">Step 4 of 5</span>
                  <h2 className="text-3xl font-display font-bold text-stone-100 mb-2">Final Details</h2>
                  <p className="text-stone-400 font-light">We just need a way to contact you with the proposal.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <User className="w-3 h-3" /> Full Name
                      </label>
                      <input 
                        type="text" 
                        value={data.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Phone className="w-3 h-3" /> Phone
                      </label>
                      <input 
                        type="tel" 
                        value={data.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 outline-none text-sm"
                      />
                    </div>
                  </div>
                   <div className="space-y-3">
                      <label className="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Mail className="w-3 h-3" /> Email Address
                      </label>
                      <input 
                        type="email" 
                        value={data.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-4 text-stone-200 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 outline-none text-sm"
                      />
                    </div>
                </div>

                <div className="bg-stone-800/30 rounded-sm p-8 border border-stone-800 mt-8">
                  <h3 className="font-display font-bold text-stone-200 mb-6 flex items-center justify-between text-lg">
                    <span>Estimate Summary</span>
                    <span className="text-gold-400">₱{totalPrice.toLocaleString()}</span>
                  </h3>
                  <ul className="space-y-4 text-sm text-stone-400">
                    <li className="flex justify-between border-b border-stone-800 pb-2">
                      <span>Event Type</span> <span className="text-stone-300 font-medium">{data.eventType || '—'}</span>
                    </li>
                    <li className="flex justify-between border-b border-stone-800 pb-2">
                      <span>Date</span> <span className="text-stone-300 font-medium">{data.date || '—'}</span>
                    </li>
                    <li className="flex justify-between border-b border-stone-800 pb-2">
                      <span>Location</span> <span className="text-stone-300 font-medium">{data.location || '—'}</span>
                    </li>
                    <li className="pt-2">
                      <span className="block mb-3 text-xs uppercase tracking-widest">Selected Services</span>
                      <div className="flex flex-wrap gap-2">
                        {data.equipment.length > 0 ? data.equipment.map(id => {
                           const s = SERVICES.find(serv => serv.id === id);
                           return <span key={id} className="px-3 py-1 bg-gold-900/20 border border-gold-500/20 text-gold-300 text-xs font-medium">{s?.title}</span>
                        }) : <span className="text-stone-600 italic">None selected</span>}
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Success */}
            {step === 4 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-12 flex flex-col items-center justify-center h-full"
              >
                <div className="w-20 h-20 rounded-full border-2 border-gold-400 flex items-center justify-center mb-6">
                  <Check className="w-10 h-10 text-gold-400" />
                </div>
                <div>
                  <h2 className="text-4xl font-display font-bold text-stone-100 mb-4">Inquiry Received</h2>
                  <p className="text-stone-400 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, {data.name}. We have received your details for the {data.eventType}. 
                    A dedicated account manager will contact you at {data.email} shortly with a formal proposal.
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <Button variant="outline" className="w-full" onClick={() => window.print()}>
                    Save Summary
                  </Button>
                  <Button variant="glass" className="w-full" onClick={() => { setData(initialData); setStep(0); }}>
                    Book Another Event
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="mt-16 flex justify-between items-center pt-8 border-t border-white/5">
              <Button 
                variant="glass" 
                onClick={prevStep} 
                disabled={step === 0}
                className={`${step === 0 ? 'opacity-0 pointer-events-none' : ''} hover:bg-stone-800`}
              >
                Back
              </Button>
              
              <div className="flex items-center gap-6">
                {step > 1 && (
                   <div className="text-right hidden md:block">
                      <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-1">Estimated Total</div>
                      <div className="text-xl font-display font-bold text-gold-400">₱{totalPrice.toLocaleString()}</div>
                   </div>
                )}
                <Button 
                  variant="primary" 
                  onClick={nextStep}
                  className="shadow-none"
                  disabled={
                    (step === 0 && (!data.eventType || !data.date || !!dateError)) ||
                    (step === 1 && !data.location)
                  }
                >
                  {step === 3 ? 'Submit Request' : 'Continue'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Price Bubble */}
      {step > 1 && step < 4 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-gold-500/20 p-4 md:hidden z-40 flex justify-between items-center"
        >
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-widest">Total Estimate</div>
            <div className="text-lg font-display font-bold text-gold-400">₱{totalPrice.toLocaleString()}</div>
          </div>
          <Button variant="primary" size="sm" onClick={nextStep}>
            {step === 3 ? 'Submit' : 'Next'}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Booking;
