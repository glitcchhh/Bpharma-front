// src/pages/UserManagement.js
import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewUserModal from "./component/NewUserModal"; // Import the modal component
import { red } from "@mui/material/colors";

// Sample user data
const users = [
  { code: "BP-012", name: "Sam", email: "sam@xyz.com", phone: "9999999999" },
  { code: "BP-012", name: "Sam", email: "sam@xyz.com", phone: "9999999999" },
  { code: "BP-012", name: "Sam", email: "sam@xyz.com", phone: "9999999999" },
];

function UserManagement() {
  const [open, setOpen] = useState(false);

  // Functions to handle dialog (modal) open and close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        padding: "20px",
        margin: "20px",
        background: "#fff",
        borderRadius: "5px",
      }}
    >
      <h2>User Management</h2>

      {/* New User Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{ textTransform: "capitalize" }}
          size="small"
        >
          New User
        </Button>
      </div>

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#c9d1db", color: "#fff" }}>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone No.</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.code}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" size="small">
                    ✓
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    style={{ marginLeft: "10px" }}
                  >
                    ✕
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Adding New User */}
      <NewUserModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default UserManagement;
