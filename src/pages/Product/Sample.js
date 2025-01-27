// src/pages/Product/offer.js
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useAuth } from "../../contexts/AuthProvider";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useNavigate } from "react-router-dom";
import AdvancedTable from "../../components/AdvancedTable";
import {
  generateSampleData,
  generateSampleDataForTable,
} from "../../constants/DummyData";

const modalTableHeadCells = [
  {
    id: "id",
  },
  {
    id: "code",
    disablePadding: false,
    label: "Employee Code",
  },
  {
    id: "product_name",
    disablePadding: false,
    label: "Product",
  },
  {
    id: "quantity",
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "remarks",
    disablePadding: false,
    label: "Remarks",
  },
];

// make sure data passed to table have same id as headCells passed to table
const headCells = [
  {
    id: "id",
  },
  {
    id: "code",
    disablePadding: false,
    label: "Employee Code",
  },
  {
    id: "product_name",
    disablePadding: false,
    label: "Product",
  },
  {
    id: "quantity",
    disablePadding: false,
    label: "Quantity",
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

function Sample() {
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

  const fetchData = async () => {
    try {
      const response = await saveDataIngestion({
        url: `api/list-sample?page=${1}&limit=${10}&search=${""}&sortBy=${"sample_req_id"}&sortOrder=${"desc"}`,
      });

      if (response.data.status !== "SUCCESS") return;

      const tableFormattedData = response.data.data.map((obj) => {
        return {
          id: obj.employee.emp_id,
          code: obj.employee.emp_code,
          product_name: obj.product.product_name,
          quantity: obj.total_qty,
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
  };

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

export default Sample;
