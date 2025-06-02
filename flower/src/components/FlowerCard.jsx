import React from "react";
import "../css/FlowerCard.css";

const FlowerCard = ({ flower, onDetailsClick }) => {
  return (
    <div className="flower-card">
      <div>
        <strong>{flower.name}</strong>
        <br />
        Цена: {flower.price}
        <br />
        Описание: {flower.description}
        <br />
        Количество: {flower.quantity}
        <br />
        Категория: {flower.category}
        <br />
      </div>
      <button
        onClick={onDetailsClick}
        onMouseDown={(e) => e.currentTarget.blur()}
      >
        Подробнее
      </button>
    </div>
  );
};

export default FlowerCard;
