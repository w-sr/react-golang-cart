import {
  ADD_CART,
  REMOVE_CART,
  SET_CART,
  UPDATE_CART,
  CHECKOUT_CART,
} from './types';

import CartService from '../services/cart.service';
import store from '../store'

export const addCart = (item) => (dispatch) => {
  dispatch({
    type: ADD_CART,
    payload: item
  });
};

export const removeCart = (item) => (dispatch) => {
  dispatch({
    type: REMOVE_CART,
    payload: item
  });
};

export const updateCart = (item) => (dispatch) => {
  dispatch({
    type: UPDATE_CART,
    payload: item
  });
};

export const getCart = () => (dispatch) => {
  const userID = store.getState().auth.user.user.ID
  return CartService.getCart(userID).then(
    (response) => {
      dispatch({
        type: SET_CART,
        payload: response.data.data
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message)
      return Promise.reject();
    }
  );
};

export const checkoutCart = (cart) => (dispatch) => {
  const userID = store.getState().auth.user.user.ID
  return CartService.checkout(cart, userID).then(
    (response) => {
      dispatch({
        type: CHECKOUT_CART,
        payload: response
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message)
      return Promise.reject();
    }
  );
};

