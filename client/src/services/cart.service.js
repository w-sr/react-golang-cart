import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const API_URL = 'http://localhost:4000/api';

const checkout = (cart, userID) => {
  var token = cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.post(API_URL + '/cart', {
    cart: cart.items ? cart.items : [],
    id: userID
  }, config);
};

const getCart = (userID) => {
  var token = cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.get(API_URL + '/cart/' + userID, config);
};

export default {
  checkout,
  getCart
}