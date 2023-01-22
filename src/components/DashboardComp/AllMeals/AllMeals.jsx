import { useEffect, useCallback } from "react";
import { client } from "../../../axiosconfig";
import classes from "./AllMeals.module.scss";
import { cartActions } from "../../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import GridBox from "../../UI/GridBoxAndItem/GridBox";
import MealItem from "../../UI/GridBoxAndItem/MealItem";

const AllMeals = () => {
  // dispatch function
  const dispatchFn = useDispatch();

  // all meals state
  const allMealsList = useSelector((state) => state.cart.allMealsList);

  const getAllMeals = useCallback(async () => {
    try {
      const res = await client.get("api/all_meals");

      dispatchFn(cartActions.addAllMeals(res.data));

      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatchFn]);

  useEffect(() => {
    getAllMeals();
  }, [getAllMeals]);

  const mealsList = allMealsList.map((meal, i) => (
    <MealItem key={i} meal={meal} />
  ));

  return <GridBox className={classes["list-container"]}>{mealsList}</GridBox>;
};

export default AllMeals;
