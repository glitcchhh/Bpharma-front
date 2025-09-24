// src/pages/Settings/RolePrivileges.js
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useNavigate } from "react-router-dom";
import AdvancedTable from "../../components/AdvancedTable";
import { useUserPermission } from "../../hooks/useUserPermissions";
import { Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const listURL = "/api/list-role-privileges";
const saveURL = "/api/save-role-privileges";

const headCells = [
  { id: "page", disablePadding: false, label: "Page" },
  { id: "all", disablePadding: false, label: "All" },
  { id: "add", disablePadding: false, label: "Add" },
  { id: "edit", disablePadding: false, label: "Edit" },
  { id: "delete", disablePadding: false, label: "Delete" },
  { id: "view", disablePadding: false, label: "View" },
  { id: "print", disablePadding: false, label: "Print" },
];

function RolePrivileges() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const [module, setModule] = useState("");
  const { token } = useAuth();
  const { saveDataIngestion, isLoading } = useDataIngestion();
  const navigate = useNavigate();

  const { getUserPermissions } = useUserPermission();
  const canEdit = getUserPermissions({ permissionType: "edit-role-privileges" });

  const fetchData = useCallback(async () => {
    try {
      const response = await saveDataIngestion({
        url: listURL,
        method: "POST",
        data: { role, module },
      });

      if (response.data.status !== "SUCCESS") return;

      const formattedData = response.data.data.map((item) => ({
        id: item.id,
        page: item.page,
        all: item.all,
        add: item.add,
        edit: item.edit,
        delete: item.delete,
        view: item.view,
        print: item.print,
      }));

      setData(formattedData);
    } catch (error) {
      console.log(error);
    }
  }, [role, module]);

  const handleSave = async () => {
    try {
      await saveDataIngestion({
        url: saveURL,
        method: "POST",
        data: { role, module, privileges: data },
      });
      alert("Privileges Saved Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  return (
    <div>
      {/* Dropdowns for Role and Module */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <FormControl>
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="APPROVER">Approver</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Module</InputLabel>
          <Select value={module} onChange={(e) => setModule(e.target.value)}>
            <MenuItem value="Masters">Masters</MenuItem>
            <MenuItem value="Transactions">Transactions</MenuItem>
            <MenuItem value="Reports">Reports</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={fetchData}>Search</Button>
        <Button variant="outlined" onClick={() => setData([])}>Clear</Button>
      </div>

      {/* Table */}
      {!isLoading && (
        <>
          {!data.length && <p>No Data Available</p>}
          {!!data.length && (
            <AdvancedTable
              data={data}
              headCells={headCells}
              fetchDataCallBack={fetchData}
              isCheckboxTable={true} // you can extend AdvancedTable to render checkboxes
              setData={setData}
            />
          )}
        </>
      )}

      {/* Save Button */}
      {canEdit && data.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

export default RolePrivileges;