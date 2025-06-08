import React from "react";
import "../css/FlowerCard.css";

const FlowerCard = ({ flower, onArchive, onDelete }) => {
  const isActive = flower.active;

  return (
    <div className="flower-card">
      <div className="flower-info">
        <strong>{flower.name}</strong>
        <br />
        {flower.description}
        <br />
        Цена: {flower.price}
        <br />
        Количество: {flower.quantity}
        <br />
        Категория: {flower.category}
      </div>

      <div className="flower-buttons">
        <button onClick={onArchive}>
          {isActive ? "Архивировать" : "Разархивировать"}
        </button>
        <button onClick={onDelete} className="delete-btn">
          Удалить
        </button>
      </div>
    </div>
  );
};

export default FlowerCard;
