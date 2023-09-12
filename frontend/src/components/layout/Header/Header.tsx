import React from "react";

import { Link } from "react-router-dom";
import HeaderUser from "../../elements/HeaderUser/HeaderUser";
import Searchbar from "../../elements/SearchBar/Searchbar";

import "./Header.css";

function Header() {
  return (
    <header className="header-full">
      <div className="header-content">
        <h2>
          <Link to="/">logo</Link>
        </h2>
        <Searchbar />
        <HeaderUser />
      </div>
    </header>
  );
}

export default Header;
