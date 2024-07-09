import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReduser from "./features/user/cart/cartSlice";

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    cart: cartReduser,
  },
});
