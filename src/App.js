// src/App.js
import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/header";
import "./assets/scss/custom.scss";

import ResponsiveDrawer from "./components/SideBarNew";
import { Box } from "@mui/material";
import AuthProvider, { useAuth } from "./contexts/AuthProvider";

const Sample = React.lazy(() => import("./pages/Product/Sample"));
const UserManagement = React.lazy(() =>
  import("./pages/UserManagement/userManagement")
);
const DistributorManagement = React.lazy(() =>
  import("./pages/UserManagement/Distributor")
);

const Attach = React.lazy(() => import("./pages/UserManagement/Attach"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const Claim = React.lazy(() => import("./pages/Product/claim"));
const Offer = React.lazy(() => import("./pages/Product/offer"));
const Expiry = React.lazy(() => import("./pages/Product/Expiry"));
const NearExpiry = React.lazy(() => import("./pages/Product/NearExpiry"));
const Compliments = React.lazy(() => import("./pages/Product/Compliments"));
const Logout = React.lazy(() => import("./pages/Logout"));

function Layout({ children }) {
  const location = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  // List of routes where you don't want to show the sidebar and header
  const noLayoutRoutes = ["/login"];

  // Check if the current route is in the noLayoutRoutes list
  const showLayout = !noLayoutRoutes.includes(location.pathname) && token;

  return (
    <div style={{ display: "flex" }}>
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
          <Suspense fallback={"loading ...."}>
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
              <Route path="/management/attach" element={<Attach />} />
              {/* Add more routes here */}
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
