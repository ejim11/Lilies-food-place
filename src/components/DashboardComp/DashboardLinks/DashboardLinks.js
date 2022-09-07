import logoImg from "../../../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { ImGift } from "react-icons/im";
import { HiOutlineShoppingCart } from "react-icons/hi";
import classes from "./DashboardLinks.module.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiX } from "react-icons/hi";
import { useState } from "react";

const DashboardLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mealCartState = useSelector((state) => state.cart.cart);
  const mealOrderState = useSelector((state) => state.cart.order);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const locationActive = location.pathname.split("/").slice(-1)[0];

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
                  navData.isActive && locationActive === "dashboard"
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
                  navData.isActive && locationActive === "profile"
                    ? classes["link-active"]
                    : classes["link-inactive"]
                }
              >
                <CgProfile className={classes.icon} />
                Your Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="order"
                className={(navData) =>
                  navData.isActive && locationActive === "order"
                    ? classes["link-active"]
                    : classes["link-inactive"]
                }
              >
                <ImGift className={classes.icon} />
                Orders{" "}
                <span className={classes.order}>{mealOrderState.length}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="cart"
                className={(navData) =>
                  navData.isActive && locationActive === "cart"
                    ? classes["link-active"]
                    : classes["link-inactive"]
                }
              >
                <HiOutlineShoppingCart className={classes.icon} />
                Your Cart
                <span className={classes.cart}>{mealCartState.length}</span>
              </NavLink>
            </li>
          </ul>
          <HiX className={classes["times-icon"]} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLinks;
