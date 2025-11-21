
import React from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Users, CreditCard, Settings, LogOut, Music, FileText, Globe } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Role } from '../../types';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  roles: Role[];
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'VIEWER'] },
  { name: 'Events', path: '/admin/events', icon: FileText, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF'] },
  { name: 'Calendar', path: '/admin/calendar', icon: Calendar, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'VIEWER'] },
  { name: 'Payments', path: '/admin/payments', icon: CreditCard, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'Users', path: '/admin/users', icon: Users, roles: ['SUPER_ADMIN'] },
  { name: 'Settings', path: '/admin/settings', icon: Settings, roles: ['SUPER_ADMIN'] },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-stone-950 text-stone-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 border-r border-stone-800 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-stone-800">
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <Music className="text-stone-900 w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg tracking-widest text-stone-100">
            BEAT <span className="text-gold-400">ADMIN</span>
          </span>
        </div>

        <div className="p-6 border-b border-stone-800 flex items-center gap-4">
          <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full border border-gold-500/30" />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-stone-100 truncate">{user.name}</p>
            <p className="text-[10px] text-gold-500 tracking-wider uppercase">{user.role.replace('_', ' ')}</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            if (!item.roles.includes(user.role)) return null;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-300 text-sm font-medium ${
                  isActive 
                  ? 'bg-gold-500/10 text-gold-400 border-r-2 border-gold-400' 
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-stone-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-stone-800 space-y-1">
          <Link 
            to="/"
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-stone-400 hover:bg-stone-800 hover:text-stone-200 rounded-sm transition-colors"
          >
            <Globe className="w-4 h-4" />
            Back to Website
          </Link>
          <button 
            onClick={() => { logout(); }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-stone-950 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 opacity-50" />
        
        {/* Header */}
        <header className="h-16 bg-stone-950/50 backdrop-blur border-b border-stone-800 flex items-center justify-between px-8 shrink-0 z-10">
          <h1 className="font-display font-bold text-xl text-stone-200 tracking-wide">
            {NAV_ITEMS.find(i => i.path === location.pathname)?.name || 'Portal'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-xs text-stone-500 font-mono">v2.5.0</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
           {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
