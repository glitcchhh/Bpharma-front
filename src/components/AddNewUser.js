import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AddNewUserModal from "./AddNewModal";

const AddNewUser = ({ buttonLabel = "New User", title = "", data = [] }) => {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddUserModal}
          sx={{ textTransform: "capitalize" }}
          size="small"
        >
          {buttonLabel}
        </Button>
      </div>

      {/* Modal for Adding New User */}
      <AddNewUserModal
        open={openAddUserModal}
        title={title}
        handleClose={handleCloseAddUserModal}
        data={data}
      />
    </>
  );
};

export default AddNewUser;
