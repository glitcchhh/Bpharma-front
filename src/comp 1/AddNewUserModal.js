import React, { useState } from "react";
import AddNewModal from "./AddNewModal";

const AddNewUserModal = ({ open, handleClose, fetchData }) => {
  const [error, setError] = useState({});

  const userFields = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "text" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = {};
    formData.forEach((value, key) => (formValues[key] = value));

    console.log("Submitting user data:", formValues);

    // fake success
    setTimeout(() => {
      handleClose();
      fetchData?.();
    }, 500);
  };

  return (
    <AddNewModal
      open={open}
      handleClose={handleClose}
      title="Add New User"
      data={userFields}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default AddNewUserModal;
