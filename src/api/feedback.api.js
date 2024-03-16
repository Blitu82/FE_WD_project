import axios from 'axios';
const baseURL = 'http://localhost:5005/api';

export const feedback = feedbackData => {
  const storedToken = localStorage.getItem('authToken');
  return axios.post(`${baseURL}/feedback`, feedbackData, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
