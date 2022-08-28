import Card from "../../UI/Card/Card";
import SpecialMealsList from "./SpecialMealsList/SpecialMealsList";
import classes from "./SpecialMealsSection.module.scss";

const SpecialMealsSection = () => {
  return (
    <Card className={classes["special-meals"]}>
      <h2>Special Meals of the day!</h2>
      <p className={classes.text}>
        Check our sepecials of the day and get discounts on all our meals and
        swift delivery to what ever location within Ilorin.
      </p>
      <>
        <SpecialMealsList />
      </>
    </Card>
  );
};

export default SpecialMealsSection;
