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
  const [showSearch, setShowSearch] = useState(false);
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);

  return (
    <div className="App">
      <Router>
        <Search showSearch={showSearch} setShowSearch={setShowSearch} />
        <Header showSearch={showSearch} setShowSearch={setShowSearch} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home setTab1={setTab1} setTab2={setTab2} setTab3={setTab3} />
              }
            />
            <Route
              path="/movieDetail/:imdbID/:type"
              element={<MovieDetail setShowSearch={setShowSearch} />}
            />
            <Route
              path="/AllMovies"
              element={
                <AllMovies
                  setTab1={setTab1}
                  setTab2={setTab2}
                  setTab3={setTab3}
                />
              }
            />
            <Route
              path="/TvSeries"
              element={
                <TvSeries
                  setTab1={setTab1}
                  setTab2={setTab2}
                  setTab3={setTab3}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer
          tab1={tab1}
          tab2={tab2}
          tab3={tab3}
          setTab1={setTab1}
          setTab2={setTab2}
          setTab3={setTab3}
        />
      </Router>
    </div>
  );
}

export default App;
