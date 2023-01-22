import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import vendorsListReducer from "./vendorsListSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    vendorsList: vendorsListReducer,
  },
});

export default store;
