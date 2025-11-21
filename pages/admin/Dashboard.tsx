
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Users, Activity, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const Dashboard: React.FC = () => {
  const { events } = useStore();

  const totalRevenue = events.reduce((acc, curr) => acc + (curr.paymentStatus === 'PAID' ? curr.totalAmount : 0), 0);
  const pendingCount = events.filter(e => e.status === 'PENDING').length;
  const upcomingCount = events.filter(e => new Date(e.date) > new Date()).length;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `₱${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Pending Requests', value: pendingCount, icon: Activity, color: 'text-gold-400' },
          { label: 'Upcoming Events', value: upcomingCount, icon: Calendar, color: 'text-blue-400' },
          { label: 'Total Bookings', value: events.length, icon: Users, color: 'text-purple-400' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-stone-900 border border-stone-800 p-6 rounded-sm hover:border-gold-500/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-md bg-stone-950 ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs text-stone-500 font-bold uppercase tracking-wider bg-stone-950 px-2 py-1 rounded-sm">+12%</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-stone-100 mb-1">{stat.value}</h3>
            <p className="text-stone-400 text-xs font-medium uppercase tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 p-6 rounded-sm min-h-[300px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-display font-bold text-lg text-stone-200">Revenue Overview</h3>
             <select className="bg-stone-950 border border-stone-800 text-xs text-stone-400 p-2 rounded-sm outline-none">
               <option>This Year</option>
               <option>Last Year</option>
             </select>
          </div>
          <div className="flex-1 flex items-end justify-between gap-2 px-4">
             {/* Simple CSS Bar Chart */}
             {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((h, i) => (
               <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full bg-gold-500/20 hover:bg-gold-500/40 rounded-t-sm relative group"
               >
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 text-[10px] bg-stone-800 px-2 py-1 rounded text-white transition-opacity">
                   {h}%
                 </div>
               </motion.div>
             ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-stone-500 uppercase font-medium">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm">
          <h3 className="font-display font-bold text-lg text-stone-200 mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            {events.slice(0, 4).map(event => (
              <div key={event.id} className="flex items-center gap-4 p-3 hover:bg-stone-800/50 rounded-sm transition-colors border border-transparent hover:border-stone-800">
                <div className="w-10 h-10 rounded-full bg-stone-950 flex items-center justify-center border border-stone-800">
                  <span className="font-bold text-xs text-gold-500">{event.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-stone-200 truncate">{event.name}</p>
                  <p className="text-xs text-stone-500 truncate">{event.eventType} • {event.date}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
