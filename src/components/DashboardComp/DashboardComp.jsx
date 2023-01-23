import classes from "./DashboardComp.module.scss";
import DashboardLinks from "./DashboardLinks/DashboardLinks";
import { Outlet } from "react-router-dom";
import Cart from "./Cart/Cart";
import Order from "./Order/Order";
import AddToCart from "./AddToCart/AddToCart";
import { useSelector } from "react-redux";

const DashboardComp = () => {
  const cartLinkState = useSelector((state) => state.cart.cartLink);

  const addToCartId = useSelector((state) => state.cart.addToCartId);

  return (
    <main className={classes.main}>
      <DashboardLinks />
      <Outlet />
      {cartLinkState === "cart" && <Cart />}
      {cartLinkState === "order" && <Order />}
      {addToCartId && <AddToCart />}
    </main>
  );
};

export default DashboardComp;
