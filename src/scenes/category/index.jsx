import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';
import Header from '../../components/Header';
import CategoryModal from '../../components/CategoryModal'; // Import CategoryModal
import { fetchAllCategories } from '../../features/categorySlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Category() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSaveCategory = (categoryData) => {
    // Handle saving the new category
    console.log('Saved category:', categoryData);
  };
  React.useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  // Function to paginate categories
  const paginateCategories = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  // Constants for pagination
  const pageSize = 4;
  const totalPages = Math.ceil(categories.length / pageSize);

  // State for current page
  const [currentPage, setCurrentPage] = React.useState(1);

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Paginate categories for current page
  const paginatedCategories = paginateCategories(categories, currentPage, pageSize);

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  return (
    <Box m="1.5rem 5px">
      <Header
        title="Category"
        subtitle={<Typography sx={{ fontSize: '1.5rem', fontFamily: 'Poppins' }}>Managing category and list of categories</Typography>}
      />
      <Box mt="20px" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'Poppins' }}>Categories</Typography>
        <Box display="flex" alignItems="center">
          <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleAddCategory}>
            Add
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table aria-label="categories table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Poppins' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Poppins' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Poppins' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Poppins' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <Card sx={{ maxWidth: 140 }}>
                    <CardMedia
                      component="img"
                      alt={category.name}
                      height="140"
                      image={category.image.url}
                    />
                  </Card>
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {category.description ? category.description : 'some description'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex">
                    <Button variant="contained" color="secondary" startIcon={<EditIcon />}>Edit</Button>
                    <Box ml={2} />
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />}>Delete</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <Box mt="20px" display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            size="large"
          />
        </Box>
      </TableContainer>
      <CategoryModal
       open={isModalOpen}
       handleClose={handleCloseModal}
       handleSave={handleSaveCategory}
      />
    </Box>
  );
}
