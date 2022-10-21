import classes from "./ProfilePicture.module.scss";
import profile from "../../assets/undraw_pic_profile_re_1865.svg";
import { AiOutlineCamera } from "react-icons/ai";

const ProfilePicture = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["picture-box"]}>
        <img src={profile} alt="profile" />
        <AiOutlineCamera className={classes.icon} />
      </div>
    </div>
  );
};

export default ProfilePicture;
