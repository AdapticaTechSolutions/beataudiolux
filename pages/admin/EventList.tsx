
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminEvent } from '../../types';

const EventList: React.FC = () => {
  const { events, updateEventStatus } = useStore();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredEvents = events.filter(e => {
    const matchesFilter = filter === 'ALL' || e.status === filter;
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                          e.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: AdminEvent['status']) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PENDING': return 'bg-gold-500/10 text-gold-400 border-gold-500/20';
      case 'CANCELLED': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'COMPLETED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-stone-800 text-stone-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-stone-900 p-4 rounded-sm border border-stone-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="w-full bg-stone-950 border border-stone-800 rounded-sm pl-10 pr-4 py-2 text-sm text-stone-200 focus:border-gold-500/40 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-500" />
          <select 
            className="bg-stone-950 border border-stone-800 text-sm text-stone-400 p-2 rounded-sm outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-950 text-xs uppercase tracking-wider text-stone-500 border-b border-stone-800">
              <th className="p-4 font-medium">Event ID</th>
              <th className="p-4 font-medium">Client</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-stone-800">
            {filteredEvents.map(event => (
              <tr key={event.id} className="hover:bg-stone-800/30 transition-colors group">
                <td className="p-4 text-stone-400 font-mono text-xs">{event.id}</td>
                <td className="p-4">
                  <div className="font-bold text-stone-200">{event.name}</div>
                  <div className="text-xs text-stone-500">{event.eventType}</div>
                </td>
                <td className="p-4 text-stone-300">{event.date}</td>
                <td className="p-4 text-stone-300">{event.location}</td>
                <td className="p-4 font-mono text-gold-400">₱{event.totalAmount.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    {event.status === 'PENDING' && (
                      <>
                        <button title="Approve" onClick={() => updateEventStatus(event.id, 'CONFIRMED')} className="p-2 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-sm transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button title="Reject" onClick={() => updateEventStatus(event.id, 'CANCELLED')} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-sm transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-2 hover:bg-stone-700 rounded-sm transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-stone-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEvents.length === 0 && (
          <div className="p-12 text-center text-stone-500">
            No events found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
