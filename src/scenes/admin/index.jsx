import React, { useEffect, useState } from "react";
import { Box, useTheme, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination, Paper, Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../../features/userSlice";
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import { Update } from "@mui/icons-material";
import AddUserModal from "../../components/AddUserModal";

const Admin = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteUser(id));
  };

  const handleUpdateClick = (id) => {
    console.log('updating user with id ', id);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
        <Header title="ADMINS" subtitle="Managing admins and list of admins" />
        <Button variant="contained" onClick={handleOpenModal} 
          style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: 'white' }}
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper}>
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
              users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Avatar alt={user.username} src={user.profilePhoto?.url} sx={{ width: 60, height: 60 }} />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      style={{ marginRight: '8px', backgroundColor: theme.palette.error.main, color: 'white' }}
                      onClick={() => handleDeleteClick(user._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Update />}
                      style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: 'white' }}
                      onClick={() => handleUpdateClick(user._id)}
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddUserModal open={openModal} setOpen={setOpenModal} />
    </Box>
  );
};

export default Admin;
