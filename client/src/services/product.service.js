import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const API_URL = 'http://localhost:4000/api';

const getProducts = () => {
  var token = cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.get(API_URL + '/product', config);
};

export default {
  getProducts
}