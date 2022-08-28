import googlePlayImg from "../../../assets/Google Play Badge.svg";
import appStore from "../../../assets/App Store Badge.svg";
import classes from "./PlayStoreLogos.module.scss";

const PlayStoreLogos = (props) => {
  return (
    <div className = {`${classes.container} ${props.className}`}>
      <a href="https://play.google.com/store">
        <img
          src={googlePlayImg}
          alt="google play"
        />
      </a>
      <a href="https://www.apple.com/store">
        <img src={appStore} alt="app store" />
      </a>
    </div>
  );
};

export default PlayStoreLogos;
