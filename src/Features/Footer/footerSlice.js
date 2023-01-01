import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: {
    tab1: true,
    tab2: false,
    tab3: false,
  },
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    toggleTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { toggleTab } = footerSlice.actions;
export const footerReducer = footerSlice.reducer;
