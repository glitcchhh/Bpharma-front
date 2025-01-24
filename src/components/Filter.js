import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Button, Grid2, Paper, styled } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
  borderRadius: "10px",
};

export default function Filter({ open, close }) {
  const [cleared, setCleared] = React.useState(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="custom-modal"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Advanced Filters
          </Typography>
          <span className="modal-close-btn">
            <CloseIcon onClick={close} />
          </span>

          <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Start Date">
                    <DesktopDatePicker
                      sx={{ width: "100%" }}
                      slotProps={{
                        field: {
                          clearable: true,
                          onClear: () => setCleared(true),
                        },
                      }}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="End Date">
                    <DesktopDatePicker
                      sx={{ width: "100%" }}
                      slotProps={{
                        field: {
                          clearable: true,
                          onClear: () => setCleared(true),
                        },
                      }}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </Grid2>

              <Grid2 size={12}>
                <Button
                  sx={{
                    marginTop: "20px",
                    display: "block",
                    marginX: "auto",
                  }}
                  variant="contained"
                >
                  Submit
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
