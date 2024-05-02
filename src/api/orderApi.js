import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const orderApi = {
  getOrderById: async (orderId) => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData);
      const response = await axios.get(`http://localhost:5001/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  getAllOrders: async () => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData);
      const response = await axios.get(`http://localhost:5001/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  createOrder: async (orderData) => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData);
      const response = await axios.post(`http://localhost:5001/api/orders`, orderData, {
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