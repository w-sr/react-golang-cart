import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CartItem from '../../components/CartItem';

import { checkoutCart, getCart } from '../../actions/cart';
import { getProducts } from '../../actions/product';
import './dashboard.scss';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const products = useSelector(state => state.product);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch])

  useEffect(() => {
    let total = 0
    cart.items.length > 0 && cart.items.forEach(i => {
      total += i.quantity
    })
    setTotal(total)
  }, [cart])

  const process = () => {
    dispatch(checkoutCart(cart));
  }

  if (!currentUser) {
    return <Redirect to='login' />
  }

  return (
    <div>
      <div className='cart-header pb-4'>
        <div className='cart-item'>
          <p>Your Cart</p>
          <span>{total} Items</span>
        </div>
        <div className='price-total'>
          <span>Total</span>
          <p>$ {cart.total}</p>
        </div>
      </div>

      {products.map((item, key) => {
        let selected = cart.items.find(c => c.pid === item.ID)
        return (
          <CartItem
            key={key}
            item={item}
            quantity={selected ? selected.quantity : 0}
          />
        )
      })}

      <div className='btn-area mt-3'>
        <button onClick={process}>Proceed to checkout</button>
      </div>
    </div>
  );
};

export default Cart;