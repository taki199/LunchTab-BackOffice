import React, { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../features/orderSlice";
import Header from "../../components/Header";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import { format } from "date-fns";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Column definitions for the DataGrid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 0.5,
      valueGetter: (params) => params.row.customer.username,
    },
    {
      field: "orderItems",
      headerName: "Order Items",
      flex: 1,
      valueGetter: (params) =>
        params.row.orderItems.map((item) => item.dishId.name).join(", "),
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 0.5,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.5,
      valueFormatter: (params) =>
        format(new Date(params.value), "yyyy-MM-dd HH:mm:ss"),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="Managing orders and list of orders" />
      <Box mt="40px" height="75vh">
        {orders.data ? (
          <DataGrid
            loading={loading}
            rows={orders.data}
            columns={columns}
            components={{
              ColumnMenu: CustomColumnMenu,
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
};

export default Orders;