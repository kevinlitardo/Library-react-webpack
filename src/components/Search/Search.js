import React, { useContext } from "react";

import { BookContext } from "../../contexts/BookContext";
import { FavsContext } from "../../contexts/FavsContext";

function Search() {
  const { setKeyword } = useContext(BookContext);
  const { setFavKeyword } = useContext(FavsContext);

  const onChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    setFavKeyword(keyword);
  };

  return (
    <input
      id="search"
      type="text"
      onChange={onChange}
      placeholder="Insert a book title..."
    />
  );
}

export default Search;
