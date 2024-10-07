// src/pages/Product/claim.js
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
import { red } from "@mui/material/colors";

// Sample Claim data
const claims = [
  {
    name: "Sam",
    product: "A-1",
    free_quantity: "1",
    total_quantity: "5",
    remarks: "Text",
  },
  {
    name: "Sam",
    product: "A-1",
    free_quantity: "1",
    total_quantity: "5",
    remarks: "Text",
  },
  {
    name: "Sam",
    product: "A-1",
    free_quantity: "1",
    total_quantity: "5",
    remarks: "Text",
  },
];

function Claim() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        padding: "20px",
        margin: "20px",
        background: "#fff",
        borderRadius: "5px",
      }}
    >
      <h2>Product Claim</h2>

      {/* Claim Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#c9d1db", color: "#fff" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Free Quantity</TableCell>
              <TableCell>Total Quantity</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim, index) => (
              <TableRow key={index}>
                <TableCell>{claim.name}</TableCell>
                <TableCell>{claim.product}</TableCell>
                <TableCell>{claim.free_quantity}</TableCell>
                <TableCell>{claim.total_quantity}</TableCell>
                <TableCell>{claim.remarks}</TableCell>
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
    </div>
  );
}

export default Claim;
