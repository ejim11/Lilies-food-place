import modifyNum from "../../Helper fns/modifyAmount";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import Button from "../Button/Button";
import classes from "./MealItem.module.scss";
import { useSelector } from "react-redux";
import { BsFillHeartFill } from "react-icons/bs";
import { useState } from "react";

const MealItem = ({ meal }) => {
  const dispatchFn = useDispatch();

  const [favourite, setFavourite] = useState(false);

  const userTypeState = useSelector((state) => state.auth.userType);

  const toggleFavourite = () => {
    setFavourite(prevState => !prevState)
  }

  return (
    <li className={classes["meal-item"]}>
      <BsFillHeartFill  className={`${favourite ? classes["favourite-true"]: classes["favourite-false"]} ${classes["favourite-icon"]}`} onClick = {toggleFavourite}/>
      <div className={classes["meal-img"]}>
        <img src={`${meal.meal_avatar}`} alt={meal.meal_name} />
      </div>
      <h3>{meal.meal_name}</h3>
      <p className={classes["meal-text"]}>{meal.meal_details}</p>
      <div className={classes["meal-amount-box"]}>
        <p>N {modifyNum(String(meal.meal_price))}</p>
        {userTypeState !== "vendor" && (
          <Button
            type={"button"}
            className={classes["btn-add-to-cart"]}
            onClick={() => {
              dispatchFn(cartActions.changeAddToCartId(meal.unique_id));
            }}
          >
            Add to cart
          </Button>
        )}
        {userTypeState === "vendor" && (
          <Button type={"button"} className={classes["btn-add-to-cart"]}>
            Update meal
          </Button>
        )}
      </div>
    </li>
  );
};

export default MealItem;
