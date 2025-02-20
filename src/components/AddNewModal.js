import React, { Fragment } from "react";
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
import { useDataIngestion } from "../hooks/useDataIngestion";

const AddNewUserModal = ({
  open,
  handleClose,
  title = "Add New User",
  data = [],
  url = "/employee/create",
}) => {
  const { saveDataIngestion } = useDataIngestion();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const formData = {};

    data.forEach((value, key) => {
      formData[key] = value;
    });

    try {
      // Send POST request
      const response = await saveDataIngestion({
        url,
        method: "post",
        data: formData,
      });

      if (response.data.status !== "SUCCESS") return;

      console.log("User created successfully:", response.data);

      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 500);
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
              <Fragment key={index}>
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
              </Fragment>
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
