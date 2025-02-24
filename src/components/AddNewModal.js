import React, { Fragment, useState } from "react";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAuth } from "../contexts/AuthProvider";

const AddNewUserModal = ({
  open,
  handleClose,
  title = "Add New User",
  data = [],
  url = "/employee/create",
}) => {
  const { saveDataIngestion } = useDataIngestion();
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const formData = {};

    data.forEach((value, key) => {
      if (value != "") formData[key] = value;
    });

    // formData.emp_id = user.emp_id;
    formData.emp_id = 2;

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
      console.log("Error creating user:", error);
      const errorDetails = error.response.data.error.details;
      setError(errorDetails);
    }
  };

  const showError = (name) => {
    return error?.find(({ field }) => field == name) || null;
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
            const Error = showError(name);

            if (type == "textarea") {
              return (
                <Fragment key={index}>
                  <textarea
                    style={{
                      maxWidth: "535.5px",
                      marginBottom: "4px",
                    }}
                    placeholder={label}
                    className="custom-text-area"
                    margin="dense"
                    id={name + index}
                    autoComplete="off"
                    name={name}
                  />
                  {Error && (
                    <>
                      <div className="error-msg">{Error?.message}</div>
                    </>
                  )}
                </Fragment>
              );
            }

            if (type == "date") {
              return (
                <Fragment key={index}>
                  <div
                    style={{
                      marginBottom: "4px",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label={label}
                          name={name}
                          format="YYYY-MM-DD"
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  {Error && <div className="error-msg">{Error?.message}</div>}
                </Fragment>
              );
            }

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
                {Error && (
                  <>
                    <div className="error-msg">{Error?.message}</div>
                  </>
                )}
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
