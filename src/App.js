import "./App.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import MovieDetail from "./Pages/MovieDetail/MovieDetail";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Footer from "./Components/Footer/Footer";
import AllMovies from "./Pages/AllMovies/AllMovies";
import { TvSeries } from "./Pages/TvSeries/TvSeries";
import Search from "./Components/Search/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Search />
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/movieDetail/:imdbID/:type"
              element={<MovieDetail />}
            />
            <Route path="/AllMovies" element={<AllMovies />} />
            <Route path="/TvSeries" element={<TvSeries />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
