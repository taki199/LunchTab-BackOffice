import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const userApi = {
  loginUser: async (user) => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login/admin", user);
      const { token } = response.data;

      // Save the token to localStorage
      localStorage.setItem('userData', JSON.stringify({ token }));

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  getUserProfile: async () => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); // Parse JSON string to get token

      const response = await axios.get(`http://localhost:5001/api/users/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  getAllUsersCtrl: async () => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData); // Parse JSON string to get token

      const response = await axios.get(`http://localhost:5001/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  registerUserCtrl: async (userData) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/auth/register/admin`, userData);
      return response.data; // Return response data
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to register user. Please try again.');
    }
  },
  deleteUserProfileCtrl: async (userId) => {
    try {
      const userData = localStorage.getItem('userData');
      const { token } = JSON.parse(userData);

      const response = await axios.delete(`http://localhost:5001/api/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to delete user. Please try again.');
    }
  },
  
};
