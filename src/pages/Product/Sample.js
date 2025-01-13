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
import Modal from "../../components/Modal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Sample offer data
const data = [
  {
    tsm_name: "TSM A",
    product_name: "sample 1",
    quantity: "5",
    remarks: "Text",
  },
  {
    tsm_name: "TSM B",
    product_name: "sample 2",
    quantity: "5",
    remarks: "Text",
  },
  {
    tsm_name: "TSM C",
    product_name: "sample 3",
    quantity: "5",
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

function Sample() {
  const [open, setOpen] = useState(false);
  // const [modalData, setModalData] = useState([]);

  return (
    <>
      <Modal open={open} close={() => setOpen(false)} data={modalData} />
      <div
        style={{
          padding: "20px",
          margin: "20px",
          background: "#fff",
          borderRadius: "5px",
        }}
        className="sample"
        id="sample"
      >
        <h2>Product Sample</h2>

        {/* Offer Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#c9d1db", color: "#fff" }}>
              <TableRow>
                <TableCell>TSM name</TableCell>
                <TableCell>Product name</TableCell>
                <TableCell>Sample Qty</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>More Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((offer, index) => (
                <TableRow key={index}>
                  <TableCell>{offer.tsm_name}</TableCell>
                  <TableCell>{offer.product_name}</TableCell>
                  <TableCell>{offer.quantity}</TableCell>
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
      </div>
    </>
  );
}

export default Sample;
