import classes from "./DashboardComp.module.scss";
import DashboardLinks from "./DashboardLinks/DashboardLinks";
import { Outlet } from "react-router-dom";

const DashboardComp = () => {
  return (
    <main className={classes.main}>
      <DashboardLinks />
      <Outlet />
    </main>
  );
};

export default DashboardComp;
