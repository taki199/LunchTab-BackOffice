import axios from 'axios';


const baseURL = process.env.REACT_APP_BASE_URL;

export const userApi = {
  loginUser: async (user) => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login/admin", user);
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
};

//login User 



