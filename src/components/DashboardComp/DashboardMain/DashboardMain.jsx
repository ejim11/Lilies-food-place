import { Outlet } from "react-router-dom";
import classes from "./DashboardMain.module.scss";
import { useSelector } from "react-redux";
import DashboardSubNavigation from "../DashboardSubNavigation/DashboardSubNavigation";
import Cart from "../Cart/Cart";
import Order from "../Order/Order";
import AddToCart from "../AddToCart/AddToCart";

const DashboardMain = () => {
  const time = new Date().getHours();
  const cartLinkState = useSelector((state) => state.cart.cartLink);

  const addToCartId = useSelector((state) => state.cart.addToCartId);

  let nameSign;
  let displayName;
  const name = localStorage.getItem("userName");
  if (name.includes(" ")) {
    displayName = name.split(" ")[0];
    nameSign = name
      .split(" ")
      .map((item) => item[0])
      .join("")
      .toUpperCase();
  } else {
    displayName = name;
    nameSign = name.slice(0, 1).toUpperCase() + name.slice(-1).toUpperCase();
  }

  console.log(displayName, nameSign);

  const setGreeting = () => {
    const greeting =
      time < 12 ? "morning" : time < 16 ? "afternoon" : "evening";

    return greeting;
  };

  return (
    <div className={classes.container}>
      <div className={classes["intro-box"]}>
        <div className={classes["greeting-box"]}>
          <p className={classes.greeting}>
            Good {setGreeting()}, {displayName}!
          </p>
          <p className={classes["greeting-question"]}>
            What delicious meal are you craving today?
          </p>
        </div>
        <div className={classes["name-sign"]}>{nameSign}</div>
      </div>
      <DashboardSubNavigation />
      <Outlet />
      {cartLinkState === "cart" && <Cart />}
      {cartLinkState === "order" && <Order />}
      {addToCartId && <AddToCart />}
    </div>
  );
};

export default DashboardMain;
