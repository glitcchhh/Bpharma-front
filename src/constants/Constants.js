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
    title: "Dashboard",
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
        title: "Product Claim",
        subTitle: "Detailed claim information",
      },
      {
        label: "Offer",
        path: "/product/offer",
        title: "Product Offer",
        subTitle: "Detailed offer information",
      },
      {
        label: "Expiry",
        path: "/product/expiry",
        title: "Product Expiry",
        subTitle: "Detailed expiry information",
      },
      {
        label: "Sample",
        path: "/product/sample",
        title: "Sample Request",
        subTitle: "Detailed sample information",
      },
      // {
      //   label: "Near Expiry",
      //   path: "/product/near-expiry",
      //   title: "Near Expiry Request",
      //   subTitle: "Detailed near expiry information",
      // },
      {
        label: "Compliments",
        path: "/product/compliments",
        title: "Compliments",
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
        title: "User Management",
        subTitle: "Detailed user information",
      },
      {
        label: "Distributor",
        path: "/management/distributor",
        title: "Distributor Management",
        subTitle: "Detailed distributor information",
      },
      {
        label: "Product",
        path: "/management/product",
        title: "Product Management",
        subTitle: "Detailed product information",
      },
      // {
      //   label: "Attach",
      //   path: "/management/attach",
      //   title: "Attach Management",
      //   subTitle: "Detailed attach information",
      // },
    ],
  },
  // {
  //   label: "Reports",
  //   path: "/reports",
  //   icon: <AssessmentIcon />,
  //   children: [
  //     {
  //       label: "Report 1",
  //       path: "/reports/report-1",
  //       title: "Report 1",
  //       subTitle: "Detailed reports information",
  //     },
  //   ],
  // },
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
        "/product/claim": {
          "create-user": false,
          accept: true,
          reject: true,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/offer",
        "/product/offer": {
          "create-user": false,
          accept: true,
          reject: true,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/expiry",
        "/product/expiry": {
          "create-user": false,
          accept: true,
          reject: true,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/sample",
        "/product/sample": {
          "create-user": false,
          accept: true,
          reject: true,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/near-expiry",
        "/product/near-expiry": {
          "create-user": false,
          accept: true,
          reject: true,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/compliments",
        "/product/compliments": {
          "create-user": false,
          accept: true,
          reject: true,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/management/user",
        "/management/user": {
          "create-user": true,
          accept: true,
          reject: true,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/management/distributor",
        "/management/distributor": {
          "create-user": true,
          accept: false,
          reject: false,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/management/product",
        "/management/product": {
          "create-user": true,
          accept: false,
          reject: false,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/management/attach",
        "/management/attach": {
          "create-user": true,
          accept: true,
          reject: true,
          delete: false,
          edit: true,
        },
      },
    ],
  },
  {
    user: "tsm",
    permissions: [
      {
        path: "/product/claim",
        "/product/claim": {
          "create-user": true,
          accept: false,
          reject: false,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/offer",
        "/product/offer": {
          "create-user": true,
          accept: false,
          reject: false,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/expiry",
        "/product/expiry": {
          "create-user": true,
          accept: false,
          reject: false,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/sample",
        "/product/sample": {
          "create-user": true,
          accept: false,
          reject: false,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/near-expiry",
        "/product/near-expiry": {
          "create-user": true,
          accept: false,
          reject: false,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/product/compliments",
        "/product/compliments": {
          "create-user": true,
          accept: false,
          reject: false,
          delete: false,
          edit: true,
        },
      },
      {
        path: "/management",
        "/management": {
          "no-display": true,
        },
      },
      {
        path: "/management/user",
        "/management/user": {
          "no-display": true,
          "create-user": false,
          accept: false,
          reject: false,
          delete: false,
          edit: false,
        },
      },
      {
        path: "/management/distributor",
        "/management/distributor": {
          "no-display": true,
          "create-user": false,
          accept: false,
          reject: false,
          delete: false,
          edit: false,
        },
      },
      {
        path: "/management/product",
        "/management/product": {
          "no-display": true,
          "create-user": false,
          accept: false,
          reject: false,
          delete: false,
          edit: false,
        },
      },
      {
        path: "/management/attach",
        "/management/attach": {
          "no-display": true,
          "create-user": false,
          accept: false,
          reject: false,
          delete: false,
          edit: false,
        },
      },
    ],
  },
];
