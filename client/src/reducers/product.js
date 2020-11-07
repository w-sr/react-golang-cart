import {
  SET_PRODUCT
} from '../actions/types';

const initialState = [];

export default function product(state = initialState, action) {
  const { type, payload } = action;
  let newState = [];

  switch (type) {
    case SET_PRODUCT:
      newState = payload.data
      return newState;

    default:
      return state;
  }
}
