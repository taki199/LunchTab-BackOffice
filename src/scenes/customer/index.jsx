import React, { useEffect } from "react";
import { Box, Avatar, IconButton, useTheme, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers, deleteCustomer } from "../../features/customerSlice";
import Header from "../../components/Header";
import { Edit, Delete } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Update, Add } from "@mui/icons-material";

const Customer = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customer);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);
  
  const handleDelete = (customerId) => {
    dispatch(deleteCustomer(customerId));
  };
  const handleUpdateClick=(customerId)=>{
    console.log(customerId)
  }

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.5,
      renderCell: (params) => (
        <Avatar 
          alt={params.row.username} 
          src={params.row.profilePhoto.url} 
          sx={{ width: 60, height: 60 }}
        />
      ),
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" marginTop={"16px"}>
          <Button
            variant="outlined"
            startIcon={<Update />}
            style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: 'white', marginRight: '8px' }}
            onClick={() => handleUpdateClick(params.row._id)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            style={{ backgroundColor: theme.palette.error.main, color: 'white' }}
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="Managing customers and list of customers" />
      <Box mt="20px" display="flex" justifyContent="flex-end">
        <Button variant="contained" startIcon={<Add />}  style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: 'white', marginRight: '8px' }}>
          Add Customer
        </Button>
      </Box>
      <Box mt="20px" height="60vh">
        {customers.data ? (
          <DataGrid
            loading={loading}
            rows={customers.data}
            columns={columns}
            rowHeight={80} // Adjust the row height
          />
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
};

export default Customer;
