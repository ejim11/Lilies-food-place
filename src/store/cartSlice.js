import { createSlice } from "@reduxjs/toolkit";

const storedData = JSON.parse(localStorage.getItem("mealsData"));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: storedData?.cart || [],
    totalAmount: 0,
    allMealsList: [],
    order: storedData?.order || [],
    cartLink: "",
    addToCartId: "",
  },
  reducers: {
    // add all meals
    addAllMeals(state, action) {
      state.allMealsList = action.payload;
    },

    // add item to cart
    addItemToCart(state, action) {
      const {
        id,
        meal_avatar,
        meal_name,
        meal_price,
        quantity,
        unique_id,
        quantityChosen,
      } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (mealItem) => mealItem.unique_id === unique_id
      );

      const existingItem = state.cart[existingItemIndex];

      if (!existingItem) {
        state.cart.push({
          id: id,
          title: meal_name,
          src: meal_avatar,
          price: meal_price,
          mainQuantity: quantity,
          quantityChosen,
          unique_id,
          totalPrice: Number(meal_price) * quantityChosen,
        });
      } else {
        existingItem.quantityChosen =
          existingItem.quantityChosen + quantityChosen;
        existingItem.totalPrice =
          existingItem.totalPrice + quantityChosen * meal_price;
      }

      // meal.piecesAvailable = meal.piecesAvailable - action.payload.amount;

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

      // const itemIndex = state.allMealsList.findIndex(
      //   (item) => item.id === action.payload.id
      // );
      // const meal = state.allMealsList[itemIndex];

      // meal.piecesAvailable = meal.piecesAvailable + action.payload.quantity;
      //   remove the item
      state.cart = state.cart.filter(
        (item) => item.unique_id !== action.payload.unique_id
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
      state.order = state.order.filter(
        (item) => item.unique_id !== action.payload.unique_id
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
    changeCartLink(state, action) {
      state.cartLink = action.payload;
    },
    changeAddToCartId(state, action) {
      state.addToCartId = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
