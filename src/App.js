import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Dashboard from "./components/Pages/Dashboard";
import DashboardMain from "./components/DashboardComp/DashboardMain/DashboardMain";
import Profile from "./components/DashboardComp/Profile/Profile";
import Order from "./components/DashboardComp/Order/Order";
import Cart from "./components/DashboardComp/Cart/Cart";
import AddToCart from "./components/DashboardComp/AddToCart/AddToCart";

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
            <Route path="order" element={<Order />} />
            <Route path="cart" element={<Cart />} />
            <Route path="add-to-cart/:mealId" element={<AddToCart />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
