import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  categoryProducts: [],
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    return data;
  }
);

//! fetch products depend on category
export const fetchProductsCategory = createAsyncThunk(
  "category/fetchProductsCategory",
  async (category) => {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await res.json();
    return data;
  }
);
//!

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchProductsCategory.fulfilled, (state, action) => {
      state.categoryProducts = action.payload;
    });
  },
});

export const getAllCategories = (state) => state.category.categories;
export const getSpecificCategories = (state) => state.category.categoryProducts;

export default categorySlice.reducer;
