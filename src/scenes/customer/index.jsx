import React, { useEffect, useState } from "react";
import { Box, Avatar, Button, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers, deleteCustomer } from "../../features/customerSlice";
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import { Update, Add } from "@mui/icons-material";
import CustomerModal from "../../components/AddCustomer";

const Customer = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customer);
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);
  
  const handleDelete = async (customerId) => {
    await dispatch(deleteCustomer(customerId));
    dispatch(fetchAllCustomers()); // Fetch all customers again to update the state
  };
  
  
  const handleUpdateClick = (customerId) => {
    console.log("Update clicked for customerId:", customerId);
  };
  
  const handleAddCustomer = () => {
    console.log("Add Customer button clicked");
    setOpenModal(true);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="Managing customers and list of customers" />
      <Box mt="20px" display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          startIcon={<Add />}  
          style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: 'white', marginRight: '8px' }}
          onClick={handleAddCustomer}
        >
          Add Customer
        </Button>
      </Box>
      <Box mt="20px">
        <CustomerModal open={openModal} onClose={() => setOpenModal(false)} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Loading...</TableCell>
                </TableRow>
              ) : (
                customers?.data?.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>
                      <Avatar alt={customer.username} src={customer.profilePhoto?.url} sx={{ width: 60, height: 60 }} />
                    </TableCell>
                    <TableCell>{customer.username}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{new Date(customer.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        style={{ marginRight: '8px', backgroundColor: theme.palette.error.main, color: 'white' }}
                        onClick={() => handleDelete(customer._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Update />}
                        style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: 'white' }}
                        onClick={() => handleUpdateClick(customer._id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Customer;
