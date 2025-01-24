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
import Modal from "../../components/Modal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAuth } from "../../contexts/AuthProvider";

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

const modalData = [
  {
    name: "Name A",
    product_name: "product 1",
    quantity: "5",
    remarks: "Text",
  },
  {
    name: "Name B",
    product_name: "product 2",
    quantity: "5",
    remarks: "Text",
  },
  {
    name: "Name C",
    product_name: "product 3",
    quantity: "5",
    remarks: "Text",
  },
];

function Claim() {
  const [open, setOpen] = useState(false);
  // const [modalData, setModalData] = useState([]);
  const { token } = useAuth();

  console.log("token :: ", token);

  return (
    <>
      <Modal open={open} close={() => setOpen(false)} data={modalData} />

      <>
        <h2>Product Claim</h2>

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
                <TableCell>More Info</TableCell>
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
                  <TableCell>
                    <a onClick={() => setOpen(true)} className="cursor-pointer">
                      <ErrorOutlineIcon />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}

export default Claim;
