import classes from "./ProfilePicture.module.scss";
import profile from "../../assets/undraw_pic_profile_re_1865.svg";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";

const ProfilePicture = () => {
  const [file, setFile] = useState(profile);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className={classes["container"]}>
      <label className={classes["picture-box"]} htmlFor={"profile-img"}>
        <img src={file} alt="profile" />
        <FaCamera className={classes.icon} />
      </label>
      <input
        className={classes["profile-img-input"]}
        type="file"
        onChange={handleChange}
        id={"profile-img"}
        accept="image/*"
      />
    </div>
  );
};

export default ProfilePicture;
