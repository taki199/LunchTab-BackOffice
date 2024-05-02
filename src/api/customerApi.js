// customerApi.js
import axios from 'axios';

export const customerApi = {
  getAllCustomers: async () => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); // Parse JSON string to get token
      const response = await axios.get(`http://localhost:5001/api/customers/profile`, {
          headers: {
              Authorization: `Bearer ${token}`, // Include token in request headers
          },
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response.data.message);
  }

  },
  
  deleteCustomerById: async (customerId) => {
    try {
      await axios.delete(`http://localhost:5001/api/customers/profile/${customerId}`);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  updateCustomerById: async (customerId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/customers/profile/${customerId}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  // Add other CRUD operations as needed
};
