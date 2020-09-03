import React, { useContext, useState, useEffect } from "react";

import { BookContext } from "../../contexts/BookContext";
import { FavsContext } from "../../contexts/FavsContext";

import "./FavBookItem.css";
import Swal from "sweetalert2";

function BookItem({ image, title, rating, classification, id, favorite }) {
  const { onUpdateFavorite } = useContext(BookContext);
  const { removeFav } = useContext(FavsContext);
  const [itemRating, setItemRating] = useState("");
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setItemRating(rating);
    setStars(Array(rating).fill(1));
  }, [rating]);

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

  const removeFavorite = () => {
    removeFav(id);
    onUpdateFavorite(title, image, rating, classification, id, favorite);
    successfullyRemoved();
  };

  return (
    <div className="fav-item">
      <div className="fav-image">
        <img src={`images/${image}`} width="100%" alt={title} />
      </div>
      <div className="fav-title">
        <span>{title}</span>
      </div>
      <div className="fav-rating">
        <span>Rating:</span>
        <p>
          {stars.map((_x, index) => (
            <img src={"images/star.png"} alt="star" width="20px" key={index} />
          ))}
        </p>
        <span className="fav-classification">{classification}</span>
      </div>
      <div className="fav-actions">
        <button onClick={removeFavorite} className="fav-delete">
          Quitar de Favoritos
        </button>
      </div>
    </div>
  );
}

export default BookItem;
