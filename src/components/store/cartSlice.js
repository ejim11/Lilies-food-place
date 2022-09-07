import { createSlice } from "@reduxjs/toolkit";
import mealListData from "../DashboardComp/MealList/mealListData";

const storedData = JSON.parse(localStorage.getItem("mealsData"));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: storedData?.cart || [],
    totalAmount: 0,
    list: storedData?.data || mealListData,
    order: storedData?.order || [],
  },
  reducers: {
    // add item to cart
    addItemToCart(state, action) {
      const mealIndex = state.list.findIndex(
        (meal) => action.payload.title === meal.title
      );

      const meal = state.list[mealIndex];
      const existingItemIndex = state.cart.findIndex(
        (content) => meal.title === content.title
      );

      const existingItem = state.cart[existingItemIndex];

      if (!existingItem) {
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
        JSON.stringify({
          data: state.list,
          cart: state.cart,
          order: state.order,
        })
      );
    },
    // remove item from cart
    removeMealItem(state, action) {
      // put the quantity back in the object

      const itemIndex = state.list.findIndex(
        (item) => item.title === action.payload.title
      );
      const meal = state.list[itemIndex];

      meal.piecesAvailable = meal.piecesAvailable + action.payload.quantity;
      //   remove the item
      state.cart = state.cart.filter(
        (item) => item.title !== action.payload.title
      );

      // save state
      localStorage.setItem(
        "mealsData",
        JSON.stringify({
          data: state.list,
          cart: state.cart,
          order: state.order,
        })
      );
    },

    // add item to order
    moveCartItemsToOrder(state) {
      if (state.cart.length > 0) {
        // transfer items to order
        state.cart.forEach((item) => {
          state.order.push({
            ...item,
            status: "cooking",
            id: `${item.title.slice(2)}-${Math.trunc(Math.random() * 10000)}`,
          });
        });

        // empty cart
        state.cart = [];

        // save state
        localStorage.setItem(
          "mealsData",
          JSON.stringify({
            data: state.list,
            cart: state.cart,
            order: state.order,
          })
        );
      }
    },

    // remove item from order
    removeOrderMealItem(state, action) {
      // find item index

      //   remove the item
      state.order = state.order.filter((item) => item.id !== action.payload.id);

      // save state
      localStorage.setItem(
        "mealsData",
        JSON.stringify({
          data: state.list,
          cart: state.cart,
          order: state.order,
        })
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
