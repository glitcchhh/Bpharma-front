import React from "react";
import AddNewEntity from "../components/AddNewEntity";
import AdvancedTableSmall from "../components/AdvancedTableSmall";

const AdminPage = () => {
  // Example table data
  const rows = [
    { id: 1, name: "Charlie", email: "charlie@example.com" },
    { id: 2, name: "Diana", email: "diana@example.com" },
  ];

  // Example column definitions
  const headCells = [
    { id: "name", label: "Full Name" },
    { id: "email", label: "Email" },
  ];

  return (
    <div>
      <h2>Admin Management</h2>

      {/* Add New Admin Button + Modal */}
      <AddNewEntity
        buttonLabel="Add Admin"
        entityType="admin"
        url="/admin/create"
      />

      {/* Small Card-based Table for Admins */}
      <AdvancedTableSmall data={rows} headCells={headCells} role="admin" />
    </div>
  );
};
<TableModal
  open={open}
  close={handleClose}
  data={adminData}
  modalTableHeadCells={adminHeadCells}
  title="Admin Management"
  currentPath="/management/admin"
/>

export default AdminPage;
