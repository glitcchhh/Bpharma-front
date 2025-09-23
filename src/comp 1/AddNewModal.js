import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddNewModal = ({
  open,
  handleClose,
  title = "Add New",
  data = [],
  handleSubmit,
  error = {},
}) => {
  const showError = (name) => {
    return error?.find?.(({ field }) => field === name) || null;
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          noValidate
          autoComplete="off"
        >
          {data.map(({ name, label, type = "text", options = [] }, index) => {
            const Error = showError(name);

            if (type === "select") {
              return (
                <Fragment key={index}>
                  <FormControl fullWidth size="small">
                    <InputLabel id={`select-${index}`}>{label}</InputLabel>
                    <Select
                      labelId={`select-${index}`}
                      id={`select-field-${index}`}
                      name={name}
                      defaultValue=""
                    >
                      <MenuItem value="">Select</MenuItem>
                      {options.map(({ value, name }) => (
                        <MenuItem key={value} value={value}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {Error && <div className="error-msg">{Error?.message}</div>}
                </Fragment>
              );
            }

            return (
              <Fragment key={index}>
                <TextField
                  margin="dense"
                  id={name + index}
                  label={label}
                  type={type}
                  fullWidth
                  autoComplete="off"
                  size="small"
                  name={name}
                />
                {Error && <div className="error-msg">{Error?.message}</div>}
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

export default AddNewModal;


