import React, { useContext, useState, useEffect } from "react";

import { BookContext } from "../../contexts/BookContext";
import { FavsContext } from "../../contexts/FavsContext";

import "./BookItem.css";
import Swal from "sweetalert2";

import starsPic from "../../images/star.png";

function BookItem({ image, title, rating, classification, id, favorite }) {
  const { onRemove, onUpdateRating, onUpdateFavorite } = useContext(
    BookContext
  );
  const { addFav, removeFav, onUpdateFavRating } = useContext(FavsContext);
  const [itemRating, setItemRating] = useState("");
  const [stars, setStars] = useState([]);
  const [actionsRef] = useState(React.createRef());
  const [ratingRef] = useState(React.createRef());

  const successfullyAdded = () => {
    Swal.fire({
      position: "bottom-start",
      icon: "success",
      text: "Successfully added to favorites",
      showConfirmButton: false,
      timer: 2000,
      background: "#1a1a1a",
      backdrop: false,
      heightAuto: true,
      width: "300px",
    });
  };

  const successfullyRemoved = () => {
    Swal.fire({
      position: "bottom-start",
      icon: "error",
      text: "Successfully removed from favorites",
      showConfirmButton: false,
      timer: 2000,
      background: "#1a1a1a",
      backdrop: false,
      heightAuto: true,
      width: "300px",
    });
  };

  useEffect(() => {
    setItemRating(rating);
    setStars(Array(rating).fill(1));
  }, [rating]);

  const updateRating = (e) => {
    const rating = parseInt(e.target.value);
    setItemRating(rating);
    const book = { title, image, rating, classification, id, favorite };
    onUpdateRating(book);
    onUpdateFavRating(book);
  };

  const addFavorites = () => {
    addFav(title, image, rating, classification, id);
    onUpdateFavorite(title, image, rating, classification, id, !favorite);
    successfullyAdded();
    onToggle();
  };

  const removeFavorites = () => {
    removeFav(id);
    onUpdateFavorite(title, image, rating, classification, id, !favorite);
    successfullyRemoved();
    onToggle();
  };

  const onToggle = () => {
    const actionsDiv = actionsRef.current;
    const ratingDiv = ratingRef.current;
    actionsDiv.classList.toggle("show");
    ratingDiv.classList.toggle("hide");
  };

  return (
    <div className="item">
      <button className="toggle" onClick={onToggle}>
        Options
        <i className="fas fa-angle-down"></i>
      </button>
      <div className="image">
        <img src={`./images/${image}`} width="100%" alt={title} />
      </div>
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="rating" ref={ratingRef}>
        <span>Rating:</span>
        <p>
          {stars.map((_x, index) => (
            <img src={starsPic} alt="star" width="20px" key={index} />
          ))}
        </p>
        <span>Rate:</span>
        <select value={itemRating} onChange={updateRating}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <span className="classification">{classification}</span>
      </div>
      <div className="actions" ref={actionsRef}>
        <button onClick={() => onRemove(id)} className="delete">
          Eliminar
        </button>

        {!favorite && (
          <button onClick={addFavorites} className="favs">
            Añadir a favoritos
          </button>
        )}
        {favorite && (
          <button onClick={removeFavorites} className="favs">
            Quitar de favoritos
          </button>
        )}
      </div>
    </div>
  );
}

export default BookItem;
