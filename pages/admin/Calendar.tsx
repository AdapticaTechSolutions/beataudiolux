
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { motion } from 'framer-motion';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC = () => {
  const { events } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr && e.status !== 'CANCELLED');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-bold text-stone-100">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-stone-800 rounded-sm transition-colors"><ChevronLeft className="w-5 h-5 text-stone-400" /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-stone-800 rounded-sm transition-colors"><ChevronRight className="w-5 h-5 text-stone-400" /></button>
        </div>
      </div>

      <div className="flex-1 bg-stone-900 border border-stone-800 rounded-sm p-6 overflow-auto">
        <div className="grid grid-cols-7 gap-4 mb-4 text-center">
          {DAYS.map(day => (
            <div key={day} className="text-xs font-bold uppercase text-stone-500 tracking-widest">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4 auto-rows-[120px]">
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="bg-transparent" />
          ))}
          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();

            return (
              <div key={day} className={`bg-stone-950 border ${isToday ? 'border-gold-500' : 'border-stone-800'} rounded-sm p-3 relative hover:border-stone-600 transition-colors group overflow-hidden`}>
                <span className={`text-sm font-bold ${isToday ? 'text-gold-500' : 'text-stone-400'}`}>{day}</span>
                
                <div className="mt-2 space-y-1 max-h-[80px] overflow-y-auto custom-scrollbar">
                  {dayEvents.map(evt => (
                    <motion.div 
                      key={evt.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-[9px] p-1 rounded border truncate cursor-pointer ${
                        evt.status === 'CONFIRMED' 
                          ? 'bg-emerald-900/30 text-emerald-300 border-emerald-500/30' 
                          : 'bg-gold-900/30 text-gold-300 border-gold-500/30'
                      }`}
                    >
                      {evt.time} {evt.name}
                    </motion.div>
                  ))}
                </div>

                {/* Admin Quick Add (Hover) */}
                <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 text-xs text-stone-500 hover:text-white transition-opacity">
                  +
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
