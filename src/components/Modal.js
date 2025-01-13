import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
  borderRadius: "10px",
};

export default function BasicModal({ open, close, data }) {
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
            Product Sample
          </Typography>
          <span className="modal-close-btn">
            <CloseIcon onClick={close} />
          </span>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ bgcolor: "#c9d1db", color: "#fff" }}>
                  <TableRow>
                    <TableCell>Name ( Dr, Store )</TableCell>
                    <TableCell>Product name</TableCell>
                    <TableCell>Sample Qty</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((offer, index) => (
                    <TableRow key={index}>
                      <TableCell>{offer.name}</TableCell>
                      <TableCell>{offer.product_name}</TableCell>
                      <TableCell>{offer.quantity}</TableCell>
                      <TableCell>{offer.remarks}</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
