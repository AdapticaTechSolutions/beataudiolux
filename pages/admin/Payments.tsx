
import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const Payments: React.FC = () => {
  const { events, updatePaymentStatus } = useStore();

  // Flatten events to get all payments
  const allPayments = events.flatMap(evt => 
    evt.payments.map(p => ({ ...p, eventName: evt.name, eventId: evt.id }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-display font-bold text-stone-100">Payment Verification Center</h2>

      <div className="grid grid-cols-1 gap-6">
        {allPayments.length === 0 ? (
           <div className="p-12 bg-stone-900 border border-stone-800 text-center text-stone-500 rounded-sm">
             No payment records found.
           </div>
        ) : allPayments.map(payment => (
          <div key={payment.id} className="bg-stone-900 border border-stone-800 p-6 rounded-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Proof Image */}
            <div className="w-full md:w-48 h-32 bg-stone-950 rounded-sm border border-stone-800 flex items-center justify-center relative overflow-hidden group cursor-pointer">
              {payment.proofImage ? (
                <img src={payment.proofImage} alt="Proof" className="w-full h-full object-cover" />
              ) : (
                <div className="text-stone-600 text-xs uppercase tracking-wider">No Image</div>
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white">
                View Proof
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-sm ${
                  payment.status === 'VERIFIED' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                  payment.status === 'REJECTED' ? 'text-red-400 border-red-500/20 bg-red-500/10' : 
                  'text-gold-400 border-gold-500/20 bg-gold-500/10'
                }`}>
                  {payment.status}
                </span>
                <span className="text-stone-500 text-xs">{payment.date.split('T')[0]}</span>
              </div>
              <h3 className="font-bold text-stone-200 text-lg">{payment.eventName}</h3>
              <p className="text-stone-400 text-sm mb-4">Ref: <span className="font-mono text-stone-300">{payment.reference}</span> via {payment.method}</p>
              <div className="font-display font-bold text-2xl text-gold-400">₱{payment.amount.toLocaleString()}</div>
            </div>

            {/* Actions */}
            {payment.status === 'PENDING' && (
              <div className="flex gap-3">
                 <button 
                  onClick={() => updatePaymentStatus(payment.eventId, payment.id, 'REJECTED')}
                  className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-sm flex items-center gap-2 text-sm transition-colors"
                 >
                   <X className="w-4 h-4" /> Reject
                 </button>
                 <button 
                  onClick={() => updatePaymentStatus(payment.eventId, payment.id, 'VERIFIED')}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm flex items-center gap-2 text-sm shadow-lg shadow-emerald-900/50 transition-colors"
                 >
                   <Check className="w-4 h-4" /> Verify
                 </button>
              </div>
            )}
            {payment.status === 'VERIFIED' && (
               <div className="text-emerald-500 flex items-center gap-2 text-sm">
                 <Check className="w-4 h-4" /> Verified by Admin
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
