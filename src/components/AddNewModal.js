import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Api } from "../api/Api";

const AddNewUserModal = ({
  open,
  handleClose,
  title = "Add New User",
  data = [],
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const formData = {};

    data.forEach((value, key) => {
      formData[key] = value;
    });

    try {
      // Send POST request
      const response = await Api.post("/employee/create", formData);
      console.log("User created successfully:", response.data);

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
        {title}
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
          onSubmit={(event) => handleSubmit(event)}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          noValidate
          autoComplete="off"
        >
          {data.map(({ name, label, type = "text" }, index) => {
            return (
              <>
                <TextField
                  key={index}
                  margin="dense"
                  id={name + index}
                  label={label}
                  type={type}
                  fullWidth
                  autoComplete="off"
                  size="small"
                  name={name}
                />
              </>
            );
          })}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewUserModal;
