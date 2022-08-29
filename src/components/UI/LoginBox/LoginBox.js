import classes from "./LoginBox.module.scss";

const LoginBox = (props) => {
  return (
    <div className={classes.container}>
      <div className={`${classes["img-box"]} ${props.className}`}></div>
      <div className={classes["form-box"]}>{props.children}</div>
    </div>
  );
};

export default LoginBox;
