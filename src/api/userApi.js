import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const userApi = {
  loginUser: async (credentials) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/auth/login/admin`, credentials);
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
  getAllUsersCtrl:async()=>{
    try{
      const response =await axios.get(`http://localhost:5001/api/users/profile`)
      return response.data
    }catch(err){
      console.log("Error in getting all users")
    }
  }
};
