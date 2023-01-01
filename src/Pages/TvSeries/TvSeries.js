import React, { useEffect, useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import Multiselect from "multiselect-react-dropdown";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchTvSeries } from "../../Features/TvSeries/seriesSlice";

import { useSelector } from "react-redux";
import { toggleTab } from "../../Features/Footer/footerSlice";

import MovieCard from "../../Components/MovieCard/MovieCard";
import "../Home/Home.scss";
import "../TvSeries/TvSeries.scss";

export const TvSeries = () => {
  const series_list = useSelector((state) => state.tvSeries);
  console.log("Data", series_list);
  const [page, setPage] = useState(1);
  const [tv_genres, setTv_genres] = useState([]);
  const [genres_param, setGenre_param] = useState("");
  const [no_genres, setNo_genres] = useState(0);

  const Dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
    document.documentElement.style.overflow = "scroll";
    Dispatch(fetchTvSeries({ page, genres_param }));
  }, [page, genres_param]);

  useEffect(() => {
    Dispatch(toggleTab({ tab1: false, tab2: false, tab3: true }));

    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const temp = await axios.get(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=18c20ac96b0af44108b932e410b57eb0&language=en-US"
    );
    // console.log("Genres", temp.data.genres);

    setTv_genres(temp.data.genres);
  };

  function handlePageClick(event) {
    setPage(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let renderList = " ";
  if (typeof series_list.tvSeries.results !== "undefined") {
    renderList = series_list.tvSeries.results.map((item, index) => {
      return <MovieCard key={index} data={item} type="tv" />;
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
    <div className="Tvseries">
      <div className="tv_heading">
        <h2 style={{ fontFamily: "Nunito, sans-serif" }} className="thead-size">
          TV Series
        </h2>
        <div className="filter-container1">
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
            options={tv_genres}
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

      <div className="Tvseriescontainer">{renderList}</div>

      <div className="pagi_container">
        <ReactPaginate
          pageCount={series_list.tvSeries.total_pages}
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
