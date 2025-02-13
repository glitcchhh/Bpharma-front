// src/pages/Product/offer.js
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
import Modal from "../../components/Modal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import AdvancedTable from "../../components/AdvancedTable";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

const modalTableHeadCells = [
  {
    id: "id",
  },
  {
    id: "employee",
    disablePadding: false,
    label: "Employee",
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
    id: "employee",
    disablePadding: false,
    label: "Employee",
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

function Expiry() {
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
        url: `api/list-expiry`,
      });

      if (response.data.status !== "SUCCESS") return;

      const tableFormattedData = response.data.data.map((obj) => {
        return {
          id: obj.expairy_req_id,
          employee: obj.employee.display_name,
          product_name: obj.product.product_name,
          customer_name: obj.customer_name,
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

export default Expiry;
