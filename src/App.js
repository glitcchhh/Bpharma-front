// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import UserManagement from "./pages/UserManagement/userManagement";
import DistributorManagement from "./pages/UserManagement/Distributor";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Claim from "./pages/Product/claim";
import Offer from "./pages/Product/offer";
import Expiry from "./pages/Product/Expiry";
import Sample from "./pages/Product/Sample";
import "./assets/scss/custom.scss";
import NearExpiry from "./pages/Product/NearExpiry";
import Compliments from "./pages/Product/Compliments";
import ResponsiveDrawer from "./components/SideBarNew";
import { Box } from "@mui/material";
import AuthProvider from "./contexts/AuthProvider";
import Logout from "./pages/Logout";

function Layout({ children }) {
  const location = useLocation();

  // List of routes where you don't want to show the sidebar and header
  const noLayoutRoutes = ["/login"];

  // Check if the current route is in the noLayoutRoutes list
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <div style={{ display: "flex" }}>
      {/* {showLayout && <Sidebar />} */}
      {showLayout && <ResponsiveDrawer />}
      <div style={{ flex: 1, background: "#f1f1f2", overflow: "hidden" }}>
        {showLayout && <Header />}
        <Box
          style={{
            background: "#fff",
            borderRadius: "5px",
            width: "100%",
          }}
          padding={{
            xs: "20px",
            sm: "20px",
            md: "20px 50px",
            lg: "20px 50px",
          }}
        >
          {children}
        </Box>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/management/user" element={<UserManagement />} />
            <Route
              path="/management/distributor"
              element={<DistributorManagement />}
            />
            <Route path="/product/claim" element={<Claim />} />
            <Route path="/product/offer" element={<Offer />} />
            <Route path="/product/expiry" element={<Expiry />} />
            <Route path="/product/sample" element={<Sample />} />
            <Route path="/product/near-expiry" element={<NearExpiry />} />
            <Route path="/product/compliments" element={<Compliments />} />
            {/* Add more routes here */}
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
