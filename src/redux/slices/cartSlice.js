import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};
const totalPriceItems = (items) => items.reduce((sum, obj) => sum + obj.price * obj.count, 0);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = totalPriceItems(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = totalPriceItems(state.items);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = totalPriceItems(state.items);
    },
    onClickDecrease(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = totalPriceItems(state.items);
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItem = (id) => (state) => state.cart.items.find((obj) => obj.id === id);
export const { addItem, removeItem, clearItem, onClickDecrease } = cartSlice.actions;
export default cartSlice.reducer;
