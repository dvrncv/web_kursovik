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
        fontFamily: "Geoform, sans-serif",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          width: "320px",
          position: "relative",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "20px",
            color: "#f67280",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          aria-label="Закрыть"
        >
          ×
        </button>

        <h3 style={{ marginBottom: "10px"}}>
          {flower.name}
        </h3>
        <p>Цена: {flower.price}</p>
        <p>Описание: {flower.description}</p>
        <p>Количество: {flower.quantity}</p>
        <p> Категория: {flower.category}</p>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            onClick={archiveFlower}
            style={{
              flex: 1,
              backgroundColor: "#f67280",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Архивировать
          </button>

          <button
            onClick={deleteFlower}
            style={{
              flex: 1,
              backgroundColor: "#ccc",
              color: "#000",
              border: "none",
              borderRadius: "6px",
              padding: "8px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowerModal;
