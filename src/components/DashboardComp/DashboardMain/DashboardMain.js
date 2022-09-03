import { Outlet } from "react-router-dom";
import profileImg from "../../../assets/profile-img.jpg";
import MealList from "../MealList/MealList";
import classes from "./DashboardMain.module.scss";

const DashboardMain = () => {
  const time = new Date().getHours();
  console.log(time);

  const setGreeting = () => {
    const greeting =
      time < 12 ? "morning" : time < 16 ? "afternoon" : "evening";

    return greeting;
  };

  return (
    <div className={classes.container}>
      <div className={classes["intro-box"]}>
        <div className={classes["greeting-box"]}>
          <p className={classes.greeting}>Good {setGreeting()}, Ejim!</p>
          <p className={classes["greeting-question"]}>
            What delicious meal are you craving today?
          </p>
        </div>
        <div className={classes["profile-img"]}>
          <img src={profileImg} alt="profile-img" />
        </div>
      </div>
      <>
        <MealList />
      </>
      <Outlet />
    </div>
  );
};

export default DashboardMain;
