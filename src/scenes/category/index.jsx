import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchAllCategories } from '../../features/categorySlice';

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
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {paginatedCategories.map((category) => (
          <Card key={category._id} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt={category.name}
              height="140"
              image={category.image.url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {category.name}
              </Typography>
              {/* You can customize the below text as needed */}
              <Typography variant="body2" color="text.secondary">
                {/* Add additional category details here if needed */}
                some text descritpion
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
}
