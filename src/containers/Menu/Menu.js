import React, { useState, createRef } from "react";

import Search from "../../components/Search/Search";

import "./Menu.css";

function Menu({ showMenu }) {
  const [showSearch, hideSearch] = useState(createRef());

  const toggleSearch = () => {
    const searchDiv = showSearch.current;
    searchDiv.classList.toggle("toggle-search");
  };

  return (
    <div className="menu__container">
      <div className="menu__search" ref={showSearch}>
        <Search />
      </div>
      <h1>BookStore</h1>
      <div className="menu__buttons">
        <button className="search-button" onClick={toggleSearch}>
          <i className="fas fa-search"></i>
        </button>
        <button onClick={showMenu} className="menu-button">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </div>
  );
}

export default Menu;
