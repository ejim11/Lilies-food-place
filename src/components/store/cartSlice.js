import { createSlice } from "@reduxjs/toolkit";
import mealListData from "../DashboardComp/MealList/mealListData";

const storedData = JSON.parse(localStorage.getItem("mealsData"));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: storedData?.cart || [],
    totalAmount: 0,
    list: storedData?.data || mealListData,
  },
  reducers: {
    addItemToCart(state, action) {
      const mealIndex = state.list.findIndex(
        (meal) => action.payload.id === meal.id
      );

      const meal = state.list[mealIndex];
      const existingItemIndex = state.cart.findIndex(
        (content) => meal.id === content.id
      );

      const existingItem = state.cart[existingItemIndex];

      if (!existingItem) {
        console.log("later");

        state.cart.push({
          id: meal.id,
          title: meal.title,
          src: meal.src,
          price: meal.amount,
          quantity: action.payload.amount,
          totalPrice: Number(meal.amount) * action.payload.amount,
        });
      } else {
        existingItem.quantity = existingItem.quantity + action.payload.amount;
        existingItem.totalPrice =
          existingItem.totalPrice + action.payload.amount * meal.amount;
      }

      meal.piecesAvailable = meal.piecesAvailable - action.payload.amount;

      localStorage.setItem(
        "mealsData",
        JSON.stringify({ data: state.list, cart: state.cart })
      );
    },

    removeMealItem(state, action) {
      // put the quantity back in the object
      console.log(state);

      const itemIndex = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      const meal = state.list[itemIndex];

      meal.piecesAvailable = meal.piecesAvailable + action.payload.quantity;
      //   remove the item
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);

      // save state
      localStorage.setItem(
        "mealsData",
        JSON.stringify({ data: state.list, cart: state.cart })
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
