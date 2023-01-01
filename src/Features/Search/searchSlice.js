import React from "react";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchOverlay: { showSearch: false },
};

const searchSlice = createSlice({
  name: "showSearch",
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.searchOverlay.showSearch = action.payload;
    },
  },
});

export const searchReducer = searchSlice.reducer;
export const { toggle } = searchSlice.actions;
