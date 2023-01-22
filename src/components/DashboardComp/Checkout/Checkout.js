import Modal from "../../UI/Modal/Modal";
import useInput from "../../hooks/user-input";
import Button from "../../UI/Button/Button";
import classes from "./Checkout.module.scss";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatchFn = useDispatch();
  const navigate = useNavigate();

  const paymentHandler = () => {
    dispatchFn(cartActions.moveCartItemsToOrder());
    navigate("/dashboard");
  };

  const {
    value: cardNumber,
    valueIsValid: cardNumberIsValid,
    valueHasError: cardNumberIsInValid,
    valueInputChangeHandler: cardNumberInputChangeHandler,
    valueInputBlurHandler: cardNumberInputBlurHandler,
    resetValue: cardNumberInputReset,
  } = useInput((val) => String(val).trim() !== "");

  const {
    value: expDate,
    valueIsValid: expDateIsValid,
    valueHasError: expDateIsInValid,
    valueInputChangeHandler: expDateInputChangeHandler,
    valueInputBlurHandler: expDateInputBlurHandler,
    resetValue: expDateInputReset,
  } = useInput((val) => String(val).trim() !== "");

  const {
    value: cvv,
    valueIsValid: cvvIsValid,
    valueHasError: cvvIsInValid,
    valueInputChangeHandler: cvvInputChangeHandler,
    valueInputBlurHandler: cvvInputBlurHandler,
    resetValue: cvvInputReset,
  } = useInput((val) => String(val).trim() !== "");

  const {
    value: pin,
    valueIsValid: pinIsValid,
    valueHasError: pinIsInValid,
    valueInputChangeHandler: pinInputChangeHandler,
    valueInputBlurHandler: pinInputBlurHandler,
    resetValue: pinInputReset,
  } = useInput((val) => String(val).trim() !== "");

  let formIsValid = false;

  if (cardNumberIsValid && expDateIsValid && cvvIsValid && pinIsValid) {
    formIsValid = true;
  }

  const checkoutSubmitHandler = (e) => {
    e.preventDefault();
    cardNumberInputReset();
    expDateInputReset();
    cvvInputReset();
    pinInputReset();
  };

  const cardNumberInputClasses = cardNumberIsInValid
    ? `${classes["cover-div"]} ${classes["invalid"]}`
    : `${classes["cover-div"]} ${classes["valid"]}`;

  const expDateInputClasses = expDateIsInValid
    ? `${classes["cover-div"]} ${classes["invalid"]}`
    : `${classes["cover-div"]} ${classes["valid"]}`;

  const cvvInputClasses = cvvIsInValid
    ? `${classes["cover-div"]} ${classes["invalid"]}`
    : `${classes["cover-div"]} ${classes["valid"]}`;

  const pinInputClasses = pinIsInValid
    ? `${classes["cover-div"]} ${classes["invalid"]}`
    : `${classes["cover-div"]} ${classes["valid"]}`;

  return (
    <Modal childClassName={classes["checkout"]}>
      <p className={classes["checkout-heading"]}>Checkout</p>
      <form onSubmit={checkoutSubmitHandler}>
        <div className={cardNumberInputClasses}>
          <input
            type="number"
            placeholder="Card Number"
            value={cardNumber}
            onChange={cardNumberInputChangeHandler}
            onBlur={cardNumberInputBlurHandler}
            className={classes.input}
          />
          {cardNumberIsInValid && (
            <p className={classes["error-msg"]}>Enter a valid number</p>
          )}
        </div>
        <div className={expDateInputClasses}>
          <input
            type="number"
            placeholder="Exp Date"
            value={expDate}
            onChange={expDateInputChangeHandler}
            onBlur={expDateInputBlurHandler}
            className={classes.input}
          />
          {expDateIsInValid && (
            <p className={classes["error-msg"]}>Enter a valid date</p>
          )}
        </div>
        <div className={cvvInputClasses}>
          <input
            type="number"
            placeholder="CVV/CVV2"
            value={cvv}
            onChange={cvvInputChangeHandler}
            onBlur={cvvInputBlurHandler}
            className={classes.input}
          />
          {cvvIsInValid && (
            <p className={classes["error-msg"]}>Enter a valid cvv</p>
          )}
        </div>
        <div className={pinInputClasses}>
          <input
            type="number"
            placeholder="Card Pin"
            value={pin}
            onChange={pinInputChangeHandler}
            onBlur={pinInputBlurHandler}
            className={classes.input}
          />
          {pinIsInValid && (
            <p className={classes["error-msg"]}>Enter a valid pin</p>
          )}
        </div>
        <Button
          type={"submit"}
          className={classes["form-btn"]}
          disabled={!formIsValid}
          onClick={paymentHandler}
        >
          Make Payment
        </Button>
      </form>
    </Modal>
  );
};

export default Checkout;
