import { useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./SignUpForm.module.scss";
import useInput from "../../hooks/user-input";
import Button from "../../UI/Button/Button";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import {
  checkNumber,
  checkForUppercase,
  checkSpecialCharacter,
} from "../../Helper fns/inputValidators";
import { useDispatch } from "react-redux";
import { signupHandler } from "../../../store/authActions";

const VendorForm = ({ vendorState }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const [pageState, setPageState] = useState(0);
  const navigate = useNavigate();
  const dispatchFn = useDispatch();

  //   toggle password visibility
  const showPasswordHandler = () => {
    setPasswordIsVisible((prevState) => !prevState);
  };

  //change page state
  const prevHandler = () => {
    setPageState((prevState) => prevState - 1);
  };

  const nextHandler = () => {
    if (pageState === 2) {
      return;
    }
    setPageState((prevState) => prevState + 1);
  };

  // name
  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    valueHasError: enteredNameIsInValid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    resetValue: nameInputReset,
  } = useInput((val) => val.trim() !== "");

  // company name
  const {
    value: enteredCompanyName,
    valueIsValid: enteredCompanyNameIsValid,
    valueHasError: enteredCompanyNameIsInValid,
    valueInputChangeHandler: companyNameInputChangeHandler,
    valueInputBlurHandler: companyNameInputBlurHandler,
    resetValue: companyNameInputReset,
  } = useInput((val) => val.trim() !== "");

  // email
  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    valueHasError: enteredEmailIsInValid,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    resetValue: emailInputReset,
  } = useInput((val) => val.includes("@"));

  // password
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

  // confirm password
  const {
    value: enteredConfirmPassword,
    valueIsValid: enteredConfirmPasswordIsValid,
    valueHasError: enteredConfirmPasswordIsInValid,
    valueInputChangeHandler: confirmPasswordInputChangeHandler,
    valueInputBlurHandler: confirmPasswordInputBlurHandler,
    resetValue: confirmpPasswordInputReset,
  } = useInput((val) => val.trim() === enteredPassword);

  // address
  const {
    value: enteredAddress,
    valueIsValid: enteredAddressIsValid,
    valueHasError: enteredAddressIsInValid,
    valueInputChangeHandler: addressInputChangeHandler,
    valueInputBlurHandler: addressInputBlurHandler,
    resetValue: addressInputReset,
  } = useInput((val) => val.trim() !== "");

  // phone num
  const {
    value: enteredNumber,
    valueIsValid: enteredNumberIsValid,
    valueHasError: enteredNumberIsInValid,
    valueInputChangeHandler: numberInputChangeHandler,
    valueInputBlurHandler: numberInputBlurHandler,
    resetValue: numberInputReset,
  } = useInput((val) => String(val).trim() !== "" || String(val).length === 11);

  // form validation
  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredAddressIsValid &&
    enteredConfirmPasswordIsValid &&
    enteredNumberIsValid &&
    (!vendorState || enteredCompanyNameIsValid)
  ) {
    formIsValid = true;
  }

  const nameInputClasses = enteredNameIsInValid
    ? ` ${classes["name-div"]} ${classes["invalid"]}`
    : `${classes["valid"]} ${classes["name-div"]}`;

  const emailInputClasses = enteredEmailIsInValid
    ? ` ${classes["invalid"]}`
    : `${classes["valid"]}`;

  const addressInputClasses = enteredAddressIsInValid
    ? `${classes["middle-div"]} ${classes["invalid"]}`
    : ` ${classes["middle-div"]} ${classes["valid"]}`;

  const numberInputClasses = enteredNumberIsInValid
    ? ` ${classes["invalid"]}`
    : `${classes["valid"]}`;

  const companyNameInputClasses = enteredCompanyNameIsInValid
    ? ` ${classes["invalid"]}`
    : `${classes["valid"]}`;

  const confirmPasswordInputClasses = enteredConfirmPasswordIsInValid
    ? `${classes["password-div"]} ${classes["invalid"]}`
    : `${classes["password-div"]} ${classes["valid"]}`;

  const passwordInputClasses = enteredPasswordIsInValid
    ? ` ${classes["password-div"]} ${classes["invalid"]} ${classes["middle-div"]}`
    : `${classes["valid"]} ${classes["password-div"]} ${classes["middle-div"]}`;

  // get img url
  const getImgUrl = (url) => {
    setImgUrl(url);
  };

  // submit form
  const vendorSignUpFormHandler = async (e) => {
    e.preventDefault();

    console.log(imgUrl);

    // create form data
    let formdata = new FormData();
    formdata.append("name", enteredName);
    vendorState && formdata.append("company_name", enteredCompanyName);
    formdata.append("email", enteredEmail);
    formdata.append("password", enteredPassword);
    formdata.append("password_confirmation", enteredConfirmPassword);
    formdata.append("address", enteredAddress);
    formdata.append(`${vendorState ? "phone" : "mobile"}`, enteredNumber);
    formdata.append(`${vendorState ? "vendor_avatar" : "user_avatar"}`, imgUrl);

    function resetInputs(stats) {
      if (stats === 200) {
        // clear the input fields
        nameInputReset();
        companyNameInputReset();
        emailInputReset();
        PasswordInputReset();
        confirmpPasswordInputReset();
        addressInputReset();
        numberInputReset();
        setImgUrl();

        // navigate to login
        navigate("/login");
      }
    }

    // post form data to a database
    dispatchFn(signupHandler(formdata, vendorState, resetInputs));
  };

  return (
    <div className={classes["form-container"]}>
      <h3>Welcome to Lilies!</h3>
      <form onSubmit={vendorSignUpFormHandler}>
        {/* first page */}
        {pageState === 0 && (
          <div>
            {/* name */}
            <div className={nameInputClasses}>
              <input
                type="text"
                placeholder="Jimmy Grey"
                value={enteredName}
                onChange={nameInputChangeHandler}
                onBlur={nameInputBlurHandler}
                className={classes.input}
              />
              {enteredNameIsInValid && (
                <p className={classes["error-msg"]}>Enter a name</p>
              )}
            </div>
            {/* address */}
            <div className={addressInputClasses}>
              <input
                type="text"
                placeholder="14 Washington DC"
                value={enteredAddress}
                onChange={addressInputChangeHandler}
                onBlur={addressInputBlurHandler}
                className={classes.input}
              />
              {enteredAddressIsInValid && (
                <p className={classes["error-msg"]}>Enter a valid address</p>
              )}
            </div>
            {/* phone number */}
            <div className={numberInputClasses}>
              <input
                type="number"
                placeholder="0803-653-5658"
                value={enteredNumber}
                onChange={numberInputChangeHandler}
                onBlur={numberInputBlurHandler}
                className={classes.input}
              />
              {enteredNumberIsInValid && (
                <p className={classes["error-msg"]}>Enter a valid number</p>
              )}
            </div>
            {/* Next button */}
            <div className={classes["next-box"]}>
              <Button
                onClick={nextHandler}
                className={`${classes["next"]} ${classes["page-changer"]}`}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* second page */}
        {pageState === 1 && (
          <div>
            {/* email */}
            <div className={emailInputClasses}>
              <input
                type="email"
                placeholder="JimmyGrey@gmail.com"
                value={enteredEmail}
                onChange={emailInputChangeHandler}
                onBlur={emailInputBlurHandler}
                className={classes.input}
              />
              {enteredEmailIsInValid && (
                <p className={classes["error-msg"]}>Enter a valid email</p>
              )}
            </div>
            {/* password */}
            <div className={passwordInputClasses}>
              <input
                type={passwordIsVisible ? "text" : "password"}
                placeholder="Your Password"
                value={enteredPassword}
                onChange={passwordInputChangeHandler}
                onBlur={passwordInputBlurHandler}
                className={classes.input}
              />
              <p
                className={classes["show-password"]}
                onClick={showPasswordHandler}
              >
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
            {/* confirm password */}
            <div className={confirmPasswordInputClasses}>
              <input
                type={passwordIsVisible ? "text" : "password"}
                placeholder="Confirm Your Password"
                value={enteredConfirmPassword}
                onChange={confirmPasswordInputChangeHandler}
                onBlur={confirmPasswordInputBlurHandler}
                className={classes.input}
              />
              <p
                className={classes["show-password"]}
                onClick={showPasswordHandler}
              >
                {passwordIsVisible ? "hide" : "show"}
              </p>
              {enteredConfirmPasswordIsInValid && (
                <p className={classes["error-msg"]}>Password does not match</p>
              )}
            </div>
            {/* prev and next button */}
            <div className={classes["page-change-box"]}>
              <Button onClick={prevHandler} className={classes["page-changer"]}>
                Prev
              </Button>
              <Button onClick={nextHandler} className={classes["page-changer"]}>
                Next
              </Button>
            </div>
          </div>
        )}

        {/*third page  */}
        {pageState === 2 && (
          <div>
            {/* avatar */}
            <ProfilePicture onAddImgUrl={getImgUrl} />
            {/* company name */}
            {vendorState && (
              <div className={companyNameInputClasses}>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={enteredCompanyName}
                  onChange={companyNameInputChangeHandler}
                  onBlur={companyNameInputBlurHandler}
                  className={classes.input}
                />
                {enteredCompanyNameIsInValid && (
                  <p className={classes["error-msg"]}>Enter a valid name</p>
                )}
              </div>
            )}
            {/* prev and submit button */}
            <div className={classes["page-change-box"]}>
              <Button onClick={prevHandler} className={classes["page-changer"]}>
                Prev
              </Button>
              <Button
                type={"submit"}
                className={classes["form-btn"]}
                disabled={!formIsValid}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default VendorForm;
