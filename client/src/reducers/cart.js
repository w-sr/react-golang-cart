import {
  ADD_CART,
  REMOVE_CART,
  SET_CART,
  UPDATE_CART,
} from '../actions/types';
import { algo } from '../utils/algo'

const initialState = {
  items: [],
  total: 0
};

export default function cart(state = initialState, action) {
  const { type, payload } = action;
  let newState = { ...initialState };

  switch (type) {
    case ADD_CART:
      newState = algo(state, payload, 'add')
      return { ...newState };

    case REMOVE_CART:
      newState = algo(state, payload, 'del')
      return { ...newState };

    case SET_CART:
      newState = algo(state, payload);
      return { ...newState };

    case UPDATE_CART:
      newState = algo(state, payload)
      return { ...newState };

    default:
      return state;
  }
}
