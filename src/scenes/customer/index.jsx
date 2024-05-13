import React, { useEffect } from "react";
import { Box, Avatar } from "@mui/material"; // Import Avatar component
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers, deleteCustomer } from "../../features/customerSlice";
import Header from "../../components/Header";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Customer = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);
  
  const handleDelete = (customerId) => {
    dispatch(deleteCustomer(customerId));
  };

  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 1,
    // },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Avatar 
            alt={params.row.username} 
            src={params.row.profilePhoto.url} 
            style={{ 
              width: 'auto', // Let the browser determine the width based on the aspect ratio
              height: '100%', // Use 100% height to ensure Avatar fits within the cell
            }} 
          />
        </div>
      ),
    },
    
    
    {
      field: "username",
      headerName: "Username",
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
    },
    {
      field: "update",
      headerName: "Update",
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      renderCell: () => (
        <IconButton
          className="border rounded-full p-2 transition-colors duration-300 hover:border-green-500"
          style={{ color: '#27834E' }}
        >
          <Edit />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      renderCell: (params) => (
        <IconButton
          className="border rounded-full p-2 transition-colors duration-300 hover:border-yellow-500"
          style={{ color: '#FFBD4A' }}
          onClick={() => handleDelete(params.row._id)}
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="Managing customers and list of customers" />
      <Box mt="40px" height="75vh">
        {customers.data ? (
          <DataGrid
            loading={loading}
            rows={customers.data}
            columns={columns}
            components={{
              ColumnMenu: CustomColumnMenu,
            }}
            rowStyle={{ height: 100 }} // Set the row height here
          />
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
};

export default Customer;
