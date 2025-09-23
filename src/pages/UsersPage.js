import React from "react";
import AddNewEntity from "../components/AddNewEntity";
import AdvancedTableSmall from "../components/AdvancedTableSmall";

const UsersPage = () => {
  // Example table data
  const rows = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ];

  // Example column definitions
  const headCells = [
    { id: "name", label: "Full Name" },
    { id: "email", label: "Email" },
  ];

  return (
    <div>
      <h2>User Management</h2>

      {/* Add New User Button + Modal */}
      <AddNewEntity
        buttonLabel="Add User"
        entityType="user"
        data={[
          { name: "name", label: "Full Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
        ]}
        url="/user/create"
      />

      {/* Small Card-based Table for Users */}
      <AdvancedTableSmall data={rows} headCells={headCells} role="user" />
    </div>
  );
};
<TableModal
  open={open}
  close={handleClose}
  data={userData}
  modalTableHeadCells={userHeadCells}
  title="User Management"
  currentPath="/management/user"
/>


export default UsersPage;

