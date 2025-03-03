import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AddNewUserModal from "./AddNewModal";

const AddNewUser = ({
  buttonLabel = "New User",
  title = "",
  data = [],
  url,
  needEmployeeID,
}) => {
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
          marginBottom: "10px",
          marginTop: "10px",
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
        url={url}
        needEmployeeID={needEmployeeID}
      />
    </>
  );
};

export default AddNewUser;
