import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useLocation, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Badge, Collapse, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { bottomItems, drawerData } from "../constants/Constants";
import { useAppBarTitle } from "../hooks/useAppBarTitle";
import { useAuth } from "../contexts/AuthProvider";
import { useUserPermission } from "../hooks/useUserPermissions";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Initialize location to get the current route
  const { getAppBarTitle } = useAppBarTitle();
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
  const { user: userDetails } = useAuth();
  const { getUserPermissions } = useUserPermission();

  const currentUser = userDetails.user;
  const TSM = currentUser == "tsm";
  const superAdmin = currentUser == "super-admin";

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
    // setOpen((prevState) => ({ ...prevState, [label]: !prevState[label] }));
    setOpen((prevState) => ({ [label]: !prevState[label] }));
  };

  const AppBarTitleValues = getAppBarTitle({
    path: location.pathname,
  });

  const AppBarTitle = AppBarTitleValues?.title;
  const subTitle = AppBarTitleValues?.subTitle;

  const drawer = (
    <div style={{ height: "100vh" }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "68px",
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
          {drawerData.map(({ icon, path, label, children }, index) => {
            const noDisplayPermission = getUserPermissions({
              permissionType: "no-display",
              currentPath: path,
            });

            if (!noDisplayPermission) {
              return (
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
                    {children &&
                      (open[label] ? <ExpandLess /> : <ExpandMore />)}
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
              );
            }
          })}
        </List>

        <Box marginTop={"5em"}>
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
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "white",
          color: "grey",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            height: {
              md: "68px",
            },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box>
            <Typography
              sx={{
                color: "black",
                fontSize: {
                  xs: "16px",
                  md: "22px",
                },
                lineHeight: "normal",
              }}
              variant="h5"
              noWrap
              component="div"
            >
              {AppBarTitle}
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: {
                  xs: "11px",
                  md: "13px",
                },
                lineHeight: "normal",
              }}
              variant="p"
              noWrap
              component="small"
            >
              {subTitle}
            </Typography>
          </Box>

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

        <Divider />
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
            display: { xs: "block", md: "none" },
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
            display: { xs: "none", md: "block" },
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
    </Box>
  );
}

export default ResponsiveDrawer;
