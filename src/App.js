import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Dashboard from "./components/Pages/Dashboard";
import DashboardMain from "./components/DashboardComp/DashboardMain/DashboardMain";
import ProfilePage from "./components/Pages/ProfilePage";
import AddToCartPage from "./components/Pages/AddToCartPage";
import CartPage from "./components/Pages/CartPage";
import OrderPage from "./components/Pages/OrderPage";
import CheckoutPage from "./components/Pages/CheckoutPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<DashboardMain />}>
            <Route path="order" element={<OrderPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="add-to-cart/:mealId" element={<AddToCartPage />} />
            <Route path="/dashboard/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
