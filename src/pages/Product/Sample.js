// src/pages/Product/offer.js
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useLocation, useNavigate } from "react-router-dom";
import AdvancedTable from "../../components/AdvancedTable";
import AddNewUser from "../../components/AddNewUser";
import TableModal from "../../components/TableModal";
import { getMonthName } from "../../constants/Constants";
import { useUserPermission } from "../../hooks/useUserPermissions";
// import {
//   generateSampleData,
//   generateSampleDataForTable,
// } from "../../constants/DummyData";

// make sure data passed to table have same id as modalTableHeadCells passed to its table
const modalTableHeadCells = [
  {
    id: "id",
  },
  {
    id: "request_number",
    disablePadding: false,
    label: "Request No.",
  },
  {
    id: "product_name",
    disablePadding: false,
    label: "Product",
  },
  {
    id: "customer_name",
    disablePadding: false,
    label: "Customer",
  },
  {
    id: "quantity",
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "req_date",
    disablePadding: false,
    label: "Request Date",
  },
  {
    id: "remarks",
    disablePadding: false,
    label: "Remarks",
  },
];

// make sure data passed to table have same id as headCells passed to its table
const headCells = [
  {
    id: "id",
  },
  {
    id: "request_number",
    disablePadding: false,
    label: "Request No.",
  },
  {
    id: "product_name",
    disablePadding: false,
    label: "Product",
  },
  {
    id: "customer_name",
    disablePadding: false,
    label: "Customer",
  },
  {
    id: "quantity",
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "req_date",
    disablePadding: false,
    label: "Request Date",
  },
  {
    id: "remarks",
    disablePadding: false,
    label: "Remarks",
  },
  {
    id: "more",
    disablePadding: false,
    label: "More",
    notSortable: true,
  },
];

const AddNewUserData = [
  {
    name: "product_id",
    label: "Product ID",
  },
  {
    name: "requested_emp_id",
    label: "Employee ID",
  },
  {
    name: "total_qty",
    label: "Total Quantity",
  },
  {
    name: "requested_date",
    label: "Requested Date",
    type: "date",
  },
  {
    name: "customer_name",
    label: "Customer Name",
  },
  {
    name: "status",
    label: "Status",
  },
  {
    name: "remarks",
    label: "Remarks",
  },
];

function Sample() {
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
        url: `api/list-sample?page=${1}&limit=${10}&search=${""}&sortBy=${"sample_req_id"}&sortOrder=${"desc"}`,
      });

      if (response.data.status !== "SUCCESS") return;

      const tableFormattedData = response.data.data.map((obj) => {
        const Day = new Date(obj.requested_date).getDate();
        const Month = new Date(obj.requested_date).getMonth() + 1;
        const Year = new Date(obj.requested_date).getFullYear();
        const MonthName = getMonthName(Month);
        const formattedMonth = Month.toString().padStart(2, "0");
        const requestNumber = `SR/${obj.sample_req_id}/${Year}-${formattedMonth}`;
        const requestDate = `${MonthName} ${Day}, ${Year}`;

        return {
          id: obj.sample_req_id,
          request_number: requestNumber,
          product_name: obj.product.product_name,
          customer_name: obj.customer_name,
          quantity: obj.total_qty,
          req_date: requestDate,
          remarks: obj.remarks,
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
          title="Add New Sample"
          buttonLabel="New Sample"
          url="/api/insert-sample"
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

export default Sample;
