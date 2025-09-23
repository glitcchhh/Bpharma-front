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

//define URLs here
const listURL = "api/list-claim";
const insertURL = "/api/insert-claim";
const distributorURL = "/api/list-distributor";

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
    id: "tsm",
    disablePadding: false,
    label: "TSM",
  },
  {
    id: "stockist",
    disablePadding: false,
    label: "Stockist",
  },
  {
    id: "total_qty",
    disablePadding: false,
    label: "Stockist",
  },
  {
    id: "free_qty",
    disablePadding: false,
    label: "Stockist",
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
    id: "tsm",
    disablePadding: false,
    label: "TSM",
  },
  {
    id: "stockist",
    disablePadding: false,
    label: "Stockist",
  },
  {
    id: "total_qty",
    disablePadding: false,
    label: "Total Quantity",
  },
  {
    id: "free_qty",
    disablePadding: false,
    label: "Free Quantity",
  },
  // {
  //   id: "more",
  //   disablePadding: false,
  //   label: "More",
  //   notSortable: true,
  //   fixedWidth: true,
  // },
];

const AddNewUserData = [
  {
    name: "distributor_id",
    label: "Distributor Name",
    type: "select",
  },
  {
    name: "requested_date",
    label: "Requested Date",
    type: "date",
  },
  {
    name: "stockist",
    label: "Stockist",
  },
  {
    name: "total_qty",
    label: "Total Quantity",
  },
  {
    name: "free_qty",
    label: "Free Quantity",
  },
];

function Claim() {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const { token, user: currentDetails } = useAuth();
  const { saveDataIngestion, isLoading } = useDataIngestion();
  const navigate = useNavigate();
  const currentUser = currentDetails.user;
  useEffect(() => {
    if (currentUser && currentUser == "tsm") {
      const index = headCells.findIndex(({ id }) => id == "more");

      if (index !== -1) headCells.splice(index, 1);
    }
  }, [currentUser]);

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
        const requestNumber = `PC/${obj.claim_id}/${Year}-${formattedMonth}`;
        const requestDate = `${MonthName} ${Day}, ${Year}`;

        return {
          id: obj.claim_id,
          request_number: requestNumber,
          tsm: obj.distributor.distributor_name,
          stockist: obj.stockist,
          total_qty: obj.total_qty,
          free_qty: obj.free_qty,
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
        url: distributorURL,
      });

      if (response.data.status !== "SUCCESS") return;

      const Options = response.data.data.distributors.map((obj) => {
        return {
          value: obj.distributor_id,
          name: obj.distributor_name,
        };
      });

      // adding options to distributor_id
      AddNewUserData.forEach((item) => {
        if (item.name === "distributor_id") {
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
          title="Add New Claim"
          buttonLabel="New Claim"
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

export default Claim;
