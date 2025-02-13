// src/pages/DistributorManagement.js
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useAuth } from "../../contexts/AuthProvider";
import Modal from "../../components/Modal";
import AdvancedTable from "../../components/AdvancedTable";

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
    id: "distributor_name",
    disablePadding: false,
    label: "Distributor",
  },
  {
    id: "phone",
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "email",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "address1",
    disablePadding: false,
    label: "Address 1",
  },
  {
    id: "address2",
    disablePadding: false,
    label: "Address 2",
  },
];

// make sure data passed to table have same id as headCells passed to its table
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
    id: "distributor_name",
    disablePadding: false,
    label: "Distributor",
  },
  {
    id: "phone",
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "email",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "address1",
    disablePadding: false,
    label: "Address 1",
  },
  {
    id: "address2",
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
          code: obj.distributor_code,
          distributor_name: obj.distributor_name,
          phone: obj.distr_phone_number,
          email: obj.distr_email,
          address1: obj.address_1,
          address2: obj.address_2,
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
              deleteAction={true}
            />
          )}
        </>
      )}
    </>
  );
}

export default DistributorManagementModal;
