
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Music, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../context/StoreContext';
import { Role } from '../../types';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>('SUPER_ADMIN');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(selectedRole);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      
      <div className="relative z-10 w-full max-w-md bg-stone-900/80 backdrop-blur-xl border border-stone-800 p-10 rounded-sm shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <Music className="text-stone-900 w-6 h-6" />
          </div>
          <h1 className="font-display font-bold text-2xl text-stone-100 tracking-widest">BEAT AUDIO</h1>
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mt-1">Admin Portal</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
             <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Select Role (Demo)</label>
             <div className="grid grid-cols-2 gap-2">
               {(['SUPER_ADMIN', 'MANAGER', 'STAFF', 'VIEWER'] as Role[]).map(role => (
                 <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-3 text-xs font-bold border rounded-sm transition-all ${
                    selectedRole === role 
                    ? 'bg-gold-500/20 border-gold-400 text-gold-300' 
                    : 'bg-stone-950 border-stone-800 text-stone-500 hover:border-gold-500/20'
                  }`}
                 >
                   {role.replace('_', ' ')}
                 </button>
               ))}
             </div>
          </div>

          <div className="bg-stone-950 p-4 rounded-sm border border-stone-800">
            <div className="flex items-center gap-2 text-green-400 text-xs mb-2">
              <ShieldCheck className="w-3 h-3" /> Secure Access
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              This is a demonstration login. In a production environment, this would require 2FA and secure credentials.
            </p>
          </div>

          <Button variant="primary" className="w-full" onClick={handleLogin}>
            Enter Portal
          </Button>

          <div className="text-center pt-2">
            <Link to="/" className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-gold-400 transition-colors uppercase tracking-widest font-medium">
              <ArrowLeft className="w-3 h-3" /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;