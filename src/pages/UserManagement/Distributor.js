// src/pages/DistributorManagement.js
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
import NewDistributorModal from "./component/NewDistributorModal"; // Import the modal component
import { red } from "@mui/material/colors";

// Sample Distributor data
const distributors = [
  { territory: "Thrissur", name: "Sam", email: "sam@xyz.com", phone: "9999999999" },
  { territory: "Thrissur", name: "Sam", email: "sam@xyz.com", phone: "9999999999" },
  { territory: "Thrissur", name: "Sam", email: "sam@xyz.com", phone: "9999999999" },
];

function DistributorManagementModal() {
  const [open, setOpen] = useState(false);

  // Functions to handle dialog (modal) open and close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: "20px",margin:"20px", background:"#fff",borderRadius: "5px"  }}>
      <h2>Distributor Management</h2>

      {/* New Distributor Button */}
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
          sx={{ textTransform: 'capitalize' }}
          size="small"
        >
          New Distributor
        </Button>
      </div>

      {/* Distributor Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{bgcolor:"#c9d1db", color:"#fff"}}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Territory Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone No.</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {distributors.map((distributor, index) => (
              <TableRow key={index}>
                <TableCell>{distributor.name}</TableCell>
                <TableCell>{distributor.territory}</TableCell>
                <TableCell>{distributor.email}</TableCell>
                <TableCell>{distributor.phone}</TableCell>
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

      {/* Modal for Adding New distributor */}
      <NewDistributorModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default DistributorManagementModal;
