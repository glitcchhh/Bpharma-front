import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useLocation, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Badge, Collapse } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
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
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  // Handler for navigating to different routes
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Function to determine if a tab is selected
  const isSelected = (path) => location.pathname === path;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [open, setOpen] = React.useState({});
  const handleToggle = (label) => {
    setOpen((prevState) => ({ ...prevState, [label]: !prevState[label] }));
  };

  const drawerData = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Product",
      path: "/product",
      icon: <ShoppingCartIcon />,
      children: [
        { label: "Claim", path: "/product/claim" },
        { label: "Offer", path: "/product/offer" },
        { label: "Expiry", path: "/product/expiry" },
        { label: "Sample", path: "/product/sample" },
        { label: "Near Expiry", path: "/product/near-expiry" },
        { label: "Compliments", path: "/product/compliments" },
      ],
    },
    {
      label: "Management",
      path: "/management",
      icon: <PersonIcon />,
      children: [
        { label: "User", path: "/management/user" },
        { label: "Distributor", path: "/management/distributor" },
        { label: "Territory", path: "/management/territory" },
        { label: "Attach", path: "/management/attach" },
      ],
    },
  ];

  const bottomItems = [
    { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
    { label: "Logout", path: "/logout", icon: <LogoutIcon /> },
  ];

  const drawer = (
    <div style={{ height: "100vh" }}>
      <Toolbar>
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
      </Toolbar>
      <Divider />

      <Box
        sx={{
          bgcolor: "background.paper",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List component="nav">
          {drawerData.map(({ icon, path, label, children }, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => {
                  if (children) {
                    handleToggle(label);
                  } else {
                    handleNavigation(path);
                  }
                }}
                sx={{
                  bgcolor: isSelected(path) ? "#edf4fb" : "inherit",
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
                {children && (open[label] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {children && (
                <Collapse in={open[label]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {children.map((child) => (
                      <ListItemButton
                        key={child.label}
                        sx={{ pl: 4 }}
                        onClick={() => handleNavigation(child.path)}
                        selected={isSelected(child.path)}
                      >
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        <Box>
          {bottomItems.map(({ icon, path, label }) => (
            <ListItemButton
              key={label}
              onClick={() => handleNavigation(path)}
              sx={{ bgcolor: isSelected(path) ? "#edf4fb" : "inherit" }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </Box>
      </Box>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white",
          color: "grey",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box> */}
    </Box>
  );
}

export default ResponsiveDrawer;
