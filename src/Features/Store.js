import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./Movie/movieSlice";
import { allmoviesReducer } from "./Movie/allMoviesSlice";
import { tvSeriesReducer } from "./TvSeries/seriesSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    allmovies: allmoviesReducer,
    tvSeries: tvSeriesReducer,
  },
});
