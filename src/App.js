// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import UserManagement from './pages/userManagement';
import DistributorManagement from './pages/UserManagement/Distributor';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; 
import Claim from './pages/Product/claim'; 
import Offer from './pages/Product/offer'; 

function Layout({ children }) {
  const location = useLocation();
  
  // List of routes where you don't want to show the sidebar and header
  const noLayoutRoutes = ['/login'];

  // Check if the current route is in the noLayoutRoutes list
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <div style={{ display: 'flex' }}>
      {showLayout && <Sidebar />}
      <div style={{ flex: 1, background: "#f1f1f2" }}>
        {showLayout && <Header />}
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/management/user" element={<UserManagement />} />
          <Route path="/management/distributor" element={<DistributorManagement />} />
          <Route path="/product/claim" element={<Claim />} />
          <Route path="/product/offer" element={<Offer />} />
          {/* Add more routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
