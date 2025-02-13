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
import AdvancedTable from "./AdvancedTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "95%",
    md: "85%",
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
  borderRadius: "10px",
};

export default function BasicModal({
  open,
  close,
  data,
  modalTableHeadCells = [],
}) {
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

          <div style={{ marginTop: "20px" }}>
            {data.length && (
              <AdvancedTable
                data={data}
                showMoreData={() => {}}
                headCells={modalTableHeadCells}
              />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
