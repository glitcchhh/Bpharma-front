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
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewDistributorModal from "./component/NewDistributorModal"; // Import the modal component
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function DistributorManagementModal() {
  const [open, setOpen] = useState(false);
  const [distributors, setDistributors] = useState([
    {
      territory: "Thrissur",
      name: "Sam",
      email: "sam@xyz.com",
      phone: "9999999999",
    },
    {
      territory: "Thrissur",
      name: "Sam",
      email: "sam@xyz.com",
      phone: "9999999999",
    },
    {
      territory: "Thrissur",
      name: "Sam",
      email: "sam@xyz.com",
      phone: "9999999999",
    },
  ]);

  // Functions to handle dialog (modal) open and close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [editingIdx, setEditingIdx] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [openDeletePopOver, setOpenDeletePopOver] = useState(false);

  const startEditing = (index, distributor) => {
    setEditingIdx(index);
    setEditValues(distributor);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };
  const saveEdit = () => {
    // add api call here to save & update distributor data
    console.log("Save", editValues);
    setEditingIdx(null);
  };

  const handleDeleteClick = (index) => {
    setDeleteIdx(index);
    setOpenDeletePopOver(true);
  };
  const handleDeleteConfirm = () => {
    // add api call here to delete & update distributor data
    setDistributors((prev) => prev.filter((_, idx) => idx !== deleteIdx));
    setOpenDeletePopOver(false);
    setDeleteIdx(null);
  };
  const handleDeleteCancel = () => {
    setOpenDeletePopOver(false);
    setDeleteIdx(null);
  };

  return (
    <>
      <div
        style={{
          padding: "20px",
          margin: "20px",
          background: "#fff",
          borderRadius: "5px",
        }}
      >
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
            sx={{ textTransform: "capitalize" }}
            size="small"
          >
            New Distributor
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#c9d1db", color: "#fff" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Territory Name</TableCell>
                <TableCell>Email</TableCell> <TableCell>Phone No.</TableCell>
                <TableCell style={{ minWidth: "140px", width: "140px" }}>
                  Action
                </TableCell>
                <TableCell style={{ minWidth: "140px", width: "140px" }}>
                  Option
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {distributors.map((distributor, index) => (
                <TableRow key={index}>
                  {editingIdx === index ? (
                    <>
                      <TableCell>
                        <TextField
                          name="name"
                          value={editValues.name}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="territory"
                          value={editValues.territory}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="email"
                          value={editValues.email}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="phone"
                          value={editValues.phone}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                        >
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
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={saveEdit}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: "grey",
                            marginLeft: "10px",
                          }}
                          onClick={() => setEditingIdx(null)}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{distributor.name}</TableCell>
                      <TableCell>{distributor.territory}</TableCell>
                      <TableCell>{distributor.email}</TableCell>
                      <TableCell>{distributor.phone}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                        >
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
                        <Button
                          variant="contained"
                          color="info"
                          size="small"
                          onClick={() => startEditing(index, distributor)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleDeleteClick(index)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for Adding New distributor */}
        <NewDistributorModal open={open} handleClose={handleClose} />
      </div>

      <Dialog
        open={openDeletePopOver}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DistributorManagementModal;
