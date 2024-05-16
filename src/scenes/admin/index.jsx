import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../../features/userSlice";
import Header from "../../components/Header";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Update } from "@mui/icons-material";
import AddUserModal from "../../components/AddUserModal";

const Admin = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(fetchAllUsers());
   
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleRowSelection = (selectedRows) => {
    setSelectedRows(selectedRows);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteUser(id)); // Dispatch deleteUser action with the user's ID
    dispatch(fetchAllUsers());
  };

  const handleUpdateClick = (id) => {
    console.log('updating user with id ', id);
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.7,
      renderCell: (params) => (
        <Avatar alt={params.row.username} src={params.row.profilePhoto.url} sx={{ width: 60, height: 60 }} />
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
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 240,
      renderCell: (params) => (
        <div>
          {/* Delete Button */}
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            style={{ marginRight: '8px', backgroundColor: theme.palette.error.main, color: 'white' }}
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
        <Button variant="contained" onClick={handleOpenModal} 
        style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: theme.palette.mode === 'dark' ? 'white' : 'white' }}
        >Add User</Button>
      </Box>
      <Box mt="40px" height="75vh">
        {users.data ? (
          <DataGrid
            pageSizeOptions={[5, 10, 25]}
            loading={loading}
            rows={users.data}
            columns={columns}
            checkboxSelection
            pageSize={5}
            pagination
            onSelectionModelChange={handleRowSelection}
            rowHeight={70} // Adjust the row height to accommodate the larger avatars
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
