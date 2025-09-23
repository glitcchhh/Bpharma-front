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
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddNewUser from "../../components/AddNewUserModal";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useUserPermission } from "../../hooks/useUserPermissions";

//define URLs here
const listURL = "api/list-claim";

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

function Compliments() {
  const [open, setOpen] = useState(false);
  const { token, user } = useAuth();

  const { pathname } = useLocation();
  const { getUserPermissions } = useUserPermission();

  const createUserPermission = getUserPermissions({
    permissionType: "create-user",
  });

  return (
    <>
      <>
        {createUserPermission && (
          <AddNewUser
            data={AddNewUserData}
            title="Add New Compliments"
            buttonLabel="New Compliments"
          />
        )}

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

export default Compliments;
