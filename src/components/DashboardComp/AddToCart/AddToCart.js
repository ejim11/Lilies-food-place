import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Modal from "../../UI/Modal/Modal";
import classes from "./AddToCart.module.scss";
import modifyNum from "../../Helper fns/modifyAmount";
import Button from "../../UI/Button/Button";
import { useState } from "react";
import { cartActions } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const navigate = useNavigate();
  const [mealAmount, setMealAmount] = useState(1);
  const params = useParams();
  const dispatchFn = useDispatch();
  const mealListState = useSelector((state) => state.cart.list);
  const cartItem = mealListState.find((item) => item.title === params.mealId);

  const increaseMealAmount = () => {
    if (cartItem.piecesAvailable === 1) {
      return;
    }
    setMealAmount((prevAmount) => prevAmount + 1);
  };

  const decreaseMealAmount = () => {
    if (mealAmount === 1) {
      return;
    }
    setMealAmount((prevAmount) => prevAmount - 1);
  };

  const addToCartHandler = () => {
    setMealAmount(1);
    dispatchFn(
      cartActions.addItemToCart({
        title: cartItem.title,
        amount: mealAmount,
      })
    );
    navigate("/dashboard");
  };

  return (
    <Modal childClassName={classes["child-box"]}>
      <div className={classes["img"]}>
        <img src={cartItem.src} alt={cartItem.title} />
      </div>
      <div className={classes["text"]}>
        <h3>{cartItem.title}</h3>
        <p>{cartItem.otherText}</p>
      </div>
      <div className={classes["price-box"]}>
        <p>NGN {modifyNum(String(cartItem.amount))}</p>
        <p>{cartItem.time}</p>
        <p>{cartItem.piecesAvailable} Pcs Avail</p>
      </div>
      <div className={classes["amount-box"]}>
        <div>
          <Button
            className={classes["operation-btn"]}
            onClick={decreaseMealAmount}
          >
            -
          </Button>
          <p>{mealAmount}</p>
          <Button
            className={classes["operation-btn"]}
            onClick={increaseMealAmount}
          >
            +
          </Button>
        </div>
        <Button
          type={"button"}
          onClick={addToCartHandler}
          className={classes["add-to-cart-btn"]}
        >
          Add to cart
        </Button>
      </div>
    </Modal>
  );
};

export default AddToCart;
