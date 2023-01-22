import modifyNum from "../../Helper fns/modifyAmount";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import Button from "../Button/Button";
import classes from "./MealItem.module.scss";

const MealItem = ({ meal }) => {
  const dispatchFn = useDispatch();
  console.log(meal);

  return (
    <li className={classes["meal-item"]}>
      <div className={classes["meal-img"]}>
        <img src={meal.meal_avatar} alt={meal.meal_name} />
      </div>
      <h3>{meal.meal_name}</h3>
      <p className={classes["meal-text"]}>{meal.meal_details}</p>
      <div className={classes["meal-amount-box"]}>
        <p>N {modifyNum(String(meal.meal_price))}</p>
        <Button
          type={"button"}
          className={classes["btn-add-to-cart"]}
          onClick={() => {
            dispatchFn(cartActions.changeAddToCartId(meal.unique_id));
          }}
        >
          Add to cart
        </Button>
      </div>
    </li>
  );
};

export default MealItem;
