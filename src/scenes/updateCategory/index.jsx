import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
  Grid,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategories, updateCategory } from '../../features/categorySlice';
import { notifySuccess, notifyError } from '../../components/Toast';

const UpdateCategoryForm = ({ categoryId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  const dispatch = useDispatch();
  const { loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    // Fetch category data and update the form state
    // For simplicity, assuming categories are fetched elsewhere and stored in Redux store
    // Replace this with actual logic to fetch category details
    const categoryData = {
      _id: categoryId,
      name: 'Category Name', // Replace with actual category name
      description: 'Category Description', // Replace with actual category description
      // Add other fields if needed
    };

    // Update form state with fetched category data
    setFormData({
      name: categoryData.name,
      description: categoryData.description,
      image: null, // Handle image separately
    });
    // Set current image URL if available
    // Replace 'categoryData.image.url' with the actual URL field
    setCurrentImageUrl(categoryData.image ? categoryData.image.url : null);
  }, [categoryId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: imageFile,
    }));
    setCurrentImageUrl(URL.createObjectURL(imageFile)); // Update preview with new image
  };

  const handleRemoveImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      image: null,
    }));
    setCurrentImageUrl(null); // Remove current image preview
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await dispatch(updateCategory({ id: categoryId, categoryData: formDataToSend })).unwrap();
      // Optionally clear the form or show a success message
      notifySuccess('Category Updated Successfully');
    } catch (error) {
      console.error('Error updating category:', error);
      notifyError('Error updating category');
    }
  };

  return (
    <Box sx={{ padding: '2rem' }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Update Category
      </Typography>
      {categoriesError && <Typography color="error">{categoriesError}</Typography>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <input
            accept="image/*"
            id="image-input"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-input">
            <Button variant="contained" component="span">
              Upload Picture
            </Button>
          </label>
          {currentImageUrl && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
              <img
                src={currentImageUrl}
                alt="Selected"
                style={{ width: '50%', height: 'auto', marginRight: '1rem' }}
              />
              <Button variant="outlined" onClick={handleRemoveImage}>
                Remove Image
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Update Category
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateCategoryForm;
