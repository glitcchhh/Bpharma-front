import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Months = [
  null,
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getMonthName = (index) => {
  return Months.find((_, i) => i == index);
};

export const drawerData = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
    subTitle: "Detailed dashboard information",
  },
  {
    label: "Product",
    path: "/product",
    icon: <ShoppingCartIcon />,
    children: [
      {
        label: "Claim",
        path: "/product/claim",
        subTitle: "Detailed claim information",
      },
      {
        label: "Offer",
        path: "/product/offer",
        subTitle: "Detailed offer information",
      },
      {
        label: "Expiry",
        path: "/product/expiry",
        subTitle: "Detailed expiry information",
      },
      {
        label: "Sample",
        path: "/product/sample",
        subTitle: "Detailed sample information",
      },
      {
        label: "Near Expiry",
        path: "/product/near-expiry",
        subTitle: "Detailed near expiry information",
      },
      {
        label: "Compliments",
        path: "/product/compliments",
        subTitle: "Detailed compliments information",
      },
    ],
  },
  {
    label: "Management",
    path: "/management",
    icon: <PersonIcon />,
    children: [
      {
        label: "User",
        path: "/management/user",
        subTitle: "Detailed user information",
      },
      {
        label: "Distributor",
        path: "/management/distributor",
        subTitle: "Detailed distributor information",
      },
      {
        label: "Attach",
        path: "/management/attach",
        subTitle: "Detailed attach information",
      },
    ],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: <AssessmentIcon />,
    children: [
      {
        label: "Report 1",
        path: "/reports/report-1",
        subTitle: "Detailed reports information",
      },
    ],
  },
];

export const bottomItems = [
  // { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
  { label: "Logout", path: "/login", icon: <LogoutIcon /> },
];

export const userPermissions = [
  {
    user: "super-admin",
    permissions: [
      {
        path: "/product/claim",
        "/product/claim": { "create-user": false },
      },
      {
        path: "/product/offer",
        "/product/offer": { "create-user": false },
      },
      {
        path: "/product/expiry",
        "/product/expiry": { "create-user": false },
      },
      {
        path: "/product/sample",
        "/product/sample": { "create-user": false },
      },
      {
        path: "/product/near-expiry",
        "/product/near-expiry": { "create-user": false },
      },
      {
        path: "/product/compliments",
        "/product/compliments": { "create-user": false },
      },
    ],
  },
  {
    user: "tsm",
    permissions: [
      {
        path: "/product/claim",
        "/product/claim": { "create-user": true },
      },
      {
        path: "/product/offer",
        "/product/offer": { "create-user": true },
      },
      {
        path: "/product/expiry",
        "/product/expiry": { "create-user": true },
      },
      {
        path: "/product/sample",
        "/product/sample": { "create-user": true },
      },
      {
        path: "/product/near-expiry",
        "/product/near-expiry": { "create-user": true },
      },
      {
        path: "/product/compliments",
        "/product/compliments": { "create-user": true },
      },
    ],
  },
];
