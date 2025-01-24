// src/pages/Product/offer.js
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
import Modal from "../../components/Modal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Sample offer data
const data = [
  {
    distributer: "kochi",
    amount: "5",
    remarks: "Text",
  },
  {
    distributer: "kochi",
    amount: "5",
    remarks: "Text",
  },
  {
    distributer: "kochi",
    amount: "5",
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

function NearExpiry() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} close={() => setOpen(false)} data={modalData} />

      <>
        <h2>Product Expiry</h2>

        {/* Offer Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#c9d1db", color: "#fff" }}>
              <TableRow>
                <TableCell>Distributer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>More Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((offer, index) => (
                <TableRow key={index}>
                  <TableCell>{offer.distributer}</TableCell>
                  <TableCell>{offer.amount}</TableCell>
                  <TableCell>{offer.remarks}</TableCell>
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

export default NearExpiry;
