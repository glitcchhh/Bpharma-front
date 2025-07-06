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
const listURL = "api/list-product";
const updateURL = "api/update-product";
const insertURL = "api/insert-product";
const deleteURL = "";

const modalTableHeadCells = [
  {
    id: "id",
  },
  {
    id: "number",
    disablePadding: false,
    label: "No.",
  },

  {
    id: "product_name",
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "batch_no",
    disablePadding: false,
    label: "Batch No.",
  },
  {
    id: "product_code",
    disablePadding: false,
    label: "Code",
  },
  {
    id: "packing",
    disablePadding: false,
    label: "Packing",
  },
  // {
  //   id: "status",
  //   disablePadding: false,
  //   label: "Near Expiry",
  // },
];

// make sure data passed to table have same id as headCells passed to its table
const headCells = [
  {
    id: "id",
  },
  {
    id: "number",
    disablePadding: false,
    label: "No.",
  },

  {
    id: "product_name",
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "batch_no",
    disablePadding: false,
    label: "Batch No.",
  },
  {
    id: "product_code",
    disablePadding: false,
    label: "Code",
  },
  {
    id: "packing",
    disablePadding: false,
    label: "Packing",
  },
  // {
  //   id: "status",
  //   disablePadding: false,
  //   label: "Near Expiry",
  // },
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
    name: "product_name",
    label: "Product Name",
  },
  {
    name: "product_code",
    label: "Code",
  },

  {
    name: "batch_no",
    label: "Batch No.",
  },

  {
    name: "near_expiry",
    label: "Near Expiry Date",
    type: "date",
  },
  {
    name: "packing",
    label: "Packing",
  },
];

function Product() {
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

      const tableFormattedData = response.data.data.map((obj) => {
        return {
          id: obj.product_id,
          number: obj.product_id,
          product_name: obj.product_name,
          batch_no: obj.batch_no,
          product_code: obj.product_code,
          status: obj.near_expiry,
          packing: obj.packing,
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
  }, [setData, saveDataIngestion]);

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [token]);

  const updateCellData = useCallback(
    async ({ id = null, data = {} }) => {
      const updatedData = { ...data };
      // updatedData.emp_id = data.id;
      delete updatedData.id;
      delete updatedData.number;
      delete updatedData.status;

      try {
        const response = await saveDataIngestion({
          url: `${updateURL}/${id}`,
          method: "put",
          data: updatedData,
        });

        if (response.data.status !== "SUCCESS") return;
        fetchData();

        return;
      } catch (error) {
        console.log({ error });
        return;
      }
    },
    [saveDataIngestion, updateURL]
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
          title="Add New Product"
          buttonLabel="New Product"
          url={insertURL}
          needEmployeeID={false}
          fetchData={fetchData}
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
              fetchDataCallBack={fetchData}
            />
          )}
        </>
      )}
    </>
  );
}

export default Product;
