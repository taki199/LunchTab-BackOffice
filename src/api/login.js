// api/login.js

import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('/api/login', { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};
