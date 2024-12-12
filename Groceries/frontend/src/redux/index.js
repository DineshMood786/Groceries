import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginAction";
import productsList from "./productActions";

export const store = configureStore({
  reducer: {
    loginReducer,
    productsList,
  },
});
