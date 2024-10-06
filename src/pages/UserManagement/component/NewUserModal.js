// src/components/NewUserModal.js
import React from "react";
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
            defaultValue=""
            size="small"
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue=""
            size="small"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            defaultValue=""
            size="small"
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            autoComplete="off"
            size="small"
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone No."
            type="tel"
            fullWidth
            variant="outlined"
            defaultValue=""
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
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
