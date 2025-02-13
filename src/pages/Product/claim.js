// src/pages/Product/claim.js
import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useAuth } from "../../contexts/AuthProvider";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useNavigate } from "react-router-dom";
import AdvancedTable from "../../components/AdvancedTable";

const modalTableHeadCells = [
  {
    id: "id",
  },
  {
    id: "employee_name",
    disablePadding: false,
    label: "Employee Code",
  },
  {
    id: "distributor_name",
    disablePadding: false,
    label: "Product",
  },
];

// make sure data passed to table have same id as headCells passed to its table
const headCells = [
  {
    id: "id",
  },
  {
    id: "employee_name",
    disablePadding: false,
    label: "Employee Code",
  },
  {
    id: "distributor_name",
    disablePadding: false,
    label: "Product",
  },
  {
    id: "more",
    disablePadding: false,
    label: "More",
    notSortable: true,
  },
];

function Claim() {
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
        url: `api/list-claim`,
      });

      if (response.data.status !== "SUCCESS") return;

      const tableFormattedData = response.data.data.map((obj) => {
        return {
          id: obj.claim_id,
          employee_name: obj.employee.display_name,
          distributor_name: obj.distributor.distributor_name,
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
      <Modal
        open={open}
        close={closeModal}
        data={data}
        modalTableHeadCells={modalTableHeadCells}
      />
      {!isLoading && (
        <>
          <h2>Product Sample</h2>
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

export default Claim;
