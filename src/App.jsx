import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import DashboardMain from "./components/DashboardComp/DashboardMain/DashboardMain";
import ProfilePage from "./Pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { autoLogout } from "./store/authActions";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import UserVendorList from "./Pages/UserVendorList";
import UserMealsList from "./Pages/UserMealsList";
import FavouriteMeals from "./Pages/FavouriteMeals";
import FavouriteVendors from "./Pages/FavouriteVendors";
import VendorDetails from "./Pages/VendorDetails";

function App() {
  const dispatchFn = useDispatch();
  const remainingTime = useSelector((state) => state.auth.remainingTime);
  const authCtxLoggedInState = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (remainingTime) {
      dispatchFn(autoLogout(remainingTime));
    }
  }, [dispatchFn, remainingTime]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <ProtectedRoutes> */}
        {authCtxLoggedInState && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<DashboardMain />}>
              <Route path="" element={<Navigate to={"meals-list"} />} />
              <Route path="meals-list" element={<UserMealsList />} />
              <Route path="vendors-list" element={<UserVendorList />} />
              <Route
                path="vendors-list/:vendorId"
                element={<VendorDetails />}
              />
              <Route path="favourite-meals" element={<FavouriteMeals />} />
              <Route path="favourite-vendors" element={<FavouriteVendors />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        )}
        {/* </ProtectedRoutes> */}
        {/* <Route path="*" element={<Navigate to={"/home"} />} /> */}
      </Routes>
    </>
  );
}

export default App;
