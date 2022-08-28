import pastaImg from "../../../../assets/home-pasta.jpg";
import meatBallImg from "../../../../assets/home-meat-balls.jpg";
import burger from "../../../../assets/home-burger.jpg";
import classes from "./SpecialMealsList.module.scss";

const specialMealsData = [
  {
    src: pastaImg,
    name: "Stir fry Pasta",
    text: "Stir fry pasta yada yada yada because of Sesan",
  },
  {
    src: meatBallImg,
    name: "Meat Balls",
    text: "Stir fry pasta yada yada yada because of Sesan",
  },
  {
    src: burger,
    name: "Burger Meal",
    text: "Stir fry pasta yada yada yada because of Sesan",
  },
];

const SpecialMealsList = () => {
  const mealsList = specialMealsData.map((meal, i) => (
    <div key={i} className={classes["meal-item"]}>
      <img src={meal.src} alt={meal.name} />
      <h3>{meal.name}</h3>
      <p>{meal.text}</p>
    </div>
  ));

  return <div className={classes.list}>{mealsList}</div>;
};

export default SpecialMealsList;
