import Header from "../Header/Header";
import FirstSection from "./FirstSection/FirstSection";
import GetNotifiedSection from "./GetNotifiedSection/GetNotifiedSection";
import SpecialMealsSection from "./SpecialMealsSection/SpeacialMealsSection";
import classes from "./HomeComp.module.scss";
import Footer from "../Footer/Footer";

const HomeComp = () => {
  return (
    <div className={classes.container}>
      <Header />
      <main>
        <FirstSection />
        <SpecialMealsSection />
        <GetNotifiedSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomeComp;
