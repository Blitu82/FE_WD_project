import axios from 'axios';
// const baseURL = 'http://localhost:5005/api';

const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const feedback = feedbackData => {
  const storedToken = localStorage.getItem('authToken');
  return axios.post(`${baseURL}/feedback`, feedbackData, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
