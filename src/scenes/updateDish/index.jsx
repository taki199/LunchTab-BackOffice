import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
  Grid,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategories } from '../../features/categorySlice';
import { fetchDishes, updateDish } from '../../features/dishSlice';

const UpdateDishForm = ({ dishId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
  });
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.category);
  const { dishes, loading: dishesLoading, error: dishesError, updating, updateError } = useSelector((state) => state.dish);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchDishes());
  }, [dispatch]);

  useEffect(() => {
    if (dishes.length > 0) {
      const dish = dishes.find(d => d._id === dishId);
      if (dish) {
        setFormData({
          name: dish.name,
          description: dish.description,
          price: dish.price,
          category: dish.category._id, // Assuming category is an object with _id and name
          stock: dish.stock,
          image: null, // Handle image separately
        });
        setCurrentImageUrl(dish.image.url); // Set current image URL
      }
    }
  }, [dishes, dishId]);

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

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      category: selectedCategoryId,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stock', formData.stock);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await dispatch(updateDish({ id: dishId, credentials: formDataToSend })).unwrap();
      // Optionally clear the form or show a success message
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  if (dishesLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: '2rem' }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Update Dish
      </Typography>
      {(categoriesError || dishesError || updateError) && <Typography color="error">{categoriesError || dishesError || updateError}</Typography>}
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
          <TextField
            name="price"
            label="Price"
            variant="outlined"
            type="number"
            fullWidth
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              name="category"
              labelId="category-label"
              value={formData.category || ''}
              onChange={handleCategoryChange}
              required
              disabled={categoriesLoading}
            >
              {categoriesLoading ? (
                <MenuItem disabled value="">
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
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
        <Grid item xs={12} md={6}>
          <TextField
            name="stock"
            label="Stock"
            variant="outlined"
            type="number"
            fullWidth
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={updating}
          >
            {updating ? <CircularProgress size={24} /> : 'Update Dish'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateDishForm;
