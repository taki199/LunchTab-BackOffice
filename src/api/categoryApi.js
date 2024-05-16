import axios from 'axios';

export const categoryApi = {
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
};