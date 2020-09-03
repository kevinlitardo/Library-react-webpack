import React, { useState, createContext, useEffect } from "react";

export const FavsContext = createContext();

export const FavsProvider = (props) => {
  const [favs, setFavs] = useState([]);
  const [newFavBook, setNewFavBook] = useState(null);
  const [filteredFavs, setFilteredFavs] = useState([]);
  const [favKeyword, setFavKeyword] = useState("");

  useEffect(() => {
    if (newFavBook) {
      setFavs([...favs, newFavBook]);
    }
  }, [newFavBook]);

  useEffect(() => {
    setFilteredFavs(
      favs.filter((book) =>
        book.title.toLowerCase().includes(favKeyword.toLowerCase())
      )
    );
  }, [favKeyword, favs]);

  const addFav = (title, image, rating, classification, id) => {
    setNewFavBook({ title, image, rating, classification, id });
  };

  const removeFav = (id) => {
    setFavs(favs.filter((book) => book.id !== id));
  };

  const onUpdateFavRating = ({
    title,
    image,
    rating,
    classification,
    id,
    favorite,
  }) => {
    setFavs(
      favs.map((book) =>
        book.id === id
          ? { title, image, rating, classification, id, favorite }
          : book
      )
    );
  };

  return (
    <FavsContext.Provider
      value={{
        addFav,
        favs,
        removeFav,
        onUpdateFavRating,
        setFavKeyword,
        filteredFavs,
      }}
    >
      {props.children}
    </FavsContext.Provider>
  );
};
