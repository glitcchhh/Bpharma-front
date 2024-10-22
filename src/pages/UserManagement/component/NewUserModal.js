import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NewUserModal = ({ open, handleClose }) => {
  // State to hold form values
  const [formData, setFormData] = useState({
    userCode: "",
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Send POST request
      const response = await axios.post(
        "http://localhost:8081/employee/create",
        formData
      );
      console.log("User created successfully:", response.data);

      // Close the modal on success
      handleClose();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add New User
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          noValidate
          autoComplete="off"
        >
          <TextField
            autoFocus
            margin="dense"
            id="userCode"
            label="User Code"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.userCode}
            onChange={handleChange}
            size="small"
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            size="small"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            size="small"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
            size="small"
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone No."
            type="tel"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit} // Call handleSubmit on click
          variant="contained"
          color="primary"
          fullWidth
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewUserModal;
