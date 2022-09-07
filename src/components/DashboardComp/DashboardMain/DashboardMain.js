import { Outlet } from "react-router-dom";
import MealList from "../MealList/MealList";
import classes from "./DashboardMain.module.scss";

const DashboardMain = () => {
  const time = new Date().getHours();

  const userName = JSON.parse(localStorage.getItem("userDetails")).name.split(
    " "
  )[0];

  const nameSign = JSON.parse(localStorage.getItem("userDetails"))
    .name.split(" ")
    .map((item) => item[0])
    .join("");

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
            Good {setGreeting()}, {userName}!
          </p>
          <p className={classes["greeting-question"]}>
            What delicious meal are you craving today?
          </p>
        </div>
        <div className={classes["name-sign"]}>{nameSign}</div>
      </div>
      <>
        <MealList />
      </>
      <Outlet />
    </div>
  );
};

export default DashboardMain;
