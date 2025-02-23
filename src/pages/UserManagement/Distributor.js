// src/pages/DistributorManagement.js
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useAuth } from "../../contexts/AuthProvider";
import AdvancedTable from "../../components/AdvancedTable";
import AddNewUser from "../../components/AddNewUser";
import TableModal from "../../components/TableModal";

const modalTableHeadCells = [
  {
    id: "id",
  },
  // {
  //   id: "code",
  //   disablePadding: false,
  //   label: "Employee Code",
  // },
  {
    id: "distributor_name",
    disablePadding: false,
    label: "Distributor",
  },
  {
    id: "distr_phone_number",
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "distr_email",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "address_1",
    disablePadding: false,
    label: "Address 1",
  },
  {
    id: "address_2",
    disablePadding: false,
    label: "Address 2",
  },
];

// make sure data passed to table have same id as headCells passed to its table
const headCells = [
  {
    id: "id",
  },
  // {
  //   id: "code",
  //   disablePadding: false,
  //   label: "Employee Code",
  // },
  {
    id: "distributor_name",
    disablePadding: false,
    label: "Distributor",
  },
  {
    id: "distr_phone_number",
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "distr_email",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "address_1",
    disablePadding: false,
    label: "Address 1",
  },
  {
    id: "address_2",
    disablePadding: false,
    label: "Address 2",
  },
  {
    id: "edit",
    disablePadding: false,
    label: "Edit",
    notSortable: true,
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

function DistributorManagementModal() {
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
        url: `api/list-distributor`,
      });

      if (response.data.status !== "SUCCESS") return;

      const tableFormattedData = response.data.data.distributors.map((obj) => {
        return {
          id: obj.distributor_id,
          // code: obj.distributor_code,
          distributor_name: obj.distributor_name,
          distr_phone_number: obj.distr_phone_number,
          distr_email: obj.distr_email,
          address_1: obj.address_1,
          address_2: obj.address_2,
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

  const updateCellData = useCallback(async ({ id = null, data = {} }) => {
    const updatedData = { ...data };
    updatedData.emp_id = data.id;
    delete updatedData.id;

    try {
      const response = await saveDataIngestion({
        url: `api/update-distributor/${id}`,
        method: "put",
        data: updatedData,
      });

      if (response.data.status !== "SUCCESS") return;

      window.location.reload();

      return;
    } catch (error) {
      console.log({ error });
      return;
    }
  });

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
        title="Add New Distributor"
        buttonLabel="New Distributor"
      />

      {!isLoading && (
        <>
          {!data.length && <p>No Data Available</p>}
          {!!data.length && (
            <AdvancedTable
              data={data}
              showMoreData={openModal}
              headCells={headCells}
              updateCellData={updateCellData}
            />
          )}
        </>
      )}
    </>
  );
}

export default DistributorManagementModal;
