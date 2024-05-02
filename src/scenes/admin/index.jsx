import React, { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features/userSlice";
import Header from "../../components/Header";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import Avatar from "@mui/material/Avatar";

const Admin = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Column definitions for the DataGrid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.5,
      renderCell: (params) => (
        <Avatar alt={params.row.username} src={params.row.profilePhoto.url} /> // Update src attribute
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
      field: "country",
      headerName: "Country",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box mt="40px" height="75vh">
        {users.data ? (
          <DataGrid
            loading={loading}
            rows={users.data}
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

export default Admin;