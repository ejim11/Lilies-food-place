import { createSlice } from "@reduxjs/toolkit";
import { retrieveStoredToken } from "../components/Helper fns/calculateExpirationTime";

// retrieving the stored token and expiration time
const tokenData = retrieveStoredToken();
let storedToken;
let storedDuration;
let storedUserType;
if (tokenData) {
  storedToken = tokenData.token;
  storedDuration = tokenData.duration;
  storedUserType = tokenData.userType;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!storedToken || false,
    token: storedToken || "",
    remainingTime: storedDuration || 0,
    userType: storedUserType || "",
  },
  reducers: {
    // login handler
    loginHandler(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("expirationTime", action.payload.expirationTime);
      localStorage.setItem("userType", action.payload.userType);

      console.log("logged");
    },

    // logout handler
    logoutHandler(state, action) {
      state.token = "";
      state.isLoggedIn = false;
      emptyLocalStorage();

      if (action.payload.logoutTimer) {
        clearTimeout(action.payload.logoutTimer);
      }
    },
    // auto logout
    autoLogoutHandler(state) {
      state.token = "";
      state.isLoggedIn = false;
      emptyLocalStorage();
      console.log("logged out");
    },
  },
});

function emptyLocalStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userType");
}

export const authActions = authSlice.actions;

export default authSlice.reducer;
