import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const register = (username, email, password) => {
  return axios.post(API_URL + '/auth/register', {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + '/auth/login', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
