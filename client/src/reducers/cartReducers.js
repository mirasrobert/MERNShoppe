import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/reducerConstants';

const defaultState = {
  cartItems: [],
};

export const cartReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (cart) => cart.product === payload.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems((cart) =>
            cart.product === existItem.product ? payload : cart
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }

    default:
      return state;
  }
};
