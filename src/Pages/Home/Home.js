import React, { useEffect, useState, useRef } from "react";
import MovieListing from "../../Components/MovieListing/MovieListing";
import "./Home.scss";
import ReactPaginate from "react-paginate";

import { useDispatch } from "react-redux";

import { fetchMovies } from "../../Features/Movie/movieSlice";

import { toggleTab } from "../../Features/Footer/footerSlice";

export default function Home() {
  const [page, setPage] = useState(1);

  const Dispatch = useDispatch();

  function handlePageClick(event) {
    setPage(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    Dispatch(toggleTab({ tab1: true, tab2: false, tab3: false }));
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
    document.documentElement.style.overflow = "scroll";
    Dispatch(fetchMovies({ page }));
  }, [page]);
  return (
    <div>
      <div className="image-banner"></div>
      <MovieListing />
      <div className="pagi_container">
        <ReactPaginate
          pageCount="50"
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
}
