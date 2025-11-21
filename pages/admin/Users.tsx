
import React from 'react';
import { Shield, Mail, MoreVertical } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';

const Users: React.FC = () => {
  const { users } = useStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold text-stone-100">Team Access</h2>
        <Button variant="primary" size="sm">+ Add Member</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-stone-900 border border-stone-800 p-6 rounded-sm hover:border-gold-500/30 transition-colors group relative">
             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-stone-500 hover:text-white">
               <MoreVertical className="w-4 h-4" />
             </div>
             
             <div className="flex items-center gap-4 mb-6">
               <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full border-2 border-stone-800 group-hover:border-gold-500/50 transition-colors" />
               <div>
                 <h3 className="font-bold text-stone-200">{user.name}</h3>
                 <div className="flex items-center gap-2 text-xs text-gold-500 mt-1">
                   <Shield className="w-3 h-3" />
                   <span className="uppercase tracking-wider">{user.role.replace('_', ' ')}</span>
                 </div>
               </div>
             </div>
             
             <div className="space-y-3">
               <div className="flex items-center gap-3 text-sm text-stone-400 bg-stone-950 p-3 rounded-sm border border-stone-800">
                 <Mail className="w-4 h-4" />
                 <span className="truncate">{user.email}</span>
               </div>
             </div>

             <div className="mt-6 pt-6 border-t border-stone-800 flex justify-between items-center">
               <span className="text-[10px] text-stone-600 uppercase tracking-widest">Last Active: 2h ago</span>
               <button className="text-xs text-stone-400 hover:text-white transition-colors">Edit Permissions</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
