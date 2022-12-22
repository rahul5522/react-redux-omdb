import { createSlice } from "@reduxjs/toolkit";
import { tvSeriesApi } from "../../Common/Api/api";
import { key } from "../../Common/Api/apiKey";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tvSeries: {},
};

export const fetchTvSeries = createAsyncThunk(
  "tvSeries/fetchTvSeries",
  async (data) => {
    const { page, genres_param } = data;
    const response = await tvSeriesApi
      .get(
        `/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genres_param}`
      )
      .catch((err) => console.log(err));

    return response.data;
  }
);

const seriesSlice = createSlice({
  name: "tvSeries",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTvSeries.pending, () => {
      console.log("Pending2");
    });
    builder.addCase(fetchTvSeries.fulfilled, (state, action) => {
      console.log("Fetched2");
      state.tvSeries = action.payload;
    });
    builder.addCase(fetchTvSeries.rejected, () => {
      console.log("Rejected2");
    });
  },
});

export const tvSeriesReducer = seriesSlice.reducer;
export const tvSeriesActions = seriesSlice.actions;
