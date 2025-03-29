import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { act } from 'react';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasById', async (params) => {
  const { category, search, currentPage, sortType } = params;
  const { data } = await axios.get(
    `https://67c4cd16c4649b9551b490e4.mockapi.io/items?page=${currentPage}&limit=16&${category}&${search}&sortBy=${sortType.sortProperty}&order=${sortType.order}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
      console.log(state, action, 'rejected');
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
