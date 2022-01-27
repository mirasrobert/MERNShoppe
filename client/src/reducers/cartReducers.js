import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/reducerConstants';

const defaultState = {
  cartItems: [],
};

export const cartReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // if the current iteration item is equal to existing item then return
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
