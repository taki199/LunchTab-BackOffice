import React, { useEffect } from "react";
import { Box, useTheme , Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../features/orderSlice";
import Header from "../../components/Header";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import { format } from "date-fns";
import Avatar from "@mui/material/Avatar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleDelete = (orderId) => {
    //dispatch(deleteOrder(orderId));
  };

  const handleEdit = (orderId) => {
    //
  };

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
      field: "formattedCreatedAt",
      headerName: "Created At",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins] ',
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" marginTop={'8px'}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row._id)}
            style={{ 
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], 
              color: theme.palette.mode === 'dark' ? 'white' : 'white',
              marginLeft: '2px',
            }}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row._id)}
            style={{ marginRight: '8px',  marginLeft: '4px', backgroundColor: theme.palette.error.main, color: 'white' }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Button variant="contained" color="primary" 
         style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: theme.palette.mode === 'dark' ? 'white' : 'white' }}
         startIcon={<AddIcon />}> Add
        </Button>
      </Box>
      <Header title="ORDERS" subtitle="Managing orders and list of orders" />
      <Box mt="40px" height="75vh">
        <DataGrid
          loading={loading}
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
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Orders;
