import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://course-api.com/react-useReducer-cart-project';

// initialState
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

// `createAsyncThunk` always returns a Promise.
export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  // give an action type and a function that returns a promise
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: 'cart',
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
      const index = state.cartItems.findIndex((item) => item.id === id); // returns index of 1st item to pass the condition
      state.cartItems.splice(index, 1); // remove 1 item from index
    },

    increaseAmount: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount += 1;
    },

    decreaseAmount: (state, { payload }) => {
      // for this eg, we passed payload as object just to show we can pass more than just id
      const index = state.cartItems.findIndex((item) => item.id === payload.id);
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
  },

  // extra reducers for cart (for async thunk)
  extraReducers: {
    // for every func we create, we get access to 3 life-cycle: (pending, fulfilled, rejected)
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      // action has the data returned by `.then` in `getCartItems`
      state.cartItems = action.payload;
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// actions for cart
export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  calculateTotals,
} = cartSlice.actions;

// reducer is present on cartSlice and used to refer the state
export default cartSlice.reducer;
