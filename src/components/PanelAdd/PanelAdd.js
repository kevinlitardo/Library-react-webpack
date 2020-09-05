import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";

import { BookContext } from "../../contexts/BookContext";

import "./PanelAdd.css";

const modalContainer = document.getElementById("modal");

export default function PanelAdd({ onCancel, hideMenu, hideNewItemPanel }) {
  const { onAdd } = useContext(BookContext);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [classification, setClassification] = useState("");
  const [rating, setRating] = useState("");
  const [storageName, setStorageName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(title, image, rating, classification, storageName);
    hideNewItemPanel();
  };

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeImage = (e) => {
    const reader = new FileReader();
    const name = e.target.files[0].name;
    reader.addEventListener("load", () => {
      sessionStorage.setItem(name, reader.result);
      setImage(reader.result);
      setStorageName(name);
    });
    reader.readAsDataURL(e.target.files[0]);
  };
  const onChangeClass = (e) => setClassification(e.target.value);
  const onChangeRating = (e) => {
    const rating = parseInt(e.target.value);
    setRating(rating);
  };

  return createPortal(
    <div className="panelAdd__container">
      <div className="panelAdd__form-container">
        <form onSubmit={onSubmit}>
          <p>
            <label>Add title</label>
            <br />
            <input
              onChange={onChangeTitle}
              type="text"
              name="title"
              className="input"
              required
              placeholder="Title..."
            />
          </p>

          <p>
            <label>Choose image</label>
            <br />
            <input
              onChange={onChangeImage}
              type="file"
              id="image-input"
              name="image"
              className="input"
              required
              placeholder="Image..."
            />
          </p>

          <p>
            <label>Choose Classification</label>
            <br />
            <input
              onChange={onChangeClass}
              type="text"
              name="classification"
              className="input"
              required
              placeholder="Cyberpunk, Drama, etc..."
            />
          </p>

          <p>
            <label>Rate</label>
            <br />
            <select onChange={onChangeRating}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
          <input
            className="submit"
            type="submit"
            value="Registrar libro"
            onClick={hideMenu}
          />

          <button onClick={onCancel} className="cancel">
            Cancelar
          </button>
        </form>
      </div>
    </div>,
    modalContainer
  );
}
