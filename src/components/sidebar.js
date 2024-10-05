import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/material";

export default function NestedList() {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Initialize location to get the current route

  const [openProduct, setOpenProduct] = React.useState(false);
  const [openManagement, setOpenManagement] = React.useState(false);

  const handleProductClick = () => {
    setOpenProduct(!openProduct);
  };

  const handleManagementClick = () => {
    setOpenManagement(!openManagement);
  };

  // Handler for navigating to different routes
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Function to determine if a tab is selected
  const isSelected = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
        bgcolor: "background.paper",
      }}
    >
      <List component="nav" sx={{ padding: 0,margin:"0px 10px" }}>
        {/* Logo section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
            bgcolor: "white",
            color: "#3f51b5",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="BBMS Logo"
            style={{ height: "30px", objectFit: "contain" }}
          />
        </Box>

        {/* Dashboard */}
        <ListItemButton
          onClick={() => handleNavigation("/dashboard")}
          sx={{
            bgcolor: isSelected("/dashboard") ? "#1976d2" : "inherit",
            color: isSelected("/dashboard") ? "#fff" : "inherit",
            borderRadius: "5px"
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Product with sub-items */}
        <ListItemButton onClick={handleProductClick}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Product" />
          {openProduct ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openProduct} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                bgcolor: isSelected("/product/1") ? "#1976d2" : "inherit",
                color: isSelected("/product/1") ? "#fff" : "inherit",
                borderRadius: "5px"
              }}
              onClick={() => handleNavigation("/product/1")}
            >
              <ListItemText primary="Product 1" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                bgcolor: isSelected("/product/2") ? "#1976d2" : "inherit",
                color: isSelected("/product/2") ? "#fff" : "inherit",
                borderRadius: "5px"
              }}
              onClick={() => handleNavigation("/product/2")}
            >
              <ListItemText primary="Product 2" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Management with sub-items */}
        <ListItemButton onClick={handleManagementClick}>
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Management" />
          {openManagement ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openManagement} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                bgcolor: isSelected("/management/user") ? "#1976d2" : "inherit",
                color: isSelected("/management/user") ? "#fff" : "inherit",
                borderRadius: "5px"
              }}
              onClick={() => handleNavigation("/management/user")}
            >
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                bgcolor: isSelected("/management/distributor") ? "#1976d2" : "inherit",
                color: isSelected("/management/distributor") ? "#fff" : "inherit",
                borderRadius: "5px"
              }}
              onClick={() => handleNavigation("/management/distributor")}
            >
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Distributor" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                bgcolor: isSelected("/management/territory") ? "#1976d2" : "inherit",
                color: isSelected("/management/territory") ? "#fff" : "inherit",
                borderRadius: "5px"
              }}
              onClick={() => handleNavigation("/management/territory")}
            >
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Territory" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* Bottom items */}
      <Box>
        <ListItemButton
          onClick={() => handleNavigation("/settings")}
          sx={{
            bgcolor: isSelected("/settings") ? "#1976d2" : "inherit",
            color: isSelected("/settings") ? "#fff" : "inherit",
            borderRadius: "5px"
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handleNavigation("/logout")}
          sx={{
            bgcolor: isSelected("/logout") ? "#1976d2" : "inherit",
            color: isSelected("/logout") ? "#fff" : "inherit",
            borderRadius: "5px"
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </Box>
    </Box>
  );
}
