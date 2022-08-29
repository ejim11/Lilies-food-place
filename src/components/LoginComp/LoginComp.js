import LoginBox from "../UI/LoginBox/LoginBox";
import classes from "./LoginComp.module.scss";
import LoginForm from "./LoginForm/LoginForm";

const LoginComp = () => {
  return (
    <LoginBox className={classes["login-img"]}>
      <LoginForm />
    </LoginBox>
  );
};

export default LoginComp;
