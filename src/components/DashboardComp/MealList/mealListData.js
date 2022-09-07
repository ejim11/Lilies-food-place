import burgerImg from "../../../assets/meal-burger.jpg";
import pastaImg from "../../../assets/meal-pasta.jpg";
import meatballsImg from "../../../assets/meal-meat-balls.jpg";
import saladImg from "../../../assets/meal-salad.jpg";
import breadFruitImg from "../../../assets/meal-bread-fruit.jpg";
import soupImg from "../../../assets/meal-soup.jpg";

const mealListData = [
  {
    // id: `bg-${Math.trunc(Math.random() * 10000)}`,
    src: burgerImg,
    title: "Burger",
    text: "The in-house pasta and chicken by chef Moose",
    amount: "4300",
    otherText: `Just have a single bite of this Black Forest pastry and it will all make a proper sense to you. The kick of cherry and rich chocolate of this super light, airy pastry will definitely make you feel "wow". The perfect combination of cherry cream and rich chocolate can provide the ultimate fulfillment to your dessert craving.`,
    time: "10-20 Mins",
    piecesAvailable: 28,
  },
  {
    // id: `pt-${Math.trunc(Math.random() * 10000)}`,
    src: pastaImg,
    title: "Pasta",
    text: "The in-house pasta and chicken by chef Moose",
    amount: "3300",
    otherText: `Just have a single bite of this Black Forest pastry and it will all make a proper sense to you. The kick of cherry and rich chocolate of this super light, airy pastry will definitely make you feel "wow". The perfect combination of cherry cream and rich chocolate can provide the ultimate fulfillment to your dessert craving.`,
    time: "30-45 Mins",
    piecesAvailable: 9,
  },
  {
    // id: `mb-${Math.trunc(Math.random() * 10000)}`,
    src: meatballsImg,
    title: "Meat Balls",
    text: "The in-house pasta and chicken by chef Moose",
    amount: "3500",
    otherText: `Just have a single bite of this Black Forest pastry and it will all make a proper sense to you. The kick of cherry and rich chocolate of this super light, airy pastry will definitely make you feel "wow". The perfect combination of cherry cream and rich chocolate can provide the ultimate fulfillment to your dessert craving.`,
    time: "30-60 Mins",
    piecesAvailable: 37,
  },
  {
    // id: `sl-${Math.trunc(Math.random() * 10000)}`,
    src: saladImg,
    title: "Salad",
    text: "The in-house pasta and chicken by chef Moose",
    amount: "2000",
    otherText: `Just have a single bite of this Black Forest pastry and it will all make a proper sense to you. The kick of cherry and rich chocolate of this super light, airy pastry will definitely make you feel "wow". The perfect combination of cherry cream and rich chocolate can provide the ultimate fulfillment to your dessert craving.`,
    time: "5-15 Mins",
    piecesAvailable: 14,
  },
  {
    // id: `bf-${Math.trunc(Math.random() * 10000)}`,
    src: breadFruitImg,
    title: "Blueberry Toasts and smoothie",
    text: "The in-house pasta and chicken by chef Moose",
    amount: "2400",
    otherText: `Just have a single bite of this Black Forest pastry and it will all make a proper sense to you. The kick of cherry and rich chocolate of this super light, airy pastry will definitely make you feel "wow". The perfect combination of cherry cream and rich chocolate can provide the ultimate fulfillment to your dessert craving.`,
    time: "60-120 Mins",
    piecesAvailable: 34,
  },
  {
    // id: `sp-${Math.trunc(Math.random() * 10000)}`,
    src: soupImg,
    title: "Soup",
    text: "The in-house pasta and chicken by chef Moose",
    amount: "4000",
    otherText: `Just have a single bite of this Black Forest pastry and it will all make a proper sense to you. The kick of cherry and rich chocolate of this super light, airy pastry will definitely make you feel "wow". The perfect combination of cherry cream and rich chocolate can provide the ultimate fulfillment to your dessert craving.`,
    time: "30-45 Mins",
    piecesAvailable: 40,
  },
];

export default mealListData;
