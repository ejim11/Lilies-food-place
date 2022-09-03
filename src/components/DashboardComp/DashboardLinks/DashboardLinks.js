import logoImg from "../../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { ImGift } from "react-icons/im";
import { HiOutlineShoppingCart } from "react-icons/hi";
import classes from "./DashboardLinks.module.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

const DashboardLinks = () => {
  const location = useLocation();
  const mealCartState = useSelector((state) => state.cart.cart);
  console.log(mealCartState);

  const locationActive = location.pathname.split("/").slice(-1)[0];

  return (
    <div className={classes.contain}>
      <div className={classes.links}>
        <h2>
          <div className={classes["logo-img"]}>
            <img src={logoImg} alt={"logo-text"} />
          </div>
          <p>Lilies</p>
        </h2>
        <div className={classes["links-box"]}>
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
                Orders <span className={classes.order}>5</span>
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
        </div>
      </div>
    </div>
  );
};

export default DashboardLinks;
