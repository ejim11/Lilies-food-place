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
    userData: {},
  },
  reducers: {
    // login handler
    loginHandler(state, action) {
      const { token, expirationTime, userType, userData } = action.payload;

      state.token = token;
      state.isLoggedIn = !!token;
      state.userType = userType;
      state.userData = userData;
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);
      localStorage.setItem("userType", userType);
      localStorage.setItem(
        "companyName",
        `${userType === "vendor" ? userData.company_name : ""}`
      );
      localStorage.setItem(
        "profileImage",
        userData[
          `${userData.type === "vendor" ? "vendor_avatar" : "user_avatar"}`
        ]
      );

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
