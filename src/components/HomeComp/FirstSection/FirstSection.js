import googlePlayImg from "../../../assets/Google Play Badge.svg";
import appStore from "../../../assets/App Store Badge.svg";
import bonVivant from "../../../assets/bon-vivant.jpg";
import classes from "./FirstSection.module.scss";
import Card from "../../UI/Card/Card";
import PlayStoreLogos from "../../UI/PlayStoreLogos/PlayStoreLogos";

const FirstSection = () => {
  return (
    <Card className={classes["first-section"]}>
      <div className={classes["first-section-box-1"]}>
        <h1>
          Order <span>food</span> anytime, anywhere
        </h1>
        <p>
          Browse from our list of specials to place your order and have food
          delivered to you in no time. Affordable, tasty and fast!
        </p>
        <PlayStoreLogos className={classes["g-play"]} />
      </div>
      <div className={classes["first-section-box-2"]}>
        <div>
          <img src={bonVivant} alt="google play" />
        </div>
      </div>
    </Card>
  );
};

export default FirstSection;
