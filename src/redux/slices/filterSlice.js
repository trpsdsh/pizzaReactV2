import { createSlice } from '@reduxjs/toolkit';

import { act } from 'react';
const initialState = {
  categoryId: 0,
  sort: {
    name: 'Популярности ↓',
    sortProperty: 'rating',
    order: 'desc',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;
export default filterSlice.reducer;
