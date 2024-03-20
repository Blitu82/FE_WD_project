import axios from 'axios';

// this does not work!
// const baseURL = `${import.meta.env.BACKEND_URL}/auth`;
// console.log(import.meta.env.BACKEND_URL);

// const baseURL = 'http://localhost:5005/auth';
const baseURL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};

// send the jwt in the authorization headers
export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
