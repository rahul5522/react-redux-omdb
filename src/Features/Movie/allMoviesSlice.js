import { createSlice } from "@reduxjs/toolkit";
import { allmoviesApi } from "../../Common/Api/api";
import { key } from "../../Common/Api/apiKey";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allmovies: {},
};

export const fetchallMovies = createAsyncThunk(
  "allmovies/fetchallMovies",
  async (data) => {
    const { page, genres_param } = data;
    const response = await allmoviesApi
      .get(
        `/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genres_param}`
      )
      .catch((err) => console.log(err));

    return response.data;
  }
);

const allmoviesSlice = createSlice({
  name: "allmovies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchallMovies.pending, () => {
      console.log("Pending1");
    });
    builder.addCase(fetchallMovies.fulfilled, (state, action) => {
      console.log("Fetched1");
      state.allmovies = action.payload;
    });
    builder.addCase(fetchallMovies.rejected, () => {
      console.log("Rejected1");
    });
  },
});

export const allmoviesReducer = allmoviesSlice.reducer;
export const allmoviesActions = allmoviesSlice.actions;
