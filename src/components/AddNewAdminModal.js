import React, { useState } from "react";
import AddNewModal from "./AddNewModal";

const AddNewAdminModal = ({ open, handleClose, fetchData }) => {
  const [error, setError] = useState({});

  const adminFields = [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "admin", name: "Admin" },
        { value: "superadmin", name: "Super Admin" },
      ],
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = {};
    formData.forEach((value, key) => (formValues[key] = value));

    console.log("Submitting admin data:", formValues);

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
      title="Add New Admin"
      data={adminFields}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default AddNewAdminModal;

