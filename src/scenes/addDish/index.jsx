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
import { createNewDish } from '../../features/dishSlice';

const AddDishForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
  });

  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const { creating, createError } = useSelector((state) => state.dish);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

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
  };

  const handleRemoveImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      image: null,
    }));
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
      await dispatch(createNewDish(formDataToSend)).unwrap();
      // Clear the form after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null,
      });
    } catch (error) {
      console.error('Error creating dish:', error);
    }
  };

  return (
    <Box sx={{ padding: '2rem' }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Add New Dish
      </Typography>
      {(error || createError) && <Typography color="error">{error || createError}</Typography>}
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
              disabled={loading}
            >
              {loading ? (
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
          {formData.image && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Selected"
                style={{ width: '50%', height: '400px', marginRight: '1rem' }}
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
            disabled={creating}
          >
            {creating ? <CircularProgress size={24} /> : 'Add Dish'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddDishForm;
