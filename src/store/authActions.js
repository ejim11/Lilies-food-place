import { authActions } from "./authSlice";
import calculateExpirationTime from "../components/Helper fns/calculateExpirationTime";
import { client, user } from "../axiosconfig";

let logoutTimer;

export const signupHandler = (data, vendorState, resetInputs) => {
  return async () => {
    try {
      console.log(data);
      // send request for sign up
      const res = await client.post(
        `api/${vendorState ? "vendors" : "users"}`,
        data,
        {
          xsrfHeaderName: "X-XSRF-Token",
        }
      );

      if (res.status !== 200) {
        let errorMsg = "Authentication failed!";
        console.log(errorMsg);

        if (res?.response?.data?.message) {
          errorMsg = res.response.data.message;
          throw new Error(errorMsg);
        }
        return;
      }

      resetInputs(res.status);

      console.log(res);
    } catch (err) {
      console.log(err?.response?.data?.message);

      //   afterAuth(err.message, "error");
    }
  };
};

export const loginHandler = (data, resetInputs) => {
  return async (dispatch) => {
    console.log(data);
    try {
      // login
      const res = await client.post("api/login", data, {
        xsrfHeaderName: "X-XSRF-Token",
      });

      // get user details
      const res2 = await user.get(
        `api/${res.data.type === "vendor" ? "vendor" : "user"}/details`,
        {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
            "content-type": "application/json",
          },
        },
        data,
        {
          xsrfHeaderName: "X-XSRF-Token",
        }
      );

      console.log(res);

      console.log(res2);
      // save name in local storage to retrieve and get the name logo
      localStorage.setItem("userName", res2.data.name);

      // login expires an hour
      const expirationTime = new Date(new Date().getTime() + 3600 * 1000);

      // dispatching the login action
      dispatch(
        authActions.loginHandler({
          token: res.data.token,
          expirationTime: expirationTime.toISOString(),
          userType: res2.data.type,
          userData: res2.data,
        })
      );

      resetInputs(res.status);

      // calculating the remaining time
      const remainingTime = calculateExpirationTime(
        expirationTime.toISOString()
      );

      // setting a logout timer as soon as one logs in
      logoutTimer = setTimeout(() => {
        dispatch(authActions.autoLogoutHandler());
      }, remainingTime);
    } catch (err) {
      console.log(err);
    }
  };
};

export const userLogout = (data) => {
  return (dispatch) => {
    dispatch(authActions.logoutHandler({ logoutTimer }));
  };
};

// autologout when page is refreshed
export const autoLogout = (tokenDuration) => {
  return (dispatch) => {
    logoutTimer = setTimeout(() => {
      dispatch(authActions.autoLogoutHandler());
    }, tokenDuration);
  };
};
