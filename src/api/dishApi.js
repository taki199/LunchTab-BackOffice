import axios from 'axios';

// Get the base URL from environment variables
const baseURL = process.env.REACT_APP_BASE_URL;

export const dishApi = {
  // Create a new dish
  createDishCtrl: async (newDishData) => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData);
      const response = await axios.post(`http://localhost:5001/api/dishes`, newDishData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  // Update an existing dish
  updateDishCtrl: async (id, credentials) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/dishes/${id}`, credentials);
      return response.data;
    } catch (error) {
      // Check if error response and message exist
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        // Handle other types of errors
        throw new Error('An error occurred while updating the dish.');
      }
    }
  },
  // Delete a dish by ID
  deleteDishCtrl: async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/dishes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  // Get a single dish by ID
  getSingleDishCtrl: async (id) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/dishes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  // Get all dishes
  getAllDishesCtrl: async () => {
    try {
        const userData=localStorage.getItem('userData')
        const {token} = JSON.parse(userData)
      const response = await axios.get(`http://localhost:5001/api/dishes`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  //Dish Count 
  //http://localhost:5001/api/dishes/my-count/my-dishes
  
};

export const countDish= async (token) => {
  try {
   
    const response = await axios.get(`http://localhost:5001/api/dishes/my-count/my-dishes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error counting dishes:', error);
    throw new Error(error.response?.data?.message || 'An error occurred while counting dishes.');
  }
};