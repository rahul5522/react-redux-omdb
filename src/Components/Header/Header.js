import React, { useState } from "react";
import { Link } from "react-router-dom";
import h_logo from "../../Common/Assets/image/m_logo3.png";
import "./Header.scss";

export default function Header({ showSearch, setShowSearch }) {
  const openSearch = () => {
    document.documentElement.style.overflow = "hidden";
    // document.body.scroll = "no";
    setShowSearch(true);
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">
          <img src={h_logo} alt="logo" style={{ width: "40px" }} />
          <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: "800px" }}>
            MDB
          </p>
        </div>
      </Link>

      <div className="search-open">
        <button onClick={openSearch} className="btn-search">
          <i class="fa fa-search" aria-hidden="true"></i>
          <p>Search</p>
        </button>
      </div>
    </div>
  );
}
