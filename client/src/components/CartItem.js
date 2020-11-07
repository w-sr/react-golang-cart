import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import NumericInput from "react-numeric-input";

import { updateCart } from "../actions/cart";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(props.quantity)
  }, [props])
  console.log('props', props)
  const onClick = () => {
    // dispatch(addCart('string'));
  }

  const handleChange = (value) => {
    if (value === 0 && quantity === 0) {
      return;
    }

    let item = props.item;
    item.quantity = value

    setQuantity(value)
    dispatch(updateCart(item))
  }

  return (
    <div className="cart-item py-3">
      <div className="image">
        <img
          src={props.item.url}
          style={{ width: '100%', height: '100%' }}
          alt={props.item.name}
        />
      </div>

      <div className="content ml-3">
        <div className="row name-line">
          <div className="col-4 name">
            <p>{props.item.name}</p>
            <span>Brand</span>
          </div>

          <div className="col-4 quantity">
            <span className="mr-3">Quantity</span>
            <NumericInput min={0} size={2} value={quantity} onChange={handleChange} />
          </div>

          <div className="col-4 price text-right">$ {props.item.price}</div>
        </div>

        <div className="description-line pt-2">
          <div className="description">{props.item.description}</div>
          <button onClick={onClick}></button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;