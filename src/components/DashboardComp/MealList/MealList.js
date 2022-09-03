import modifyNum from "../../Helper fns/modifyAmount";
import Button from "../../UI/Button/Button";
import classes from "./MealList.module.scss";
import { useNavigate } from "react-router-dom";
import mealListData from "./mealListData";

const MealList = () => {
  const navigate = useNavigate();

  const mealList = mealListData.map((meal, i) => (
    <div key={i} className={classes["meal-item"]}>
      <div className={classes["meal-img"]}>
        <img src={meal.src} alt={meal.title} />
      </div>
      <h3>{meal.title}</h3>
      <p className={classes["meal-text"]}>{meal.text}</p>
      <div className={classes["meal-amount-box"]}>
        <p>N {modifyNum(String(meal.amount))}</p>
        <Button
          type={"button"}
          className={classes["btn-add-to-cart"]}
          onClick={() => {
            navigate(`add-to-cart/${meal.title}`);
          }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  ));

  return <div className={classes["list-container"]}>{mealList}</div>;
};

export default MealList;
