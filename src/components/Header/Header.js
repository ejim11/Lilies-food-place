import classes from "./Header.module.scss";
import logo from "../../assets/logo.svg";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <header>
      <Card className={classes.header}>
        <div className={classes.logo}>
          <img src={logo} alt="logo" />
          <p>Lilies</p>
        </div>
        <NavLink
          to="/home"
          className={(navData) =>
            navData.isActive ? classes.active : classes.inactive
          }
        >
          Home
        </NavLink>
        {userData ? (
          <Button
            className={classes.dashboard}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Button>
        ) : (
          <Button
            className={classes.login}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}
        {!userData && (
          <Button
            className={classes["sign-up"]}
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Sign Up
          </Button>
        )}
      </Card>
    </header>
  );
};

export default Header;
