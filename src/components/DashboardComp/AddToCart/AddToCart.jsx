import { useSelector, useDispatch } from "react-redux/es/exports";
import classes from "./AddToCart.module.scss";
import modifyNum from "../../Helper fns/modifyAmount";
import Button from "../../UI/Button/Button";
import { useState } from "react";
import { cartActions } from "../../../store/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

const AddToCart = () => {
  const [mealAmount, setMealAmount] = useState(1);
  const dispatchFn = useDispatch();
  const allMeals = useSelector((state) => state.cart.allMealsList);
  const addToCartId = useSelector((state) => state.cart.addToCartId);

  const cartItem = allMeals.find((meal) => meal.unique_id === addToCartId);

  console.log(cartItem);

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
    dispatchFn(
      cartActions.addItemToCart({
        ...cartItem,
        quantityChosen: mealAmount,
      })
    );
    dispatchFn(cartActions.changeAddToCartId(""));
  };

  const closeModal = (e) => {
    if (e.target.dataset.close) {
      dispatchFn(cartActions.changeAddToCartId(""));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={"modal"}
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 500, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className={classes.modal}
        onClick={closeModal}
        data-close={"close"}
      >
        <div className={classes["child-box"]}>
          <Button
            type="button"
            className={classes["back-btn"]}
            data-close={"close"}
            onClick={() => {
              dispatchFn(cartActions.changeAddToCartId(""));
            }}
          >
            Back
          </Button>
          <div className={classes["img"]}>
            <img src={cartItem.meal_avatar} alt={cartItem.meal_name} />
          </div>
          <div className={classes["text"]}>
            <h3>{cartItem.meal_name}</h3>
            <p>{cartItem.meal_details}</p>
          </div>
          <div className={classes["price-box"]}>
            <p>NGN {modifyNum(String(cartItem.meal_price))}</p>
            <p>{cartItem.time}</p>
            <p>{cartItem.quantity} Pcs Avail</p>
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddToCart;
