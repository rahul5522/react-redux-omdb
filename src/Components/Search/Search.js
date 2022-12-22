import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.scss";
import MovieCard from "../MovieCard/MovieCard";

const Search = ({ showSearch, setShowSearch }) => {
  const closeHandle = () => {
    document.documentElement.style.overflow = "scroll";

    setShowSearch(false);
  };

  const [list, setList] = useState();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    console.log(keyword);

    if (keyword != "") {
      const temp = await axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=18c20ac96b0af44108b932e410b57eb0&language=en-US&query=${keyword}&page=1&include_adult=false`
        )
        .catch((e) => console.log(e));

      let movie_tv = temp.data.results.filter((item) => {
        return item.media_type != "person";
      });

      console.log(movie_tv);

      setList(movie_tv);
    }

    // console.log(movie_tv);
  };

  // console.log(props);
  return (
    <>
      {showSearch ? (
        <>
          <div className="search-overlay" id="s-overlay">
            <div className="overlay-content">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "25px",
                }}
              >
                <button
                  type="button"
                  className="close-btn"
                  onClick={closeHandle}
                >
                  <i class="fa fa-close"></i>
                </button>
              </div>

              <div className="search-bar">
                <form className="search">
                  <input
                    type="search"
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    required
                    style={{ color: "white" }}
                  />

                  <button type="button" onClick={handleSearch}>
                    <i class="fa fa-search" aria-hidden="true"></i> &nbsp;Search
                  </button>
                </form>
              </div>

              {list ? (
                <>
                  <div className="list-container">
                    {list.map((item, index) => {
                      return (
                        <MovieCard
                          key={index}
                          data={item}
                          type={item.media_type}
                        />
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>{" "}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
