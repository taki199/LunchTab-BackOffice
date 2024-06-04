import axios from 'axios';

// Get the base URL from environment variables


export const categoryApi = {
  // Get all categories
  getAllCategoriesCtrl: async () => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); // Parse JSON string to get token
      const response = await axios.get(`http://localhost:5001/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Create a new category
 createCategoryCtrl :async (categoryData) => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); // Parse JSON string to get token
  
      const response = await axios.post(`http://localhost:5001/api/categories`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Update an existing category
  updateCategoryCtrl: async (categoryId, categoryData) => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); // Parse JSON string to get token

      const response = await axios.put(`http://localhost:5001/api/categories/${categoryId}`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
        },
      });
      return response.data;
    } catch (error) {
      // Check if error response and message exist
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        // Handle other types of errors
        throw new Error('An error occurred while updating the category.');
      }
    }
  },

  // Delete a category by ID
  deleteCategoryCtrl: async (categoryId) => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); // Parse JSON string to get token

      const response = await axios.delete(`http://localhost:5001/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Get a single category by ID
//   getSingleCategoryCtrl: async (categoryId) => {
//     try {
//       const userData = localStorage.getItem('userData');
//       const { token } = JSON.parse(userData); // Parse JSON string to get token

//       const response = await axios.get(`http://localhost:5001/api/categories/${categoryId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   },
};
