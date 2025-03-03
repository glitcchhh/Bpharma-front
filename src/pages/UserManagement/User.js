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
import { useUserPermission } from "../../hooks/useUserPermissions";

// define URLs here
const listURL = "api/list-roles";
const updateURL = "api/update-roles";
const deleteURL = "api/delete-roles";
const insertURL = "api/insert-employee";

const modalTableHeadCells = [
  {
    id: "id",
  },
  {
    id: "name",
    disablePadding: false,
    label: "User",
    fixedWidth: true,
  },
  {
    id: "status",
    disablePadding: false,
    label: "Status",
    fixedWidth: true,
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
    id: "status",
    disablePadding: false,
    label: "Status",
    fixedWidth: true,
  },
  {
    id: "edit",
    disablePadding: false,
    label: "Edit",
    notSortable: true,
    fixedWidth: true,
  },
];

const AddNewUserData = [
  {
    name: "display_name",
    label: "Display name",
  },
  {
    name: "emp_code",
    label: "User Code",
  },
  {
    name: "first_name",
    label: "First Name",
  },
  {
    name: "last_name",
    label: "Last Name",
  },
  {
    name: "email_id",
    label: "Email",
    type: "email",
  },
  {
    name: "phone_num",
    label: "Phone",
    type: "tel",
  },
  {
    name: "district_id",
    label: "District ID",
    type: "select",
    options: [
      {
        name: "district 1",
        value: "1",
      },
      {
        name: "district 2",
        value: "2",
      },
    ],
  },
  {
    name: "distributer_id",
    label: "Distributor Name",
    type: "select",
    options: [
      {
        name: "Distributor name 1",
        value: "1",
      },
      {
        name: "Distributor name 2",
        value: "2",
      },
    ],
  },
  {
    name: "is_active",
    label: "Active",
    type: "select",
    options: [
      {
        name: "Active",
        value: "0",
      },
      {
        name: "InActive",
        value: "1",
      },
    ],
  },
  {
    name: "status_id",
    label: "Status",
    type: "select",
    options: [
      {
        name: "Pending",
        value: "1",
      },
    ],
  },
  {
    name: "role_id",
    label: "Role ID",
    type: "select",
    options: [
      {
        name: "1",
        value: "1",
      },
      {
        name: "2",
        value: "2",
      },
      {
        name: "3",
        value: "3",
      },
    ],
  },
];

function User() {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const { token } = useAuth();
  const { saveDataIngestion, isLoading } = useDataIngestion();
  const navigate = useNavigate();
  const { getUserPermissions } = useUserPermission();

  const createUserPermission = getUserPermissions({
    permissionType: "create-user",
  });

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await saveDataIngestion({
        url: listURL,
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

      {createUserPermission && (
        <AddNewUser
          data={AddNewUserData}
          title="Add New User"
          buttonLabel="New User"
          url={insertURL}
          needEmployeeID={false}
        />
      )}

      {!isLoading && (
        <>
          {!data.length && <p>No Data Available</p>}
          {!!data.length && (
            <AdvancedTable
              data={data}
              showMoreData={openModal}
              headCells={headCells}
            />
          )}
        </>
      )}
    </>
  );
}

export default User;
