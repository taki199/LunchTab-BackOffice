import React, { useEffect, useState } from "react";
import { Box, colors, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features/userSlice";
import Header from "../../components/Header";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Update } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import AddUserModal from "../../components/AddUserModal";
 // Import AddUserModal component
 


const Admin = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);
  const theme = useTheme();
  const [selectedRows, setSelectedRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Handle row selection
  const handleRowSelection = (selectedRows) => {
    setSelectedRows(selectedRows);
  };

  // Handle delete button click
  const handleDeleteClick = (id) => {
    // Implement deletion logic here using the ID
    console.log("Deleting user with ID:", id);
  };

  const handleUpdateClick = (id) => {
    console.log('updating user with id ', id)
  }

  // Column definitions for the DataGrid
  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 1,
    //   headerClassName: 'font-bold text-lg font-[poppins] ',
    // },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      renderCell: (params) => (
        <Avatar alt={params.row.username} src={params.row.profilePhoto.url} /> // Update src attribute
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
    // Add a column for the delete button
    {
      field: 'actions',
      headerName: 'Actions',
      headerClassName: 'font-bold text-lg font-[poppins] ',
      sortable: false,
      width: 240, // Increased width to accommodate both buttons
      renderCell: (params) => (
        <div>
          {/* Delete Button */}
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            style={{ marginRight: '8px', backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary[500], color: theme.palette.mode === 'dark' ? 'white' : 'white' }}
            onClick={() => handleDeleteClick(params.row._id)}
          >
            Delete
          </Button>

          {/* Update Button */}
          <Button
            variant="outlined"
            startIcon={<Update />}
            style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: theme.palette.mode === 'dark' ? 'white' : 'white' }}
            onClick={() => handleUpdateClick(params.row._id)}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
        <Header title="ADMINS" subtitle="Managing admins and list of admins" />
        <Button variant="contained" onClick={handleOpenModal}>Add User</Button>
      </Box>
      <Box mt="40px" height="75vh">
        {users.data ? (
          <DataGrid pageSizeOptions={[5, 10, 25]}

          loading={loading}
          rows={users.data}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
          checkboxSelection
          pageSize={5} // Display only 5 rows per page
          pagination
          onSelectionModelChange={handleRowSelection}
        />
        
        
        ) : (
          <p>Loading...</p>
        )}
      </Box>
      <AddUserModal open={openModal} setOpen={setOpenModal} />
    </Box>
  );
  
};

export default Admin;
