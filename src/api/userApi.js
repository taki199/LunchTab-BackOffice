import axios from 'axios';



axios.defaults.withCredentials = true; // Include cookies with every request

export const userApi = {
  loginUser: async (user) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/auth/login/admin`, user);
      // No need to store token in localStorage
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  getUserProfile: async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/users/profile/me`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  getAllUsersCtrl: async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/users/profile`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  registerUserCtrl: async (userData) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/auth/register/admin`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to register user. Please try again.');
    }
  },
  deleteUserProfileCtrl: async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/users/profile/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to delete user. Please try again.');
    }
  },
  profilePhotoUploaderCtrl: async (formData) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/users/profile/profile-photo-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};
