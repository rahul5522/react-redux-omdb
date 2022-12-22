import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "../MovieListing/MovieListing.scss";

export default function MovieListing() {
  const movie_list = useSelector((state) => state.movie);
  // console.log(typeof movie_list.movies.results);
  // console.log("Data", movie_list.movies.results);

  let renderList = "";

  if (typeof movie_list.movies.results !== "undefined") {
    renderList = movie_list.movies.results.map((item, index) => {
      return <MovieCard key={index} data={item} type={item.media_type} />;
    });
  }

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <div className="title_heading">
          <h2 style={{ fontFamily: "Nunito, sans-serif" }}> Trending Now</h2>
        </div>

        <div className="movie-container">{renderList}</div>
      </div>
    </div>
  );
}
