import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BookContext } from "../../contexts/BookContext";

import "./DesktopMenu.css";

const DesktopMenu = ({ hideMenu, add }) => {
  const { setClassFilter } = useContext(BookContext);

  const clearClass = () => {
    setClassFilter("");
  };

  const setClass = (e) => {
    setClassFilter(e.target.value);
  };

  return (
    <div className="modal__desktop-container">
      <div className="modal-desktop-sections">
        <Link to={"/"} onClick={(hideMenu, clearClass)}>
          Books List
        </Link>
        <Link to={"/favlist"} onClick={(hideMenu, clearClass)}>
          Favorites
        </Link>
        <button onClick={add}>Add New Book</button>
      </div>
      <nav className="modal-desktop-menu">
        <button onClick={setClass} value="cyberpunk">
          Cyberpunk
        </button>
        <button onClick={setClass} value="Fantasy">
          Fantasy
        </button>
        <button onClick={setClass} value="Drama">
          Drama
        </button>
        <button onClick={setClass} value="Horror">
          Horror
        </button>
      </nav>
    </div>
  );
};

export default DesktopMenu;
