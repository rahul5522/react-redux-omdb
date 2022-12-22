import axios from "axios";

export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/trending",
});

export const allmoviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/discover",
});

export const tvSeriesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/discover",
});
