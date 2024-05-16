import React, { useEffect } from "react";
import { Box, Avatar, TableCell, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishes } from "../../features/dishSlice";
import Header from "../../components/Header";
import { Edit, Delete } from "@mui/icons-material";

const Products = () => {
  const dispatch = useDispatch();
  const { dishes, loading } = useSelector((state) => state.dish);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleDelete = (dishId) => {
    //dispatch(deleteDish(dishId));
    console.log(dishId)
  };

  // Define a function to generate a unique id for each row
  const generateRowId = (data) => {
    return data.map((row) => ({
      ...row,
      id: row._id, // Assuming "_id" is a unique identifier for each row
    }));
  };

  // Define a function to calculate row height dynamically based on content
  const getRowHeight = () => {
    return 120; // Adjust the height as needed
  };

  const columns = [
   // { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'avatar',
      headerName: 'Image',
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      renderCell: (params) => (
        <TableCell style={{ width: '160px', height:'400px'  }}>
          <img src={params.row.image.url} alt="Dish" style={{ width: '140px', height: '100px', objectFit: 'cover', marginLeft:'40px', marginBottom:'20px',marginTop:'-5px', borderRadius:"10px" }} />
        </TableCell>
      ),
    },
    { field: 'name', headerName: 'Name', flex: 0.5,headerClassName: 'font-bold text-lg font-[poppins] ',},
    { field: 'category', headerName: 'Category', flex: 0.5, headerClassName: 'font-bold text-lg font-[poppins] ', },
    { field: 'price', headerName: 'Price', flex: 0.5, headerClassName: 'font-bold text-lg font-[poppins] ', },
    {
      field: 'update',
      headerName: 'Update',
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      renderCell: (params) => (
        <IconButton
          className="border rounded-full p-2 transition-colors duration-300 hover:border-green-500"
          style={{ color: "#27834E" }}
          onClick={() => handleUpdate(params.row._id)}
        >
          <Edit />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins] ',
      renderCell: (params) => (
        <IconButton
          className="border rounded-full p-2 transition-colors duration-300 hover:border-yellow-500"
          style={{ color: "#FFBD4A" }}
          onClick={() => handleDelete(params.row._id)}
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  const handleUpdate = (dishId) => {
    // Implement the update functionality here
    console.log('Update dish:', dishId);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="Managing products and list of products" />
      <Box mt="40px" height="70vh" width="100%">
        {dishes.data ? (
          <DataGrid
          loading={loading}
          rows={generateRowId(dishes.data.map(dish => ({
            ...dish,
            price: dish.price ? `$${dish.price}` : 'N/A',
            category:dish.category ? `${dish.category.name}` : 'N/A'
            
          })))} // Modify the price here
          columns={columns}
          getRowHeight={getRowHeight} // Set the function to calculate row height
          checkboxSelection
          disableSelectionOnClick
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          
        />
        
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
};

export default Products;
