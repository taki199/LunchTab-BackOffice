import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../features/orderSlice";
import Header from "../../components/Header";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import { format } from "date-fns";
import Avatar from "@mui/material/Avatar";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins] ',
    },
    {
      field: "customerUsername",
      headerName: "Customer",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins] ',
    },
    {
      field: "profilePhoto",
      headerName: "Image",
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      renderCell: (params) => (
        <Avatar
          alt={params.row.customer.profilePhoto}
          src={params.row.customer.profilePhoto.url}
          style={{ marginTop: '5px', display: 'block', marginRight:'15px'}}

        />
      ),
    },
    
    {
      field: "orderItems",
      headerName: "Order Items",
      flex: 2,
      headerClassName: 'font-bold text-lg font-[poppins] ',
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins] ',
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      valueFormatter: (params) =>
        params.value ? format(new Date(params.value), "yyyy-MM-dd HH:mm:ss") : null,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="Managing orders and list of orders" />
      <Box mt="40px" height="75vh">
        <DataGrid
          loading={loading}
          rows={orders.map((order) => {
           
            const totalQuantity = order.orderItems.reduce((total, item) => total + item.quantity, 0);
           
            return {
              ...order,
              totalAmount:`$${order.totalAmount}`,
              customerUsername: order.customer ? order.customer.username : 'N/A',
              quantity: order.orderItems.map((item) => `${item.quantity} `) ,
              orderItems: order.orderItems.map((item) => `${item.dishId.name} (*${item.quantity})`).join(", ")
            };
          })}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Orders;
