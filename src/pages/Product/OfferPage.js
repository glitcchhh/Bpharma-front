// src/pages/Product/claim.js
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useNavigate } from "react-router-dom";
import AdvancedTable from "../../components/AdvancedTable";
import AddNewUser from "../../components/AddNewUserModal";
import TableModal from "../../components/TableModal";
import { useUserPermission } from "../../hooks/useUserPermissions";
import { getMonthName } from "../../constants/Constants";

// define URLs here
const listURL = "api/list-offer";
const insertURL = "/api/insert-offer";
const productURL = "/api/list-product";

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
    id: "location",
    disablePadding: false,
    label: "Location",
  },
  {
    id: "quantity",
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "offer",
    disablePadding: false,
    label: "Offer",
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
    id: "location",
    disablePadding: false,
    label: "Location",
  },
  {
    id: "quantity",
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "offer",
    disablePadding: false,
    label: "Offer",
  },
];

const AddNewUserData = [
  {
    name: "product_id",
    label: "Product Name",
    type: "select",
  },
  {
    name: "customer_name",
    label: "Customer Name",
  },
  {
    name: "customer_location",
    label: "Location",
  },
  {
    name: "qty",
    label: "Quantity",
  },
  {
    name: "offer_qty",
    label: "Offer Quantity",
  },
];

function Offer() {
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
        const Day = new Date(obj.requested_date).getDate();
        const Month = new Date(obj.requested_date).getMonth() + 1;
        const Year = new Date(obj.requested_date).getFullYear();
        const MonthName = getMonthName(Month);
        const formattedMonth = Month.toString().padStart(2, "0");
        const requestNumber = `PO/${obj.offer_id}/${Year}-${formattedMonth}`;

        return {
          id: obj.offer_id,
          request_number: requestNumber,
          product_name: obj.product.product_name,
          customer_name: obj.customer_name,
          location: obj.location,
          quantity: obj.qty,
          offer: obj.offer_qty,
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

  const fetchDistributor = useCallback(async () => {
    try {
      const response = await saveDataIngestion({
        url: productURL,
      });

      if (response.data.status !== "SUCCESS") return;

      const Options = response.data.data.map((obj) => {
        return {
          value: obj.product_id,
          name: obj.product_name,
        };
      });

      // adding options to distributor_id
      AddNewUserData.forEach((item) => {
        if (item.name === "product_id") {
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
          title="Add New Offer"
          buttonLabel="New Offer"
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
              fetchDataCallBack={fetchData}
            />
          )}
        </>
      )}
    </>
  );
}

export default Offer;
