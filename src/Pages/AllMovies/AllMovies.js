import React, { useEffect, useState, useRef } from "react";
import ReactPaginate from "react-paginate";

import { useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";

import { fetchallMovies } from "../../Features/Movie/allMoviesSlice";

import { useSelector } from "react-redux";
import MovieCard from "../../Components/MovieCard/MovieCard";
import "../Home/Home.scss";
import "./AllMovies.scss";
import axios from "axios";

const AllMovies = ({ setTab1, setTab2, setTab3 }) => {
  const allmovies_list = useSelector((state) => state.allmovies);
  const [movie_genres, setMovie_genres] = useState([]);
  const [genres_param, setGenre_param] = useState("");
  const [no_genres, setNo_genres] = useState(0);
  //   console.log("Data", allmovies_list);
  const [page, setPage] = useState(1);

  const Dispatch = useDispatch();

  // const options = [
  //   { label: "Thing 1", value: 1 },
  //   { label: "Thing 2", value: 2 },
  // ];
  // const defaultOption = options[0];

  useEffect(() => {
    window.scroll(0, 0);
    document.documentElement.style.overflow = "scroll";
    Dispatch(fetchallMovies({ page, genres_param }));
  }, [page, genres_param]);

  useEffect(() => {
    setTab2(true);
    setTab1(false);
    setTab3(false);
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const temp = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=18c20ac96b0af44108b932e410b57eb0&language=en-US"
    );
    // console.log("Genres", temp.data.genres);

    setMovie_genres(temp.data.genres);
  };

  function handlePageClick(event) {
    setPage(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let renderList = " ";
  if (typeof allmovies_list.allmovies.results !== "undefined") {
    renderList = allmovies_list.allmovies.results.map((item, index) => {
      return <MovieCard key={index} data={item} type="movie" />;
    });
  }

  const addGenres = (selectedList) => {
    setPage(1);
    setNo_genres(selectedList.length);

    const genre_id = selectedList.map((item) => {
      return item.id;
    });

    setGenre_param(genre_id.reduce((acc, curr) => acc + "," + curr));
  };

  const removeGenre = (selectedList) => {
    setPage(1);
    setNo_genres(selectedList.length);

    if (selectedList.length === 0) {
      setGenre_param("");
    } else {
      const genre_id = selectedList.map((item) => {
        return item.id;
      });

      setGenre_param(genre_id.reduce((acc, curr) => acc + "," + curr));
    }
  };

  return (
    <div className="all-moviecontainer">
      <div className="heading">
        <h2 style={{ fontFamily: "Nunito, sans-serif" }} className="head-size">
          Movies
        </h2>
        <div className="filter-container">
          <Multiselect
            displayValue="name"
            id="drop_down"
            showArrow="true"
            hideSelectedList
            placeholder={no_genres === 0 ? "All" : `${no_genres} Selected`}
            avoidHighlightFirstOption="true"
            onKeyPressFn={function noRefCheck() {}}
            onRemove={(selectedList) => removeGenre(selectedList)}
            onSearch={function noRefCheck() {}}
            onSelect={(selectedList) => addGenres(selectedList)}
            options={movie_genres}
            showCheckbox
            style={{
              multiselectContainer: {
                color: "black",
                background: "white",
                borderRadius: "10px",
              },

              searchBox: {
                border: "1px solid transparent",
                borderRadius: "10px",
                width: "150px",
              },
            }}
          />
        </div>
      </div>

      <div className="movie-container">{renderList}</div>
      <div className="pagi_container">
        <ReactPaginate
          pageCount={allmovies_list.allmovies.total_pages}
          containerClassName="pagination"
          previousLabel="<"
          nextLabel=">"
          pageClassName="page-item"
          previousClassName="navi-item"
          nextClassName="navi-item"
          activeClassName="active"
          breakClassName="break-item"
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          pageLinkClassName="page-link"
        ></ReactPaginate>
      </div>
    </div>
  );
};

export default AllMovies;
