import { createSlice } from "@reduxjs/toolkit";

const vendorsListSlice = createSlice({
  name: "vendorsList",
  initialState: {
    list: [],
  },
  reducers: {
    setVendorsList(state, action) {
      state.list = action.payload;
    },
  },
});

export const vendorsListActions = vendorsListSlice.actions;

export default vendorsListSlice.reducer;
