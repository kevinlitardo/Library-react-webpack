import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import Axios from "axios";

import { BookContext } from "../../contexts/BookContext";

import "./PanelAdd.css";

const modalContainer = document.getElementById("modal");

export default function PanelAdd({ hideMenu, hideNewItemPanel }) {
  const { onAdd } = useContext(BookContext);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [classification, setClassification] = useState("");
  const [rating, setRating] = useState("");

  const cloudinary_url =
    "https://api.cloudinary.com/v1_1/dy14mattw/image/upload";
  const cloudinary_upload_preset = "l2g86ymv";

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(title, image, rating, classification);
    setImage("");
    hideNewItemPanel();
  };

  const onChangeTitle = (e) => setTitle(e.target.value);

  const onChangeImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinary_upload_preset);

    const response = await Axios.post(cloudinary_url, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    setImage(response.data.secure_url);
  };

  const onChangeClass = (e) => setClassification(e.target.value);
  const onChangeRating = (e) => {
    const rating = parseInt(e.target.value);
    setRating(rating);
  };

  const onCancel = () => {
    setImage("");
    hideNewItemPanel();
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
