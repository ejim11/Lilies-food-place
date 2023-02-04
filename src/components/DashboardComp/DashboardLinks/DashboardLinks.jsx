import logoImg from "../../../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { ImGift } from "react-icons/im";
import { HiOutlineShoppingCart } from "react-icons/hi";
import classes from "./DashboardLinks.module.scss";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { cartActions } from "../../../store/cartSlice";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiX } from "react-icons/hi";
import { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

const DashboardLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mealCartState = useSelector((state) => state.cart.cart);
  const mealOrderState = useSelector((state) => state.cart.order);
  const userTypeState = useSelector((state) => state.auth.userType);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const locationActive = location.pathname.split("/").slice(-1)[0];

  const cartLink = useSelector((state) => state.cart.cartLink);
  const dispatchFn = useDispatch();

  const toggleMenuHandler = () => {
    setMenuIsVisible((prevState) => !prevState);
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  return (
    <div className={classes.contain}>
      <div className={classes.links}>
        <div className={classes["logo-box"]}>
          <h2 onClick={navigateToHome}>
            <div className={classes["logo-img"]}>
              <img src={logoImg} alt={"logo-text"} />
            </div>
            <p>Lilies</p>
          </h2>
          {!menuIsVisible && (
            <HiOutlineMenuAlt3
              onClick={toggleMenuHandler}
              className={classes["menu-logo"]}
            />
          )}
        </div>
        <div
          onClick={toggleMenuHandler}
          className={`${classes["links-box"]} ${
            menuIsVisible ? classes.visible : classes.invisible
          }`}
        >
          <ul>
            <li>
              <NavLink
                to=""
                className={(navData) =>
                  navData.isActive && !locationActive.includes("profile")
                    ? classes["link-active"]
                    : classes["link-inactive"]
                }
              >
                <AiFillHome className={classes.icon} />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="profile"
                className={(navData) =>
                  navData.isActive && locationActive.includes("profile")
                    ? classes["link-active"]
                    : classes["link-inactive"]
                }
              >
                <CgProfile className={classes.icon} />
                Your Profile
              </NavLink>
            </li>
            {userTypeState === "user" && (
              <li
                className={`${classes["cart-link"]} ${
                  cartLink === "order" && classes["cart-link-active"]
                }`}
                onClick={() => {
                  dispatchFn(cartActions.changeCartLink("order"));
                }}
              >
                <ImGift className={classes.icon} />
                Orders{" "}
                <span className={classes.order}>{mealOrderState.length}</span>
              </li>
            )}
            {userTypeState === "user" && (
              <li
                className={`${classes["cart-link"]} ${
                  cartLink === "cart" && classes["cart-link-active"]
                }`}
                onClick={() => {
                  dispatchFn(cartActions.changeCartLink("cart"));
                }}
              >
                <HiOutlineShoppingCart className={classes.icon} />
                Your Cart
                <span className={classes.cart}>{mealCartState.length}</span>
              </li>
            )}

            <button className={classes["logout-btn"]}>
              <RiLogoutBoxLine className={classes["logout-icon"]} /> Logout
            </button>
          </ul>
          <HiX className={classes["times-icon"]} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLinks;
