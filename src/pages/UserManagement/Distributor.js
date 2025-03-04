// src/pages/DistributorManagement.js
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useAuth } from "../../contexts/AuthProvider";
import AdvancedTable from "../../components/AdvancedTable";
import AddNewUser from "../../components/AddNewUser";
import TableModal from "../../components/TableModal";
import { useUserPermission } from "../../hooks/useUserPermissions";

// define URLs here
const listURL = "api/list-distributor";
const updateURL = "api/update-distributor";
const deleteURL = "api/delete-distributor";
const tsmURL = "api/list-employee";

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
    fixedWidth: true,
  },
];

const AddNewUserData = [
  {
    name: "distributor_name",
    label: "Distributor Name",
  },
  {
    name: "distributor_code",
    label: "Distributor Code",
  },
  {
    name: "tsm_name",
    label: "TSM Name",
    type: "select",
  },
  {
    name: "distributor_district_id",
    label: "Distributor District ID",
    type: "select",
    options: [{ value: 1, name: "district 1" }],
  },
  {
    name: "distr_email",
    label: "Email",
    type: "email",
  },
  {
    name: "distr_phone_number",
    label: "Phone",
    type: "tel",
  },
  {
    name: "address_1",
    label: "Address 1",
    type: "textarea",
  },
  {
    name: "address_2",
    label: "Address 2",
    type: "textarea",
  },
];

function Distributor() {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const { token, user: currentUserDetails } = useAuth();
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
  }, [setData, saveDataIngestion, listURL]);

  const fetchDistributor = useCallback(async () => {
    try {
      const response = await saveDataIngestion({
        url: tsmURL,
      });

      if (response.data.status !== "SUCCESS") return;

      const Options = response.data.data.map((obj) => {
        return {
          value: obj.emp_id,
          name: obj.display_name,
        };
      });

      // adding options to distributor_id
      AddNewUserData.forEach((item) => {
        if (item.name === "tsm_name") {
          item.options = Options;
        }
      });

      return;
    } catch (error) {
      console.log({ error });
      return;
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchData();
      fetchDistributor();
    } else {
      navigate("/login");
    }
  }, [token]);

  const updateCellData = useCallback(
    async ({ id = null, data = {} }) => {
      const updatedData = { ...data };
      updatedData.emp_id = 2; //currentUserDetails.emp_id;
      delete updatedData.id;

      try {
        const response = await saveDataIngestion({
          url: `${updateURL}/${id}`,
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
    },
    [currentUserDetails, saveDataIngestion, updateURL]
  );

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
          title="Add New Distributor"
          buttonLabel="New Distributor"
          url="/api/insert-distributor"
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
              updateCellData={updateCellData}
              deleteURL={deleteURL}
            />
          )}
        </>
      )}
    </>
  );
}

export default Distributor;
