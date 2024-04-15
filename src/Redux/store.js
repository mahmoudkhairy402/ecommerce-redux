import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import pruductsReducer from "./productsSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    product: pruductsReducer,
    search: searchReducer,
  },
});

export default store;
