import React, { useContext } from "react";

import { FavsContext } from "../../contexts/FavsContext";
import FavBookItem from "../../components/FavBookItem/FavBookItem";

function FavBooksList() {
  const { filteredFavs } = useContext(FavsContext);
  return (
    <section className="book__container">
      {filteredFavs.length > 0 ? (
        filteredFavs.map((book) => (
          <FavBookItem
            title={book.title}
            image={book.image}
            rating={book.rating}
            classification={book.classification}
            id={book.id}
            key={book.id}
          />
        ))
      ) : (
        <>
          <h3>
            You dont have favorites books right now.
            <br />
            <br />
            Check our sections and choose the best for you!
          </h3>
        </>
      )}
    </section>
  );
}

export default FavBooksList;
