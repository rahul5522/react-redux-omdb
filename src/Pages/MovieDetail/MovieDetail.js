import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetail.scss";
import calendar from "../../Common/Assets/image/calender.png";
import clock from "../../Common/Assets/image/clock.png";
import rating from "../../Common/Assets/image/rating.png";
import thumb from "../../Common/Assets/image/thumb.png";
import CreditCarousel from "../../Components/CreditCarousel/CreditCarousel";

export default function MovieDetail({ setShowSearch }) {
  const { imdbID, type } = useParams();
  const [data, setData] = useState();
  const [video, setVideo] = useState();

  const img = "https://www.themoviedb.org/t/p/w500/";
  console.log(imdbID, type);

  const getData = async () => {
    const fetched = await axios
      .get(
        `https://api.themoviedb.org/3/${type}/${imdbID}?api_key=18c20ac96b0af44108b932e410b57eb0&language=en-US`
      )
      .catch((err) => console.log(err));

    setData(fetched);
    console.log("tm", fetched);
  };

  const getVideo = async () => {
    const temp = await axios
      .get(
        `https://api.themoviedb.org/3/${type}/${imdbID}/videos?api_key=18c20ac96b0af44108b932e410b57eb0&language=en-US`
      )
      .catch((err) => console.log(err));

    console.log(temp);

    let t_key = temp.data.results.filter((item) => {
      return item.name.includes("Trailer");
    });

    // console.log(t_key);

    setVideo(t_key ? t_key[0].key : temp.data.results[0].key);
  };

  useEffect(() => {
    document.documentElement.style.overflow = "scroll";
    setShowSearch(false);
    getData();
    getVideo();
  }, [imdbID]);

  function toHour(t_data) {
    let t = t_data / 60;
    t = Math.round(t * 100) / 100;
    let s_t = "" + t;
    let ans =
      s_t.substring(0, s_t.indexOf(".")) +
      "h " +
      s_t.substring(s_t.indexOf(".") + 1) +
      "m";

    return ans;
  }

  return (
    <div className="item-detail">
      {data ? (
        <>
          <div className="poster">
            <img
              className="poster_img"
              src={`${img}${data.data.poster_path}`}
              alt={data.data.title || data.data.name}
            />

            <img
              className="landscape-img"
              src={`${img}${data.data.backdrop_path}`}
              alt={data.data.title || data.data.name}
            />
          </div>

          <div className="info">
            <div className="title">
              <h1>{data.data.title || data.data.name}</h1>
            </div>

            <div className="sub-info">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  style={{ width: "21px", height: "21px", marginRight: "10px" }}
                  src={calendar}
                ></img>
                <p>
                  {data.data.release_date
                    ? data.data.release_date.substring(0, 4)
                    : data.data.last_air_date
                    ? data.data.last_air_date.substring(0, 4)
                    : data.data.first_air_date.substring(0, 4)}
                </p>
              </div>

              <div>|</div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                {data.data.runtime ? (
                  <>
                    <img
                      style={{
                        width: "21px",
                        height: "21px",
                        marginRight: "10px",
                      }}
                      src={clock}
                    ></img>
                    <p>{toHour(data.data.runtime)}</p>
                  </>
                ) : (
                  <>
                    <div className="episode-info">
                      <p style={{ display: "flex", flexDirection: "row" }}>
                        No. Seasons : {data.data.number_of_seasons}{" "}
                        <div style={{ margin: "0px 5px" }}>|</div> No. Episodes
                        : {data.data.number_of_episodes}
                      </p>
                    </div>

                    <div className="extraInfo">
                      <p>
                        {data.data.languages
                          ? data.data.languages[0]
                            ? data.data.languages[0].toUpperCase()
                            : data.data.original_language
                          : data.data.original_language}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div>|</div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  style={{ width: "21px", height: "21px", marginRight: "10px" }}
                  src={rating}
                ></img>

                <p>{Math.round(data.data.vote_average * 100) / 100}</p>
              </div>

              <div>|</div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  style={{ width: "21px", height: "21px", marginRight: "10px" }}
                  src={thumb}
                ></img>
                <p>{data.data.vote_count}</p>
              </div>
            </div>

            <div className="overview">
              <p style={{ textAlign: "justify" }}>
                Summary : {data.data.overview ? data.data.overview : "NA"}
              </p>
            </div>

            <CreditCarousel id={imdbID} type={type} />

            <div className="watch-button">
              <button
                className="button-40"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    `https://www.youtube.com/watch?v=${video}`,
                    "_blank"
                  );
                }}
              >
                {" "}
                Watch Trailer
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
