import React, { useEffect, useState } from "react";
import { Box, useTheme, Button, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus, deleteOrder } from "../../features/orderSlice";
import Header from "../../components/Header";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderStatusCell from '../../components/OrderStatusCell';
import './index.css';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const theme = useTheme();
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleDelete = () => {
    selectionModel.forEach(orderId => {
      dispatch(deleteOrder(orderId));
    });
    setSelectionModel([]);
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId: orderId, orderData: { orderStatus: newStatus } }));
  };


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins]',
    },
    {
      field: "customerUsername",
      headerName: "Customer",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins]',
      renderCell: (params) => (
        <Avatar
          alt={params.row.customer.username}
          src={params.row.customer.profilePhoto.url}
          style={{ marginTop: '5px', display: 'block', marginRight: '15px'}}
        />
      ),
    },
    {
      field: "orderItems",
      headerName: "Order Items",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins]',
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins]',
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins]',
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins]',
      renderCell: (params) => (
        <OrderStatusCell
          orderId={params.row._id}
          currentStatus={params.value}
          onStatusChange={handleStatusChange}
        />
      ),
    },
    {
      field: "formattedCreatedAt",
      headerName: "Date",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins]',
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
    <Header title="ORDERS" subtitle="List of Orders" />
    <Box
      display="flex"
      justifyContent="flex-end"
      mb="20px"
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: 'white' }}
      >
        Add Order
      </Button>
      {selectionModel.length > 0 && (
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          style={{ backgroundColor: 'red', color: 'white', marginLeft: '8px' }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
    </Box>
      <Box
        mt="20px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={orders.map((order) => {
            const totalQuantity = order.orderItems.reduce((total, item) => total + item.quantity, 0);

            return {
              ...order,
              totalAmount: `$${order.totalAmount}`,
              customerUsername: order.customer ? order.customer.username : 'N/A',
              quantity: order.orderItems.map((item) => `${item.quantity} `),
              orderItems: order.orderItems.map((item) => `${item.dishId.name} (*${item.quantity})`).join(", "),
            };
          })}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ ColumnMenu: CustomColumnMenu }}
          loading={loading}
          checkboxSelection
          onSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
          selectionModel={selectionModel}
        />
      </Box>
    </Box>
  );
};

export default Orders;
