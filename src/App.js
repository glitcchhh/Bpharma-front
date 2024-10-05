// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import UserManagement from './pages/userManagement';
import DistributorManagement from './pages/UserManagement/Distributor';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 ,background:"#f1f1f2"}}>
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/management/user" element={<UserManagement />} />
            <Route path="/management/distributor" element={<DistributorManagement />} />
            {/* Add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
