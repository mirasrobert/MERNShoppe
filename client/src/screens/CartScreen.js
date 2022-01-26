import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
//import axios from 'axios';

const CartScreen = ({ match, location }) => {
  const productId = match.params.id;

  const qty = location.search ? parseInt(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <h1>Shopping Cart</h1>;
};

export default CartScreen;
