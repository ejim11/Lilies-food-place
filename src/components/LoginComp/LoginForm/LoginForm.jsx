import Button from "../../UI/Button/Button";
import classes from "./LoginForm.module.scss";
import { useState } from "react";
import useInput from "../../hooks/user-input";
import { Link, useNavigate } from "react-router-dom";
import {
  checkNumber,
  checkForUppercase,
  checkSpecialCharacter,
} from "../../Helper fns/inputValidators";
import { useDispatch } from "react-redux";
import { loginHandler } from "../../../store/authActions";

const LoginForm = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatchFn = useDispatch();

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
  } = useInput(
    (val) =>
      val.trim() !== "" &&
      val.trim().length >= 8 &&
      !checkSpecialCharacter(val) &&
      !checkNumber(val) &&
      !checkForUppercase(val)
  );

  const showPasswordHandler = () => {
    setPasswordIsVisible((prevState) => !prevState);
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("email", enteredEmail);
    formdata.append("password", enteredPassword);

    dispatchFn(loginHandler(formdata, resetInputs));

    function resetInputs(stats) {
      if (stats === 200) {
        // clear the input fields
        emailInputReset();
        PasswordInputReset();

        // navigate to dashboard
        navigate("/dashboard");
      }
    }
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
            <p className={classes["error-msg"]}>
              {checkSpecialCharacter(enteredPassword)
                ? "Password must contain special character"
                : checkNumber(enteredPassword)
                ? "Password must contain a number"
                : checkForUppercase(enteredPassword)
                ? "password must contain a capital letter"
                : enteredPassword.trim().length < 8
                ? "Password must contain at least 8 characters"
                : "Enter a valid password now"}
            </p>
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
      <div className={classes["home-link"]}>
        <Link to="/home">Return to Home</Link>
      </div>
    </div>
  );
};

export default LoginForm;
