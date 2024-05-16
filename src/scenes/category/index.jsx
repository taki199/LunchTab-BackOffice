import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Box, Avatar } from "@mui/material";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Header from "../../components/Header";
import Typography from '@mui/material/Typography';
import { fetchAllCategories } from '../../features/categorySlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function ImgMediaCard() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  React.useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Function to paginate categories
  const paginateCategories = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  // Constants for pagination
  const pageSize = 3;
  const totalPages = Math.ceil(categories.length / pageSize);

  // State for current page
  const [currentPage, setCurrentPage] = React.useState(1);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Paginate categories for current page
  const paginatedCategories = paginateCategories(categories, currentPage, pageSize);

  return (
    <Box m="1.5rem 5px">
    <Header title="Category" subtitle={<Typography sx={{ fontSize: '1.5rem', fontFamily: 'Poppins' }}>Managing category and list of categories</Typography>} />
      <Box mt="20px" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'Poppins' }}>Categories</Typography>
        <Box display="flex" alignItems="center">
          <Button variant="contained" color="secondary" startIcon={<AddIcon />}>Add</Button>
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
          {Array.from({ length: totalPages }, (_, index) => (
            <Button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Button>
          ))}
        </Box>
      </TableContainer>
    </Box>
  );
}
