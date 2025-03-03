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
import { Height } from "@mui/icons-material";
import { useUserPermission } from "./hooks/useUserPermissions";

const Sample = React.lazy(() => import("./pages/Product/Sample"));
const User = React.lazy(() => import("./pages/UserManagement/User"));
const DistributorManagement = React.lazy(() =>
  import("./pages/UserManagement/Distributor")
);

const Attach = React.lazy(() => import("./pages/UserManagement/Attach"));
const Product = React.lazy(() => import("./pages/UserManagement/Product"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const Claim = React.lazy(() => import("./pages/Product/Claim"));
const Offer = React.lazy(() => import("./pages/Product/OfferPage"));
const Expiry = React.lazy(() => import("./pages/Product/Expiry"));
const NearExpiry = React.lazy(() => import("./pages/Product/NearExpiry"));
const Compliments = React.lazy(() => import("./pages/Product/Compliments"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

function Layout({ children }) {
  const location = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();

  const { pathname: currentPath } = location;
  const { getUserPermissions } = useUserPermission();
  const noDisplayPermission = getUserPermissions({
    permissionType: "no-display",
  });

  useEffect(() => {
    if (!token) {
      if (currentPath == "/forgot-password") return;
      if (currentPath == "/sign-up") return;
      if (currentPath == "/error") return;
      navigate("/login");
    } else {
      if (noDisplayPermission) {
        navigate("/login");
        window.location.reload();
      }
      if (currentPath == "/") navigate("/dashboard");
    }
  }, [token, currentPath, noDisplayPermission]);

  // List of routes where you don't want to show the sidebar and header
  const noLayoutRoutes = ["/login"];

  // Check if the current route is in the noLayoutRoutes list
  const showLayout = !noLayoutRoutes.includes(location.pathname) && token;

  return (
    <div style={{ display: "flex" }}>
      {showLayout && <ResponsiveDrawer />}
      <div
        style={{
          flex: 1,
          background: "#fff",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
          }}
          padding={
            showLayout
              ? {
                  xs: "20px 10px",
                  sm: "30px 20px",
                  md: "40px 20px",
                  lg: "40px 20px",
                }
              : {}
          }
          sx={{
            background: showLayout ? "#f1f1f2" : "#fff",
            mt: showLayout
              ? {
                  xs: "55px",
                  sm: "65px",
                  lg: "65px",
                }
              : {},
          }}
        >
          <Box
            sx={{
              background: "#fff",
              borderRadius: showLayout
                ? {
                    xs: "10px",
                    md: "10px",
                  }
                : {},
            }}
            padding={
              showLayout
                ? {
                    xs: "20px",
                    sm: "20px",
                    md: "20px",
                    lg: "20px",
                  }
                : {}
            }
          >
            {children}
          </Box>
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
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/management/user" element={<User />} />
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
              <Route path="/management/product" element={<Product />} />
              {/* Add more routes here */}
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
