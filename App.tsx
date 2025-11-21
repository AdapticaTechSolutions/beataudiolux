
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Events from './pages/Events';
import Venues from './pages/Venues';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import About from './pages/About';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import EventList from './pages/admin/EventList';
import Calendar from './pages/admin/Calendar';
import Payments from './pages/admin/Payments';
import Users from './pages/admin/Users';

import { StoreProvider } from './context/StoreContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes (Main Website) */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/events" element={<Layout><Events /></Layout>} />
          <Route path="/venues" element={<Layout><Venues /></Layout>} />
          <Route path="/partners" element={<Layout><Partners /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/booking" element={<Layout><Booking /></Layout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/events" element={<AdminLayout><EventList /></AdminLayout>} />
          <Route path="/admin/calendar" element={<AdminLayout><Calendar /></AdminLayout>} />
          <Route path="/admin/payments" element={<AdminLayout><Payments /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><div className="text-stone-500 p-12">Settings Module Placeholder</div></AdminLayout>} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
