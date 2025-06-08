import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FlowerCard from "../components/FlowerCard";
import FlowerModal from "../components/FlowerModal";
import "../css/Home.css";

const HomePage = () => {
  const [flowers, setFlowers] = useState([]);
  const [inactiveFlowers, setInactiveFlowers] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const handleCreateFlower = async (e) => {
    e.preventDefault();

    await fetch("/flower/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description, quantity, category }),
    });

    setName("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setCategory("");

    fetchActiveFlowers();
    fetchNoActiveFlowers();
  };

  const fetchActiveFlowers = async () => {
    const res = await fetch("/flower/active");
    const data = await res.json();
    setFlowers(data);
  };

  const fetchNoActiveFlowers = async () => {
    const res = await fetch("/flower/no-active");
    const data = await res.json();
    setInactiveFlowers(data);
  };

  useEffect(() => {
    fetchActiveFlowers();
    fetchNoActiveFlowers();
  }, []);

  const handleDetailsClick = (flower) => {
    setSelectedFlower(flower);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFlower(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <main
        style={{
          display: "flex",
          padding: "20px",
          backgroundColor: "#fff",
          minHeight: "100vh",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#f67280", marginBottom: "20px" }}>
            Активные цветы
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {flowers.map((flower) => (
              <FlowerCard
                key={flower.id}
                flower={flower}
                onDetailsClick={() => handleDetailsClick(flower)}
              />
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#f67280" }}>Добавить цветок</h2>
          <form onSubmit={handleCreateFlower} className="form-container">
            <input
              className="form-input"
              placeholder="Название"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="form-input"
              placeholder="Цена"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              className="form-input"
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          
            <input
              className="form-input"
              placeholder="Количество"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <input
              className="form-input"
              placeholder="Категория"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <button type="submit" className="create-button">
              Создать
            </button>
          </form>

          <h2 style={{ color: "#f67280" }}>Архивные цветы</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
              opacity: 0.6,
            }}
          >
            {inactiveFlowers.map((flower) => (
              <FlowerCard
                key={flower.id}
                flower={flower}
                onDetailsClick={() => handleDetailsClick(flower)}
              />
            ))}
          </div>
        </div>

        {isModalOpen && selectedFlower && (
          <FlowerModal
            flower={selectedFlower}
            onClose={closeModal}
            refresh={() => {
              fetchActiveFlowers();
              fetchNoActiveFlowers();
            }}
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;
