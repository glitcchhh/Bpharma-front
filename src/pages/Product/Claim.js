import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useDataIngestion } from "../../hooks/useDataIngestion";
import { useNavigate } from "react-router-dom";
import AdvancedTable from "../../components/AdvancedTable";
import AddNewAdminModal from "../../components/AddNewAdminModal"; // ✅ updated import
import TableModal from "../../components/TableModal";
import { useUserPermission } from "../../hooks/useUserPermissions";
import { Box, Container } from "@mui/material";
import Sidebar, { expandedWidth, collapsedWidth } from "../../components/sidebar";

// define URLs here
const listURL = "api/list-offer";
const insertURL = "/api/insert-offer";
const productURL = "/api/list-product";

const modalTableHeadCells = [
  { id: "id" },
  { id: "request_number", disablePadding: false, label: "Request No." },
  { id: "product_name", disablePadding: false, label: "Product" },
  { id: "customer_name", disablePadding: false, label: "Customer" },
  { id: "location", disablePadding: false, label: "Location" },
  { id: "quantity", disablePadding: false, label: "Quantity" },
  { id: "offer", disablePadding: false, label: "Offer" },
];

const headCells = [...modalTableHeadCells];

const AddNewUserData = [
  { name: "product_id", label: "Product Name", type: "select" },
  { name: "customer_name", label: "Customer Name" },
  { name: "customer_location", label: "Location" },
  { name: "qty", label: "Quantity" },
  { name: "offer_qty", label: "Offer Quantity" },
];

function Claim() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const { token, user } = useAuth(); // ✅ user includes role info
  const { saveDataIngestion, isLoading } = useDataIngestion();
  const navigate = useNavigate();

  const { getUserPermissions } = useUserPermission();
  const createUserPermission = getUserPermissions({
    permissionType: "create-user",
  });

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await saveDataIngestion({ url: listURL });
      if (response.data.status !== "SUCCESS") return;

      let rawData = response.data.data;

      // ✅ Role-based filtering
      if (user?.role !== "admin") {
        rawData = rawData.filter(
          (obj) => obj.user_id === user?.id // only show claims belonging to this user
        );
      }

      const tableFormattedData = rawData.map((obj) => {
        const Month = new Date(obj.requested_date).getMonth() + 1;
        const Year = new Date(obj.requested_date).getFullYear();
        const formattedMonth = Month.toString().padStart(2, "0");
        const requestNumber = 'PO/${obj.offer_id}/${Year}-${formattedMonth}';

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
    } catch (error) {
      console.log({ error });
    }
  }, [user, saveDataIngestion]);

  const fetchDistributor = useCallback(async () => {
    try {
      const response = await saveDataIngestion({ url: productURL });
      if (response.data.status !== "SUCCESS") return;

      const Options = response.data.data.map((obj) => ({
        value: obj.product_id,
        name: obj.product_name,
      }));

      // create a copy to avoid mutating the original
      AddNewUserData.forEach((item) => {
        if (item.name === "product_id") {
          item.options = Options;
        }
      });
    } catch (error) {
      console.log({ error });
    }
  }, [saveDataIngestion]);

  useEffect(() => {
    if (token) {
      fetchData();
      fetchDistributor();
    } else {
      navigate("/login");
    }
  }, [token, navigate, fetchData, fetchDistributor]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: '${sidebarOpen ? expandedWidth : collapsedWidth}px',
          transition: "margin-left 0.3s",
        }}
      >
        <Container>
          {/* Modal Table */}
          <TableModal
            open={openModal}
            close={() => setOpenModal(false)}
            data={data}
            modalTableHeadCells={modalTableHeadCells}
          />

          {/* Add New Offer → only for Admin */}
          {user?.role === "admin" && createUserPermission && (
            <AddNewAdminModal
              data={AddNewUserData}
              title="Add New Offer"
              buttonLabel="New Offer"
              url={insertURL}
              needEmployeeID={false}
            />
          )}

          {/* Table */}
          {!isLoading && (
            <>
              {!data.length && <p>No Data Available</p>}
              {!!data.length && (
                <AdvancedTable
                  data={data}
                  showMoreData={() => setOpenModal(true)}
                  headCells={headCells}
                  fetchDataCallBack={fetchData}
                />
              )}
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Claim;
