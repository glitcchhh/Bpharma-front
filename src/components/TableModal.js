import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import AdvancedTable from "./AdvancedTable";
import { useUserPermission } from "../hooks/useUserPermissions";

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

export default function TableModal({
  open,
  close,
  data = [],
  modalTableHeadCells = [],
  title = "User/Admin Data",
  currentPath = "/management/user", // default path (can be overridden)
}) {
  const { getUserPermissions } = useUserPermission();

  // Permission checks
  const canCreate = getUserPermissions({
    permissionType: "create-user",
    currentPath,
  });
  const canEdit = getUserPermissions({
    permissionType: "edit",
    currentPath,
  });
  const canDelete = getUserPermissions({
    permissionType: "delete",
    currentPath,
  });

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="custom-modal"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <span className="modal-close-btn">
          <CloseIcon onClick={close} />
        </span>

        {/* Action buttons (based on permissions) */}
        <div style={{ marginTop: "10px", marginBottom: "15px" }}>
          {canCreate && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("Add new clicked")}
              style={{ marginRight: "10px" }}
            >
              Add New
            </Button>
          )}
          {canEdit && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert("Edit clicked")}
              style={{ marginRight: "10px" }}
            >
              Edit
            </Button>
          )}
          {canDelete && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => alert("Delete clicked")}
            >
              Delete
            </Button>
          )}
        </div>

        {/* Table section */}
        <div style={{ marginTop: "20px" }}>
          {data.length ? (
            <AdvancedTable
              data={data}
              showMoreData={() => {}}
              headCells={modalTableHeadCells}
            />
          ) : (
            <Typography>No data available</Typography>
          )}
        </div>
      </Box>
    </Modal>
  );
}
