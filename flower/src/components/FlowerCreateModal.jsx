import React, { useState } from "react";
import "../css/FlowerCreateModal.css";

const FlowerCreateModal = ({
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  quantity,
  setQuantity,
  category,
  setCategory,
  handleSubmit,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Название обязательно";
    if (!price.trim() || isNaN(price) || Number(price) <= 0)
      newErrors.price = "Цена должна быть положительным числом";
    if (!description.trim()) newErrors.description = "Описание обязательно";
    if (
      !quantity.trim() ||
      !Number.isInteger(Number(quantity)) ||
      Number(quantity) < 0
    )
      newErrors.quantity = "Количество должно быть положительным целым числом";
    if (!category.trim()) newErrors.category = "Категория обязательна";

    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      handleSubmit(e);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h2 style={{ color: "#f67280" }}>Добавить цветок</h2>

      <form onSubmit={onSubmit} className="form-container">
        <input
          className="form-input"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div style={{ color: "#f67280" }}>{errors.name}</div>}

        <input
          className="form-input"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <div style={{ color: "#f67280" }}>{errors.price}</div>}

        <input
          className="form-input"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <div style={{ color: "#f67280" }}>{errors.description}</div>
        )}

        <input
          className="form-input"
          placeholder="Количество"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        {errors.quantity && (
          <div style={{ color: "#f67280" }}>{errors.quantity}</div>
        )}

        <input
          className="form-input"
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && (
          <div style={{ color: "#f67280" }}>{errors.category}</div>
        )}

        <button type="submit" className="create-button">
          Создать
        </button>
      </form>
    </div>
  );
};

export default FlowerCreateModal;
