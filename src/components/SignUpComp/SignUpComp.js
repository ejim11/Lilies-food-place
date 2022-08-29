import LoginBox from "../UI/LoginBox/LoginBox";
import classes from "./SignUpComp.module.scss";
import SignUpForm from "./SignUpForm/SignUpForm";

const SignUpComp = () => {
  return (
    <LoginBox className={classes["sign-up-img"]}>
      <SignUpForm />
    </LoginBox>
  );
};

export default SignUpComp;
