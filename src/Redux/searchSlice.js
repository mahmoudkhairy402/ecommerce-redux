import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  searchProducts: [],
};

//! fetch products depend search Query
export const fetchSearchProducts = createAsyncThunk(
  "search/fetchSearchProducts",
  async (searchQuery) => {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchQuery}`
    );
    const data = await res.json();
    console.log("🚀 ~ data:", data);
    return data;
  }
);

//!

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchProducts.fulfilled, (state, action) => {
      state.searchProducts = action.payload;
    });
  },
});

export const getSearchProducts = (state) => state.search.searchProducts;

export default searchSlice.reducer;
