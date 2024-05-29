import React, { useEffect, useState } from "react";
import { Box, TableCell, TableContainer, Table, TableHead, TableBody, TableRow, TablePagination, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishes,deleteDish } from "../../features/dishSlice";
import Header from "../../components/Header";
import { Update, Add } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const { dishes, loading } = useSelector((state) => state.dish);
  const [pageSize, setPageSize] = useState(4);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);


  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleDeleteClick = (dishId) => {
    dispatch(deleteDish(dishId));
    console.log(dishId)
  };

  const handleUpdateClick = (dishId) => {
    navigate(`/products/updateDish/${dishId}`);
  }

  // Define a function to generate a unique id for each row
  const generateRowId = (data) => {
    return data.map((row) => ({
      ...row,
      id: row._id, // Assuming "_id" is a unique identifier for each row
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Define a function to calculate row height dynamically based on content
  const getRowHeight = () => {
    return 120; // Adjust the height as needed
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const columns = [
    {
      field: 'avatar',
      headerName: 'Image',
      flex: 0.5,
      headerClassName: 'font-bold text-lg font-[poppins]',
      renderCell: (params) => (
        <TableCell style={{ width: '160px', height: '400px' }}>
          <img src={params.row.image.url} alt="Dish" style={{ width: '140px', height: '100px', objectFit: 'cover', marginLeft: '40px', marginBottom: '20px', marginTop: '-5px', borderRadius: "10px" }} />
        </TableCell>
      ),
    },
    { field: 'name', headerName: 'Name', flex: 0.5, headerClassName: 'font-bold text-lg font-[poppins]' },
    { field: 'category', headerName: 'Category', flex: 0.5, headerClassName: 'font-bold text-lg font-[poppins]' },
    { field: 'price', headerName: 'Price', flex: 0.5, headerClassName: 'font-bold text-lg font-[poppins]' },
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

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0); // Reset page to 0 when changing page size
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="Managing products and list of products" />
      <Box mt="20px" display="flex" justifyContent="flex-end">
        <Button
          component={Link}
          to="/products/addDish"
          variant="contained"
          startIcon={<Add />}
          style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: 'white', marginBottom: '8px' }}
        >
          Add Dish
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dishes ? (
              dishes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dish) => (
                <TableRow key={dish._id}>
                  <TableCell>
                    <img src={dish.image.url} alt="Dish" style={{ width: '140px', height: '100px', objectFit: 'cover', borderRadius: "10px" }} />
                  </TableCell>
                  <TableCell>{dish.name}</TableCell>
                  <TableCell>{dish.category ? dish.category.name : 'N/A'}</TableCell>
                  <TableCell>{dish.price ? `$${dish.price}` : 'N/A'}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      style={{ marginRight: '8px', backgroundColor: theme.palette.error.main, color: 'white' }}
                      onClick={() => handleDeleteClick(dish._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Update />}
                      style={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary[500], color: theme.palette.mode === 'dark' ? 'white' : 'white' }}
                      onClick={() => handleUpdateClick(dish._id)}
                      to="/products/updateDish"
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 10, 25]}
        component="div"
        count={dishes ? dishes.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Products;
