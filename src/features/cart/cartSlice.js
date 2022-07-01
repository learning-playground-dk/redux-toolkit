import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';

// initialState
const initialState = {
  cartItems,
  amount: 0,
  total: 0,
  isLoading: true
};


const cartSlice = createSlice({
  name: "cart",
  initialState
})

// console.log(cartSlice);

// reducer is present on cartSlice and handles the state
export default cartSlice.reducer