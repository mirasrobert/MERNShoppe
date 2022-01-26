import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/reducerConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    //const { data } = axios.get(`/api/products/${id}`);

    //const { id, name, image, price, count_in_stock } = data.product;

    const name = 'Nike';
    const image = 'image';
    const price = 100;
    const count_in_stock = 5;

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: 1,
        name: 'Nike',
        image: 'Image',
        price: 100,
        count_in_stock: 100,
        qty,
      },
    });

    // Save the cart item to the localStorage
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    //const err = error.response.data;
    console.error(error);
  }
};
