import { NavLink } from "react-router-dom";
import classes from "./DashboardSubNavigation.module.scss";
import { useSelector } from "react-redux";

const DashboardSubNavigation = () => {
  const userTypeState = useSelector((state) => state.auth.userType);

  const navLinks =
    userTypeState === "vendor"
      ? [{ title: "Meals", to: "meals-list" }]
      : [
          { title: "Meals", to: "meals-list" },
          { title: "Vendors", to: "vendors-list" },
          { title: "Favourite Meals", to: "favourite-meals" },
          { title: "Favourite Vendors", to: "favourite-vendors" },
        ];
  return (
    <div className={classes["link-container"]}>
      <ul>
        {navLinks.map((item, i) => (
          <li key={i}>
            <NavLink
              to={item.to}
              className={(activeData) =>
                activeData.isActive
                  ? classes["active-link"]
                  : classes["in-active-link"]
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSubNavigation;
