import axios from 'axios';

export const customerApi = {
  getAllCustomers: async () => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); 
      const response = await axios.get(`http://localhost:5001/api/customers/profile`, {
          headers: {
              Authorization: `Bearer ${token}`, 
          },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  createCustomer: async (newCustomerData) => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', newCustomerData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  
  deleteCustomerById: async (customerId) => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); 
      await axios.delete(`http://localhost:5001/api/customers/profile/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  
  updateCustomerById: async (customerId, updatedData) => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); 
      const response = await axios.put(`http://localhost:5001/api/customers/profile/${customerId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  
};
