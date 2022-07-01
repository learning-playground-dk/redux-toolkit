import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';

// initialState
const initialState = {
  cartItems,
  amount: cartItems.length,
  total: 0,
  isLoading: true
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  // reducers for cart
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    removeItem: (state, action) => {
      const id = action.payload;
      const index = state.cartItems.findIndex(item => item.id === id); // returns index of 1st item to pass the condition
      state.cartItems.splice(index, 1); // remove 1 item from index
    },

    increaseAmount: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => item.id === payload);
      cartItem.amount += 1;
    },

    decreaseAmount: (state, { payload }) => {
      // for this eg, we passed payload as object just to show we can pass more than just id
      const index = state.cartItems.findIndex(item => item.id === payload.id);
      state.cartItems[index].amount -= 1;
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  }
})

// actions for cart
export const { clearCart, removeItem, increaseAmount, decreaseAmount, calculateTotals } = cartSlice.actions;

// reducer is present on cartSlice and used to refer the state
export default cartSlice.reducer