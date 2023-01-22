import { useState } from "react";
import Button from "../UI/Button/Button";
import LoginBox from "../UI/LoginBox/LoginBox";
import classes from "./SignUpComp.module.scss";
import SignUpForm from "./SignUpForm/SignUpForm";

const SignUpComp = () => {
  const [vendorState, setVendorState] = useState(false);

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
        {vendorState ? "Sign Up As User" : "Sign Up As Vendor"}
      </Button>
      {/* <SignUpForm vendorState={vendorState} /> */}
      <SignUpForm vendorState={vendorState} />
    </LoginBox>
  );
};

export default SignUpComp;
