import useInput from "../../hooks/user-input";
import { Link, useNavigate } from "react-router-dom";
import classes from "./SignUpForm.module.scss";
import { useState } from "react";
import Button from "../../UI/Button/Button";

const SignUpForm = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigate = useNavigate();

  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    valueHasError: enteredNameIsInValid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    resetValue: nameInputReset,
  } = useInput((val) => val.trim() !== "");

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
    e.preventDefault();

    // store data
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      })
    );

    // clear fields
    emailInputReset();
    PasswordInputReset();
    nameInputReset();

    // navigate to login
    navigate.push("/login");
  };

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const nameInputClasses = enteredNameIsInValid
    ? ` ${classes["name-div"]} ${classes["invalid"]}`
    : `${classes["valid"]} ${classes["name-div"]}`;

  const emailInputClasses = enteredEmailIsInValid
    ? ` ${classes["invalid"]}`
    : `${classes["valid"]}`;

  const passwordInputClasses = enteredPasswordIsInValid
    ? ` ${classes["password-div"]} ${classes["invalid"]}`
    : `${classes["valid"]} ${classes["password-div"]}`;

  return (
    <div className={classes["form-container"]}>
      <h3>Welcome to Lilies!</h3>
      <form onSubmit={loginSubmitHandler}>
        <div className={nameInputClasses}>
          <input
            type="text"
            placeholder="Your Full Name"
            value={enteredName}
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
            className={classes.input}
          />
          {enteredNameIsInValid && (
            <p className={classes["error-msg"]}>Enter a name</p>
          )}
        </div>
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
          SIGN UP
        </Button>
      </form>
      <div className={classes.links}>
        <p>
          Already have an account?<Link to="/login">LOGIN</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
