import React from "react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import FlowerCard from "../components/FlowerCard";
import FlowerCreateModal from "../components/FlowerCreateModal";
import "../css/HomePage.css";

const HomePage = () => {
  const [flowers, setFlowers] = useState([]);
  const [inactiveFlowers, setInactiveFlowers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const archiveFlower = async (id) => {
    await fetch(`/flower/${id}/active`, { method: "PATCH" });
    fetchActiveFlowers();
    fetchNoActiveFlowers();
  };

  const deleteFlower = async (id) => {
    await fetch(`/flower/${id}`, { method: "DELETE" });
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

  useEffect(() => {
    fetchActiveFlowers();
    fetchNoActiveFlowers();
  }, []);

  return (
    <div>
      <Header />
      <div className="flower-controls">
        <button
          className="flower-button"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Добавить цветок
        </button>
      </div>

      <main className="main-container">
        <div className="active-flowers" style={{ flex: 1 }}>
          <h2 style={{ color: "#f67280" }}>Активные цветы</h2>
          <div className="flowers-grid">
            {flowers.map((flower) => (
              <FlowerCard
                key={flower.id}
                flower={flower}
                onArchive={() => archiveFlower(flower.id)}
                onDelete={() => deleteFlower(flower.id)}
              />
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="flower-form-desktop">
            <FlowerCreateModal
              name={name}
              setName={setName}
              price={price}
              setPrice={setPrice}
              description={description}
              setDescription={setDescription}
              quantity={quantity}
              setQuantity={setQuantity}
              category={category}
              setCategory={setCategory}
              handleSubmit={handleCreateFlower}
            />
          </div>

          <div className="inactive-flowers">
            <h2 style={{ color: "#f67280" }}>Архивные цветы</h2>
            <div className="flowers-grid" style={{ opacity: 0.6 }}>
              {inactiveFlowers.map((flower) => (
                <FlowerCard
                  key={flower.id}
                  flower={flower}
                  onArchive={() => archiveFlower(flower.id)}
                  onDelete={() => deleteFlower(flower.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setIsCreateModalOpen(false)}
            >
              ✖
            </button>
            <FlowerCreateModal
              name={name}
              setName={setName}
              price={price}
              setPrice={setPrice}
              description={description}
              setDescription={setDescription}
              quantity={quantity}
              setQuantity={setQuantity}
              category={category}
              setCategory={setCategory}
              handleSubmit={(e) => {
                handleCreateFlower(e);
                setIsCreateModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
