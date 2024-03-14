import axios from 'axios';
const baseURL = 'http://localhost:5005/api';

export const feedback = feedbackData => {
  return axios.post(`${baseURL}/feedback`, feedbackData);
};
