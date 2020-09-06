import React, { useState, createContext, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

export const BookContext = createContext();

export const BookProvider = (props) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [classFilter, setClassFilter] = useState("");

  useEffect(() => {
    setBooks([
      {
        title: "New Horizon",
        image: "s1.jpg",
        rating: 4,
        classification: "Cyberpunk",
        id: uuidv4(),
        favorite: false,
      },
      {
        title: "Titans Fury",
        image: "s2.jpg ",
        rating: 3,
        classification: "Horror",
        id: uuidv4(),
        favorite: false,
      },
      {
        title: "Abandoned Souls",
        image: "s3.jpg",
        rating: 5,
        classification: " Fantasy",
        id: uuidv4(),
        favorite: false,
      },
      {
        title: "Losing the Empire",
        image: "s4.jpg",
        rating: 4,
        classification: "Cyberpunk",
        id: uuidv4(),
        favorite: false,
      },
      {
        title: "In the candle image",
        image: "s5.jpg ",
        rating: 5,
        classification: "Drama",
        id: uuidv4(),
        favorite: false,
      },
      {
        title: "The Ia",
        image: "s6.jpg",
        rating: 3,
        classification: "Horror",
        id: uuidv4(),
        favorite: false,
      },
    ]);
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    console.log(books);
  }, [keyword, books]);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.classification.toLowerCase().includes(classFilter.toLowerCase())
      )
    );
  }, [books, classFilter]);

  const onAdd = (title, image, rating, classification) => {
    const error = () => {
      setBooks([...books]);
    };
    books.map((book) =>
      book.title.toLowerCase() !== title.toLowerCase()
        ? setBooks([
            ...books,
            {
              title,
              image,
              rating,
              classification,
              id: uuidv4(),
              favorite: false,
            },
          ])
        : error()
    );
  };

  const onRemove = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const onUpdateRating = ({
    title,
    image,
    rating,
    classification,
    id,
    favorite,
  }) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { title, image, rating, classification, id, favorite }
          : book
      )
    );
  };

  const onUpdateFavorite = (
    title,
    image,
    rating,
    classification,
    id,
    favorite
  ) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { title, image, rating, classification, id, favorite }
          : book
      )
    );
  };

  return (
    <BookContext.Provider
      value={{
        filteredBooks,
        setKeyword,
        onAdd,
        onRemove,
        onUpdateRating,
        onUpdateFavorite,
        setClassFilter,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};
