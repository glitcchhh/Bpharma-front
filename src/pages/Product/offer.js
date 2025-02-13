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
import AddNewUser from "../../components/AddNewUser";

// Sample offer data
const offers = [
  {
    customer: "ETC",
    product: "A-1",
    location: "kochi",
    offer: "1",
    total_quantity: "5",
    remarks: "Text",
  },
  {
    customer: "ETC",
    product: "A-1",
    location: "kochi",
    offer: "1",
    total_quantity: "5",
    remarks: "Text",
  },
  {
    customer: "ETC",
    product: "A-1",
    location: "kochi",
    offer: "1",
    total_quantity: "5",
    remarks: "Text",
  },
];

const AddNewUserData = [
  {
    name: "user-code",
    label: "User Code",
  },
  {
    name: "name",
    label: "User Name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
  },
];

function Offer() {
  return (
    <>
      <h2>Product Offer</h2>

      <AddNewUser
        data={AddNewUserData}
        title="Add New Offer"
        buttonLabel="New Offer"
      />

      {/* Offer Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#c9d1db", color: "#fff" }}>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Offer</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer, index) => (
              <TableRow key={index}>
                <TableCell>{offer.product}</TableCell>
                <TableCell>{offer.customer}</TableCell>
                <TableCell>{offer.location}</TableCell>
                <TableCell>{offer.total_quantity}</TableCell>
                <TableCell>{offer.offer}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Offer;
