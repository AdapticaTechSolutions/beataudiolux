
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminEvent, User, Role, BookingData } from '../types';

interface StoreContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
  events: AdminEvent[];
  addEvent: (data: BookingData) => void;
  updateEventStatus: (id: string, status: AdminEvent['status']) => void;
  updatePaymentStatus: (eventId: string, paymentId: string, status: 'VERIFIED' | 'REJECTED') => void;
  isDateBlocked: (date: string) => boolean;
  users: User[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const MOCK_USERS: User[] = [
  { id: '1', name: 'Alexandra Sabater', email: 'alex@beataudio.com', role: 'SUPER_ADMIN', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Event Manager', email: 'manager@beataudio.com', role: 'MANAGER', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Tech Lead', email: 'staff@beataudio.com', role: 'STAFF', avatar: 'https://i.pravatar.cc/150?u=3' },
];

// Seed some future events
const TODAY = new Date();
const NEXT_MONTH = new Date(TODAY);
NEXT_MONTH.setDate(TODAY.getDate() + 35); // 35 days from now

const MOCK_EVENTS: AdminEvent[] = [
  {
    id: 'evt-001',
    name: 'Isabella & James Wedding',
    email: 'bellajames@gmail.com',
    phone: '09171234567',
    eventType: 'Wedding',
    date: NEXT_MONTH.toISOString().split('T')[0],
    time: '14:00',
    location: 'The Grand Ballroom',
    equipment: ['sound', 'lights', 'led'],
    addons: [],
    notes: 'Garden theme, heavy on floral lights.',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    totalAmount: 150000,
    createdAt: new Date().toISOString(),
    payments: [
      { id: 'pay-1', amount: 150000, date: new Date().toISOString(), method: 'Bank Transfer', reference: 'BPI-12399', status: 'VERIFIED' }
    ]
  },
  {
    id: 'evt-002',
    name: 'TechCorp Gala Night',
    email: 'events@techcorp.ph',
    phone: '09189998888',
    eventType: 'Corporate',
    date: new Date(TODAY.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '18:00',
    location: 'Sky Garden',
    equipment: ['sound', 'led', 'truss'],
    addons: [],
    notes: 'Need CO2 blasters.',
    status: 'PENDING',
    paymentStatus: 'UNPAID',
    totalAmount: 85000,
    createdAt: new Date().toISOString(),
    payments: []
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('beat_admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  
  const [events, setEvents] = useState<AdminEvent[]>(MOCK_EVENTS);
  const [users] = useState<User[]>(MOCK_USERS);

  const login = (role: Role) => {
    // Simulating login by picking the first user of that role or default
    const u = users.find(u => u.role === role) || users[0];
    setUser(u);
    localStorage.setItem('beat_admin_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('beat_admin_user');
  };

  const addEvent = (data: BookingData) => {
    const newEvent: AdminEvent = {
      ...data,
      id: `evt-${Date.now()}`,
      status: 'PENDING',
      paymentStatus: 'UNPAID',
      totalAmount: 50000, // Simplified calc
      createdAt: new Date().toISOString(),
      payments: []
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEventStatus = (id: string, status: AdminEvent['status']) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const updatePaymentStatus = (eventId: string, paymentId: string, status: 'VERIFIED' | 'REJECTED') => {
    setEvents(prev => prev.map(e => {
      if (e.id !== eventId) return e;
      const updatedPayments = e.payments.map(p => p.id === paymentId ? { ...p, status } : p);
      // Auto update event status if paid
      const allPaid = updatedPayments.every(p => p.status === 'VERIFIED');
      return {
        ...e,
        payments: updatedPayments,
        paymentStatus: allPaid ? 'PAID' : e.paymentStatus,
        status: allPaid && e.status === 'PENDING' ? 'CONFIRMED' : e.status
      };
    }));
  };

  // BUSINESS RULE: Minimum 30 days booking window
  // BUSINESS RULE: Date Conflict
  const isDateBlocked = (dateStr: string) => {
    const checkDate = new Date(dateStr);
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 30);

    // Rule 1: Minimum Booking Window
    if (checkDate < minDate) return true;

    // Rule 2: Date Conflict (if confirmed)
    const conflict = events.some(e => 
      e.date === dateStr && e.status !== 'CANCELLED' && e.status !== 'PENDING'
    );
    
    return conflict;
  };

  return (
    <StoreContext.Provider value={{ 
      user, login, logout, events, addEvent, updateEventStatus, updatePaymentStatus, isDateBlocked, users 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
