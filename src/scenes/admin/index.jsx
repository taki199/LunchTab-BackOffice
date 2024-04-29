import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import { userApi } from "../../api/userApi"; // Import the getAllUsersCtrl function
const { getAllUsersCtrl } = userApi; 
const Admin = () => {
  const theme = useTheme();
  const [users, setUsers] = React.useState([]); // State to store users data
  const [isLoading, setIsLoading] = React.useState(true); // State to track loading status

  React.useEffect(() => {
    // Fetch all users data when component mounts
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const userData = await getAllUsersCtrl(); // Call the getAllUsersCtrl function
      setUsers(userData); // Set the users state with the fetched data
      setIsLoading(false); // Set loading status to false after data is fetched
    } catch (error) {
      console.log("Error fetching all users:", error);
      setIsLoading(false); // Set loading status to false if an error occurs
    }
  };

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
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      flex: 0.5,
      renderCell: (params) => {
        return params.value ? "Yes" : "No";
      },
    },
    {
      field: "isDeleted",
      headerName: "Deleted",
      flex: 0.5,
      renderCell: (params) => {
        return params.value ? "Yes" : "No";
      },
    },
    {
      field: "profilePhoto",
      headerName: "Profile Photo",
      flex: 1,
      renderCell: (params) => {
        return <img src={params.value.url} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} />;
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      type: "date",
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          // Your styling
        }}
      >
        <DataGrid
          loading={isLoading}
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
