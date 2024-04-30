import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";

const Admin = () => {
  // Accessing theme object from MUI
  const theme = useTheme();

  // Static dummy data for demonstration
  const users = [
    {
      id: 1, // Unique id added manually
      _id: "1",
      username: "JohnDoe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      country: "USA",
      occupation: "Developer",
      isAdmin: true,
      isDeleted: false,
      profilePhoto: { url: "https://example.com/profile.jpg" },
      createdAt: new Date().toDateString(),
    },
    {
      id: 2, // Unique id added manually
      _id: "2",
      username: "JaneDoe",
      email: "jane@example.com",
      phoneNumber: "9876543210",
      country: "Canada",
      occupation: "Designer",
      isAdmin: false,
      isDeleted: false,
      profilePhoto: { url: "https://example.com/profile.jpg" },
      createdAt: new Date().toDateString(),
    },
    {
        id: 3, // Unique id added manually
        _id: "3",
        username: "JaneDoe",
        email: "jane@example.com",
        phoneNumber: "9876543210",
        country: "Canada",
        occupation: "Designer",
        isAdmin: false,
        isDeleted: false,
        profilePhoto: { url: "https://example.com/profile.jpg" },
        createdAt: new Date().toDateString(),
      },
  ];

  // Column definitions for the DataGrid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.5,
    },
    {
        field: "email",
        headerName: "email",
        flex: 0.5,
      },
      {
        field: "country",
        headerName: "country",
        flex: 0.5,
      },
      {
        field: "createdAt",
        headerName: "createdAt",
        flex: 0.5,
      },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header component with title and subtitle */}
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          // Your styling
        }}
      >
        {/* DataGrid component from MUI X */}
        <DataGrid
          loading={false} // Since it's static data, loading is always false
          rows={users}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Admin;
