import React, { useState } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import trend from "../../Common/Assets/image/trend1.png";
import fliptrend from "../../Common/Assets/image/flip_trend.png";
import movie from "../../Common/Assets/image/movie2.png";
import flipmovie from "../../Common/Assets/image/flip_movie.png";
import series from "../../Common/Assets/image/series2.png";
import flipseries from "../../Common/Assets/image/flip_series.png";

import { useSelector } from "react-redux";

const Footer = () => {
  const tabToggle = useSelector((state) => state.footer);
  return (
    <div className="footer">
      <Link to="/">
        <button className="tab">
          {tabToggle.tab.tab1 ? (
            <>
              <img src={fliptrend} style={{ width: "20px" }} />
              <p className="footer_menu" style={{ fontWeight: "bold" }}>
                Trending
              </p>
            </>
          ) : (
            <>
              <img src={trend} style={{ width: "20px" }} />
              <p className="footer_menu">Trending</p>
            </>
          )}{" "}
        </button>
      </Link>
      <Link to="/AllMovies">
        <button className="tab">
          {tabToggle.tab.tab2 ? (
            <>
              <img src={flipmovie} style={{ width: "20px" }} />
              <p className="footer_menu" style={{ fontWeight: "bold" }}>
                Movies
              </p>
            </>
          ) : (
            <>
              <img src={movie} style={{ width: "20px" }} />
              <p className="footer_menu">Movies</p>
            </>
          )}
        </button>
      </Link>
      <Link to="/TvSeries">
        <button className="tab">
          {tabToggle.tab.tab3 ? (
            <>
              <img src={flipseries} style={{ width: "20px" }} />
              <p className="footer_menu" style={{ fontWeight: "bold" }}>
                Series
              </p>
            </>
          ) : (
            <>
              <img src={series} style={{ width: "20px" }} />
              <p className="footer_menu">Series</p>
            </>
          )}
        </button>
      </Link>
    </div>
  );
};

export default Footer;
