import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./Movie/movieSlice";
import { allmoviesReducer } from "./Movie/allMoviesSlice";
import { tvSeriesReducer } from "./TvSeries/seriesSlice";
import { searchReducer } from "./Search/searchSlice";
import { footerReducer } from "./Footer/footerSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    allmovies: allmoviesReducer,
    tvSeries: tvSeriesReducer,
    search: searchReducer,
    footer: footerReducer,
  },
});
