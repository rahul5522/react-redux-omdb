import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./CreditCarousel.scss";
import noImage from "../../Common/Assets/image/noimage2.png";

const CreditCarousel = ({ id, type }) => {
  const [credits, setCredits] = useState([]);
  const img = "https://www.themoviedb.org/t/p/w300/";

  const items = credits.map((item) => {
    return (
      <div className="cast-container">
        <div className="img-container">
          <img
            style={{
              width: "100%",

              display: "block",
            }}
            src={item.profile_path ? `${img}${item.profile_path}` : noImage}
          />
        </div>

        <p style={{ textAlign: "center" }}>{item.name}</p>
      </div>
    );
  });

  const fetchCredits = async () => {
    const { data } = await axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=18c20ac96b0af44108b932e410b57eb0&language=en-US`
      )
      .catch((err) => console.log(err));

    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, [id]);

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default CreditCarousel;
