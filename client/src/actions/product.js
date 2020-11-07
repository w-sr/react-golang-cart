import {
  SET_PRODUCT
} from './types';
import ProductService from '../services/product.service';

export const getProducts = () => (dispatch) => {
  return ProductService.getProducts().then(
    (response) => {
      dispatch({
        type: SET_PRODUCT,
        payload: response.data
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
}
