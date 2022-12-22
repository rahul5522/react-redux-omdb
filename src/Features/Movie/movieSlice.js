import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { moviesApi } from "../../Common/Api/api";
import { key } from "../../Common/Api/apiKey";

const initialState = {
  movies: {},
};

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (data) => {
    const { page } = data;
    const response = await moviesApi
      .get(`/all/day?api_key=${key}&page=${page}`)
      .catch((err) => console.log(err));

    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, () => {
      console.log("Pending");
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      console.log("Fetched");
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, () => {
      console.log("Rejected");
    });
  },
});

export const movieReducer = movieSlice.reducer;
export const movieActions = movieSlice.actions;
