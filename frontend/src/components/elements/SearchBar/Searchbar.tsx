import React from "react";

import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <input type="text" placeholder="Buscar" />
      <button>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};

export default Searchbar;
