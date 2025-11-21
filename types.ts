
import { ReactNode } from "react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  price: number;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  category: 'Stylists' | 'Catering' | 'Food Carts' | 'Photobooth' | 'Event Planners';
  description: string;
  image: string;
}

export interface EventCategory {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  image: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  equipment: string[];
  addons: string[];
  notes: string;
}

// --- Admin & RBAC Types ---

export type Role = 'SUPER_ADMIN' | 'MANAGER' | 'STAFF' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  method: string;
  reference: string;
  proofImage?: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  notes?: string;
}

export interface AdminEvent extends BookingData {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID' | 'REFUNDED';
  totalAmount: number;
  createdAt: string;
  assignedStaff?: string[];
  payments: PaymentRecord[];
}
