// src/components/NewDistributorModal.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  IconButton,
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NewDistributorModal = ({ open, handleClose }) => {
  const [territory, setTerritory] = useState(null); // State to manage selected territory

  const handleTerritoryChange = (event) => {
    setTerritory(event.target.value);
  };

  const territories = [
    { value: null, text: "Select Territory" },
    { value: 1, text: "Thrissur" },
  ];
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add New Distributor
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
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue=""
            size="small"
          />
          <FormControl fullWidth margin="dense" size="small">
            <InputLabel id="territory-label">Territory</InputLabel>
            <Select
              labelId="territory-label"
              id="territory"
              value={territory}
              label="Territory"
              onChange={handleTerritoryChange}
            >
              {territories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default NewDistributorModal;
