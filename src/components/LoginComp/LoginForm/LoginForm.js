import Button from "../../UI/Button/Button";
import classes from "./LoginForm.module.scss";
import { useState } from "react";
import useInput from "../../hooks/user-input";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigate = useNavigate();

  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    valueHasError: enteredEmailIsInValid,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    resetValue: emailInputReset,
  } = useInput((val) => val.includes("@"));

  const {
    value: enteredPassword,
    valueIsValid: enteredPasswordIsValid,
    valueHasError: enteredPasswordIsInValid,
    valueInputChangeHandler: passwordInputChangeHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    resetValue: PasswordInputReset,
  } = useInput((val) => val.trim() !== "");

  const showPasswordHandler = () => {
    setPasswordIsVisible((prevState) => !prevState);
  };

  const loginSubmitHandler = (e) => {
    const userData = JSON.parse(localStorage.getItem("userDetails"));

    // check details
    if (
      enteredEmail.toLowerCase().trim() ===
        userData.email.toLowerCase().trim() &&
      enteredPassword.trim() === userData.password.trim()
    ) {
      // navigate to dashboard
      navigate("/dashboard");
    } else {
      console.log("error");
    }

    console.log(userData);

    e.preventDefault();
    emailInputReset();
    PasswordInputReset();
  };

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const emailInputClasses = enteredEmailIsInValid
    ? `${classes["email-div"]} ${classes["invalid"]}`
    : `${classes["email-div"]} ${classes["valid"]}`;

  const passwordInputClasses = enteredPasswordIsInValid
    ? ` ${classes["password-div"]} ${classes["invalid"]}`
    : `${classes["valid"]} ${classes["password-div"]}`;

  return (
    <div className={classes["form-container"]}>
      <h3>Welcome Back!</h3>
      <form onSubmit={loginSubmitHandler}>
        <div className={emailInputClasses}>
          <input
            type="email"
            placeholder="Your Email address"
            value={enteredEmail}
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
            className={classes.input}
          />
          {enteredEmailIsInValid && (
            <p className={classes["error-msg"]}>Enter a valid email</p>
          )}
        </div>

        <div className={passwordInputClasses}>
          <input
            type={passwordIsVisible ? "text" : "password"}
            placeholder="Your Password"
            value={enteredPassword}
            onChange={passwordInputChangeHandler}
            onBlur={passwordInputBlurHandler}
            className={classes.input}
          />
          <p className={classes["show-password"]} onClick={showPasswordHandler}>
            {passwordIsVisible ? "hide" : "show"}
          </p>
          {enteredPasswordIsInValid && (
            <p className={classes["error-msg"]}>Enter a valid password</p>
          )}
        </div>
        <Button
          type={"submit"}
          className={classes["form-btn"]}
          disabled={!formIsValid}
        >
          LOGIN
        </Button>
      </form>
      <div className={classes.links}>
        <Link to="/sign-up">Create an account</Link>
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
      <div className = {classes["home-link"]}>
        <Link to="/home">Return to Home</Link>
      </div>
    </div>
  );
};

export default LoginForm;
