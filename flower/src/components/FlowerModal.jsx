import React from "react";

const FlowerModal = ({ flower, onClose, refresh }) => {
  const archiveFlower = async () => {
    await fetch(`/flower/${flower.id}/active`, {
      method: "PATCH",
    });
    onClose();
    refresh();
  };

  const deleteFlower = async () => {
    await fetch(`/flower/${flower.id}`, {
      method: "DELETE",
    });
    onClose();
    refresh();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>{flower.name}</h2>
        <p>Цена: {flower.price}</p>
        <p>Описание: {flower.description}</p>
        <p>Количество: {flower.quantity}</p>
        <p>Категория: {flower.category}</p>

        <button
          onClick={archiveFlower}
          style={{
            backgroundColor: "#f67280",
            color: "#fff",
            marginRight: "10px",
          }}
        >
          Архивировать
        </button>
        <button
          onClick={deleteFlower}
          style={{ backgroundColor: "#ccc", marginRight: "10px" }}
        >
          Удалить
        </button>
        <button onClick={onClose} style={{ backgroundColor: "#ddd" }}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default FlowerModal;
