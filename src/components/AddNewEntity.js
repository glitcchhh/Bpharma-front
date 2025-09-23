import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AddNewUserModal from "./AddNewUserModal";
import AddNewAdminModal from "./AddNewAdminModal";

const AddNewEntity = ({ buttonLabel, entityType, fetchData }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ textTransform: "capitalize" }}
          size="small"
        >
          {buttonLabel}
        </Button>
      </div>

      {entityType === "admin" ? (
        <AddNewAdminModal
          open={openModal}
          handleClose={handleClose}
          fetchData={fetchData}
        />
      ) : (
        <AddNewUserModal
          open={openModal}
          handleClose={handleClose}
          fetchData={fetchData}
        />
      )}
    </>
  );
};

export default AddNewEntity;
