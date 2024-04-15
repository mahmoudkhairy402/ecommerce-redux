import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  let itemsCount = localStorage.getItem("itemsCount");
  let totalAmount = localStorage.getItem("totalAmount");

  if (cart && itemsCount && totalAmount) {
    return {
      carts: JSON.parse(cart),
      itemsCount: parseInt(itemsCount),
      totalAmount: parseFloat(totalAmount),
      isCartMessageOn: false,
    };
  } else {
    return {
      carts: [],
      itemsCount: 0,
      totalAmount: 0,
      isCartMessageOn: false,
    };
  }
};

const setOnLocalStorage = (cartData, itemsCount, totalAmount) => {
  localStorage.setItem("cart", JSON.stringify(cartData));
  localStorage.setItem("itemsCount", itemsCount.toString());
  localStorage.setItem("totalAmount", totalAmount.toString());
};

const updateCartTotals = (state) => {
  state.itemsCount = state.carts.reduce(
    (total, item) => total + item.quantity,
    0
  );
  state.totalAmount = state.carts.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
};

const initialState = fetchFromLocalStorage();
const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      const isInCart = state.carts.find((ele) => ele.id === action.payload.id);
      if (isInCart) {
        const tempCart = state.carts.map((ele) => {
          if (ele.id == action.payload.id) {
            let tempQty =
              ele.quantity + action.payload.quantity > ele.stock
                ? ele.stock
                : ele.quantity + action.payload.quantity;

            let tempTotalPrice = tempQty * action.payload.priceAfterDiscount;
            return {
              ...ele,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          } else {
            return ele;
          }
        });
        state.carts = tempCart;
      } else {
        state.carts.push(action.payload);
      }
      updateCartTotals(state);
      setOnLocalStorage(state.carts, state.itemsCount, state.totalAmount);
    },
    deleteFromCart: (state, action) => {
      state.carts = state.carts.filter((ele) => ele.id !== action.payload.id);
      updateCartTotals(state);
      setOnLocalStorage(state.carts, state.itemsCount, state.totalAmount);
    },
    clearCart: (state) => {
      state.carts = [];
      state.totalAmount = 0;
      state.itemsCount = 0;
      setOnLocalStorage([], 0, 0);
    },
  },
});

export const getCartItems = (state) => state.cart.carts;
export const getICartItemsCount = (state) => state.cart.itemsCount;
export const getICartTotalAmount = (state) => state.cart.totalAmount;

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
