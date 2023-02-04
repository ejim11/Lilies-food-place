import { Outlet } from "react-router-dom";
import classes from "./DashboardMain.module.scss";
import DashboardSubNavigation from "../DashboardSubNavigation/DashboardSubNavigation";
import { useSelector } from "react-redux";

const DashboardMain = () => {
  const userTypeState = useSelector((state) => state.auth.userType);

  const userImg = localStorage.getItem("profileImage");
  console.log(userImg);

  const companyName = localStorage.getItem("companyName");

  const time = new Date().getHours();

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
            Good {setGreeting()},{" "}
            {userTypeState === "vendor" ? companyName : displayName}
          </p>
          <p className={classes["greeting-question"]}>
            {userTypeState === "vendor"
              ? "What delicious meal are you preparing today?"
              : "What delicious meal are you craving today?"}
          </p>
        </div>
        {userImg ? (
          <div className={classes["user-img"]}>
            <img src={userImg} alt="img" />
          </div>
        ) : (
          <div className={classes["name-sign"]}>{nameSign}</div>
        )}
      </div>
      <DashboardSubNavigation />
      <Outlet />
    </div>
  );
};

export default DashboardMain;
