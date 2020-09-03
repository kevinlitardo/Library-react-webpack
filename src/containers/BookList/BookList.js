import React, { useContext } from "react";

import { BookContext } from "../../contexts/BookContext";
import BookItem from "../../components/BookItem/BookItem";

import "./BookList.css";

function BookList() {
  const { filteredBooks } = useContext(BookContext);

  return (
    <section className="book__container">
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <BookItem
            title={book.title}
            image={book.image}
            rating={book.rating}
            classification={book.classification}
            id={book.id}
            key={book.id}
            favorite={book.favorite}
          />
        ))
      ) : (
        <h3>There's no books in the list right now.</h3>
      )}
    </section>
  );
}

export default BookList;
