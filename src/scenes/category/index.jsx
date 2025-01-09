import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Pagination, IconButton, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, deleteCategory } from "../../features/categorySlice";
import { Add, Edit, Delete } from "@mui/icons-material";
import Header from "../../components/Header";
import { Link, useNavigate } from 'react-router-dom';
import CategoryModal from "../../components/CategoryModal";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const pageSize = 4;
  const totalPages = Math.ceil(categories.length / pageSize);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleUpdateClick = (categoryId) => {
    navigate(`/category/updateCategory/${categoryId}`);
  }

  const handleDeleteClick = (categoryId) => {
    dispatch(deleteCategory(categoryId));
    setIsToastOpen(true);
  };

  const paginateCategories = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedCategories = paginateCategories(categories, currentPage, pageSize);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  return (
    <Box m="1.5rem 5px">
      <Header
        title="Category"
        subtitle={<Typography sx={{ fontSize: '1.5rem', fontFamily: 'Poppins' }}>Managing categories and list of categories</Typography>}
      />
      <Box mt="20px" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'Poppins' }}>Categories</Typography>
        <Button variant="contained" color="secondary" startIcon={<Add />} onClick={handleModalOpen}>
          Add Category
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table aria-label="categories table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Poppins' }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Poppins' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Poppins' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Poppins' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <img src={category.image.url} alt={category.name} style={{ width: '140px', height: '100px', objectFit: 'cover', borderRadius: "10px" }} />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description || 'No description available'}</TableCell>
                <TableCell>
                  <IconButton color="green" aria-label="edit category" onClick={() => handleUpdateClick(category._id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" aria-label="delete category" onClick={() => handleDeleteClick(category._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box mt="20px" display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      </TableContainer>
      <CategoryModal open={isModalOpen} handleClose={handleModalClose} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isToastOpen}
        autoHideDuration={6000}
        onClose={handleToastClose}
        message="Category deleted successfully"
      />
    </Box>
  );
};

export default Category;
