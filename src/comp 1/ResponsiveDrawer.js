import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { drawerData, bottomItems, userPermissions } from "../constants/Constants.jxs";

const ResponsiveDrawer = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState({});
  
  // ✅ Get permissions for logged-in role
  const rolePermissions = userPermissions.find((u) => u.user === role)?.permissions || [];

  // ✅ Helper: check if a path is marked as no-display
  const isHidden = (path) => {
    const perm = rolePermissions.find((p) => p.path === path);
    return perm && perm[path]?.["no-display"] === true;
  };

  // ✅ Helper: check if menu is allowed for role
  const canAccess = (itemRole) => {
    if (itemRole === "both") return true;
    return itemRole === role;
  };

  // Toggle submenu
  const handleToggle = (label) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List>
        {drawerData.map((item) => {
          if (!canAccess(item.role) || isHidden(item.path)) return null;

          if (item.children) {
            return (
              <React.Fragment key={item.label}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleToggle(item.label)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    {open[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={open[item.label]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => {
                      if (!canAccess(child.role) || isHidden(child.path)) return null;

                      return (
                        <ListItemButton
                          key={child.label}
                          sx={{ pl: 4 }}
                          selected={location.pathname === child.path}
                          onClick={() => navigate(child.path)}
                        >
                          <ListItemText primary={child.label} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }

          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* ✅ Bottom Items (Logout, Settings, etc.) */}
      <List sx={{ marginTop: "auto" }}>
        {bottomItems.map((item) => {
          if (!canAccess(item.role) || isHidden(item.path)) return null;

          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default ResponsiveDrawer;


