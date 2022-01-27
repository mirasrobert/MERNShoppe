import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/reducerConstants';

const defaultState = {
  cartItems: [],
};

export const cartReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (x) => x.product === payload.product
      );

      if (existItem) {
        // if the current iteration item is equal to existing item then return
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? payload : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product != payload),
      };

    default:
      return state;
  }
};
