import React, { useState } from "react";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AdvancedPermissionTable from "./component/AdvancedPermissionTable";

// make sure data passed to table have same id as headCells passed to its table
const headCells = [
  {
    id: "id",
  },
  {
    id: "page",
    disablePadding: false,
    label: "Page",
  },
  {
    id: "all",
    disablePadding: false,
    label: "All",
    notSortable: true,
  },
  {
    id: "view",
    disablePadding: false,
    label: "View",
    notSortable: true,
  },
  {
    id: "add",
    disablePadding: false,
    label: "Add",
    notSortable: true,
  },
  {
    id: "edit",
    disablePadding: false,
    label: "Edit",
    notSortable: true,
  },
  {
    id: "delete",
    disablePadding: false,
    label: "Delete",
    notSortable: true,
  },
];

const Component = ({ name = "", ...props }) => {
  return (
    <>
      <input
        className="permission-box"
        type="checkbox"
        name={name}
        {...props}
      />
    </>
  );
};

const Attach = () => {
  const { saveDataIngestion, isLoading } = useDataIngestion();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [data] = useState([
    {
      id: "Claim",
      page: "Claim",
      all: { Component: Component },
      view: { Component: Component },
      add: { Component: Component },
      edit: { Component: Component },
      delete: { Component: Component },
    },
    {
      id: "Offer",
      page: "Offer",
      all: { Component: Component },
      view: { Component: Component },
      add: { Component: Component },
      edit: { Component: Component },
      delete: { Component: Component },
    },

    {
      id: "Expiry",
      page: "Expiry",
      all: { Component: Component },
      view: { Component: Component },
      add: { Component: Component },
      edit: { Component: Component },
      delete: { Component: Component },
    },

    {
      id: "Sample",
      page: "Sample",
      all: { Component: Component },
      view: { Component: Component },
      add: { Component: Component },
      edit: { Component: Component },
      delete: { Component: Component },
    },
  ]);

  const tags = ["all", "view", "add", "edit", "delete"];
  const acceptPermissionsAsBulk = ({ currentRow = null, checked = true }) => {
    const Data = currentRow || data;

    setPermissions((prevPermissions) => {
      const updatedPermissions = [...prevPermissions];

      Data.forEach(({ id }) => {
        tags.forEach((tag) => {
          const index = updatedPermissions.findIndex(
            (perm) => perm.row === id && perm.value === tag
          );

          if (index !== -1) {
            // Update existing permission
            updatedPermissions[index] = {
              ...updatedPermissions[index],
              checked: checked,
            };
          } else {
            // Add new permission
            updatedPermissions.push({
              row: id,
              value: tag,
              checked: checked,
            });
          }
        });
      });

      return updatedPermissions;
    });
  };

  const HandlePermissions = ({ event, row }) => {
    const { value, checked } = event.target;

    setPermissions((prev) => {
      const updatedPermissions = prev.map((permission) => {
        if (permission.row === row && permission.value === value) {
          return {
            ...permission,
            checked: checked,
          };
        }
        return permission;
      });

      // Check if the row and value exist in the permissions array
      const exists = updatedPermissions.some(
        (permission) => permission.row === row && permission.value === value
      );

      // If the row and value do not exist, add a new entry
      if (!exists) {
        updatedPermissions.push({
          row: row,
          value: value,
          checked: checked,
        });
      }

      return updatedPermissions;
    });
  };

  return (
    <>
      {!isLoading && (
        <>
          <h2>Attach</h2>

          <Box
            sx={{
              my: {
                xs: "50px",
                md: "20px",
              },
              display: "flex",
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <div>
              <FormControl
                sx={{
                  minWidth: 180,
                  width: {
                    xs: "100%",
                    md: 180,
                  },
                }}
                size="small"
              >
                <InputLabel id="demo-simple-select-label">User role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="User role"
                >
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  marginLeft: {
                    md: "10px",
                    xs: 0,
                  },
                  minWidth: 180,
                  width: {
                    xs: "100%",
                    md: 180,
                  },
                  marginTop: {
                    xs: "10px",
                    md: 0,
                  },
                }}
                size="small"
              >
                <InputLabel id="demo-simple-select-label">Module</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Module"
                >
                  <MenuItem value={"Product"}>Product</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                sx={{
                  display: "block",
                  textTransform: "capitalize",
                  marginTop: {
                    xs: "10px",
                    md: 0,
                  },
                  float: {
                    xs: "right",
                  },
                  width: {
                    xs: "100%",
                  },
                }}
                variant="contained"
              >
                Search
              </Button>
            </div>
          </Box>
          {!data.length && <p>No Data Available</p>}
          {!!data.length && (
            <AdvancedPermissionTable
              data={data}
              headCells={headCells}
              showToolBar={false}
              HandlePermissions={HandlePermissions}
              permissions={permissions}
              acceptPermissionsAsBulk={acceptPermissionsAsBulk}
            />
          )}
          <Box
            sx={{
              mt: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                display: "block",
                backgroundColor: "darkgreen",
                textTransform: "capitalize",
                width: {
                  xs: "100%",
                  md: "fit-content",
                },
                padding: "10px 15px",
              }}
              variant="contained"
            >
              Approve
            </Button>
            <Button
              sx={{
                display: "block",
                marginLeft: "15px",
                backgroundColor: "red",
                textTransform: "capitalize",
                width: {
                  xs: "100%",
                  md: "fit-content",
                },
                padding: "10px 15px",
              }}
              variant="contained"
            >
              Clear
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default Attach;
