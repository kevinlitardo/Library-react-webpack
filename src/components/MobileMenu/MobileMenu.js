import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import { BookContext } from "../../contexts/BookContext";

import "./MobileMenu.css";

const modalContainer = document.getElementById("modal");

const MobileMenu = ({ hideMenu, add }) => {
  const { setClassFilter } = useContext(BookContext);

  const clearClass = () => {
    setClassFilter("");
  };

  const setClass = (e) => {
    setClassFilter(e.target.value);
    hideMenu();
  };

  const hideClear = () => {
    hideMenu();
    clearClass();
  };

  return createPortal(
    <div className="modal__container">
      <div className="modal-header">
        <h2>BookStore</h2>
        <button onClick={hideMenu} className="modal-button">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="modal-sections">
        <Link to={"/"} onClick={hideClear}>
          Books List
        </Link>
        <Link to={"/favlist"} onClick={hideClear}>
          Favorites
        </Link>
        <button onClick={add}>Add New Book</button>
      </div>
      <nav className="modal-menu">
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
    </div>,
    modalContainer
  );
};

export default MobileMenu;
