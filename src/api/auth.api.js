import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};

export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};

export const changePassword = user => {
  return axios.post(`${baseURL}/change-password`, user);
};
