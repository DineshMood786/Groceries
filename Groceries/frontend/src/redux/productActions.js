import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: {},
  cartItems: [],
};

const productData = createSlice({
  name: "newProducts",
  initialState,
  reducers: {
    getProductsList: (state, action) => {
      state.productsList = [...action.payload];
    },
    cartItems: (state, action) => {
      const total = action.payload.price;
      state.cartItems = [
        ...state.cartItems,
        { ...action.payload, qty: 1, total: total },
      ];
    },
    removeItems: (state, action) => {
      console.log(action.payload);
      console.log("Remove cart items");
    },
  },
});

export const { getProductsList, cartItems, removeItems } = productData.actions;

export default productData.reducer;
