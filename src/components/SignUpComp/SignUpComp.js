import Button from "../UI/Button/Button";
import LoginBox from "../UI/LoginBox/LoginBox";
import classes from "./SignUpComp.module.scss";
import SignUpForm from "./SignUpForm/SignUpForm";
import { useState } from "react";

const SignUpComp = () => {
  const [vendorState, setVendorState] = useState(true);

  // switching states between user and vendor
  const switchSIgnUpStateHandler = () => {
    setVendorState((prevState) => !prevState);
  };

  return (
    <LoginBox className={classes["sign-up-img"]}>
      <Button
        className={classes["sign-up-switch-btn"]}
        onClick={switchSIgnUpStateHandler}
      >
        {vendorState ? "Sign Up As Vendor" : "Sign Up As User"}
      </Button>
      <SignUpForm vendorState={vendorState} />
    </LoginBox>
  );
};

export default SignUpComp;
