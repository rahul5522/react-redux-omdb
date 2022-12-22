import React from "react";
import { Link } from "react-router-dom";
import "../MovieCard/MovieCard.scss";

export default function MovieCard(props) {
  const { data, type } = props;

  return (
    <Link to={`/movieDetail/${data.id}/${type}`}>
      <div className="card-item">
        <div className="card-inner">
          <div className="card-top">
            <img
              src={`https://www.themoviedb.org/t/p/w500/${data.poster_path}`}
              alt={data.original_title}
            />
          </div>
          <div className="card-bottom">
            <div className="card-info">
              <span className="card-title">
                <p style={{ fontSize: "12px" }}>{data.title || data.name}</p>
              </span>

              <div className="sub-info-flex">
                {data.media_type === "tv" ? (
                  <>
                    <div
                      style={{
                        padding: "1px 2px",
                        border: "1px solid white",
                        borderRadius: "3px",
                        fontSize: "10px",
                      }}
                    >
                      <p>TV</p>
                    </div>
                    <p>&#x2022;</p>
                  </>
                ) : (
                  <></>
                )}
                {data.release_date !== "" ? (
                  <>
                    <p>
                      {data.release_date
                        ? data.release_date.substring(0, 4)
                        : data.last_air_date
                        ? data.last_air_date.substring(0, 4)
                        : data.first_air_date.substring(0, 4)}
                    </p>
                  </>
                ) : (
                  <></>
                )}

                <div
                  style={{
                    width: "100%",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <i
                    className="fas fa-star mr-1"
                    aria-hidden="true"
                    style={{ marginRight: "4px" }}
                  ></i>
                  <p>{Math.round(data.vote_average * 100) / 100}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
