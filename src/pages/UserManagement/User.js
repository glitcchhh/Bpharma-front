// src/pages/UserManagement.js
import React, { useCallback, useEffect, useState } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import NewUserModal from "./component/NewUserModal"; // Import the modal component
import { red } from "@mui/material/colors";
import TableModal from "../../components/TableModal";
import AddNewUser from "../../components/AddNewUser";
import AdvancedTable from "../../components/AdvancedTable";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { getMonthName } from "../../constants/Constants";

const modalTableHeadCells = [
  {
    id: "id",
  },
  {
    id: "name",
    disablePadding: false,
    label: "User",
  },
  {
    id: "created",
    disablePadding: false,
    label: "Created on",
  },
  {
    id: "updated",
    disablePadding: false,
    label: "Updated on",
  },
  {
    id: "status",
    disablePadding: false,
    label: "Status",
  },
];

// make sure data passed to table have same id as headCells passed to its table
const headCells = [
  {
    id: "id",
  },
  {
    id: "name",
    disablePadding: false,
    label: "User",
  },
  {
    id: "created",
    disablePadding: false,
    label: "Created on",
  },
  {
    id: "updated",
    disablePadding: false,
    label: "Updated on",
  },
  {
    id: "status",
    disablePadding: false,
    label: "Status",
  },
];

const AddNewUserData = [
  {
    name: "user-code",
    label: "User Code",
  },
  {
    name: "name",
    label: "User Name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
  },
];

function User() {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const { token } = useAuth();
  const { saveDataIngestion, isLoading } = useDataIngestion();
  const navigate = useNavigate();

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await saveDataIngestion({
        url: `api/list-roles`,
      });

      if (response.data.status !== "SUCCESS") return;

      const tableFormattedData = response.data.data.roles.map((obj) => {
        const CreatedDay = new Date(obj.created_on).getDate();
        const CreatedMonth = new Date(obj.created_on).getMonth() + 1;
        const CreatedMonthName = getMonthName(CreatedMonth);
        const CreatedYear = new Date(obj.created_on).getFullYear();

        const UpdatedDay = new Date(obj.updated_on).getDate();
        const UpdatedMonth = new Date(obj.updated_on).getMonth() + 1;
        const UpdatedMonthName = getMonthName(UpdatedMonth);
        const UpdatedYear = new Date(obj.updated_on).getFullYear();

        return {
          id: obj.role_id,
          name: obj.role_name,
          status: obj.is_active,
          created: `${CreatedMonthName} ${CreatedDay}, ${CreatedYear}`,
          updated: `${UpdatedMonthName} ${UpdatedDay}, ${UpdatedYear}`,
        };
      });

      setData(tableFormattedData);
      // setData([])
      // setData(generateSampleDataForTable(10));

      return;
    } catch (error) {
      console.log({ error });
      return;
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <TableModal
        open={open}
        close={closeModal}
        data={data}
        modalTableHeadCells={modalTableHeadCells}
      />

      <AddNewUser
        data={AddNewUserData}
        title="Add New User"
        buttonLabel="New User"
      />

      {!isLoading && (
        <>
          {!data.length && <p>No Data Available</p>}
          {!!data.length && (
            <AdvancedTable
              data={data}
              showMoreData={openModal}
              headCells={headCells}
              deleteAction={true}
              acceptAction={false}
              rejectAction={false}
            />
          )}
        </>
      )}
    </>
  );
}

export default User;
