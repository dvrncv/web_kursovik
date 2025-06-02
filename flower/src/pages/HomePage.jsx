import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FlowerCard from "../components/FlowerCard";
import FlowerModal from "../components/FlowerModal";

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
          padding: "10px",
          backgroundColor: "#fff",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            color: "#f67280",
            textAlign: "center",
          }}
        >
          Добро пожаловать в Цветочную лавку!
        </h1>

        <section>
          <h2 style={{ color: "#f67280" }}>Активные цветы</h2>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                flex: 1,
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

            <form
              onSubmit={handleCreateFlower}
              style={{
                backgroundColor: "#ffe2e2",
                padding: "20px",
                borderRadius: "10px",
                width: "300px",
              }}
            >
              <h3 style={{ color: "#f67280", marginBottom: "10px" }}>
                Добавить цветок
              </h3>

              <input
                type="text"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Количество"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Категория"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#f67280",
                  color: "#fff",
                  padding: "8px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Создать
              </button>
            </form>
          </div>
        </section>

        <section style={{ marginTop: "40px" }}>
          <h2 style={{ color: "#f67280" }}>Архивные цветы</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "10px",
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
        </section>

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
