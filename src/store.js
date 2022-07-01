import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"
import modalReducer from "./features/modal/modalSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer, // cartReducer is used to refer the cart's state
    modal: modalReducer // modalReducer is used to refer the modal's state
  },
});
