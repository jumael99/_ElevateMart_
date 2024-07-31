// frontend/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import apiSlice from "./slices/api/apiSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice"; 
import ordersReducer from "./slices/ordersSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cart: cartReducer, 
    [apiSlice.reducerPath]: apiSlice.reducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
