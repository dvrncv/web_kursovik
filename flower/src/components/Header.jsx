import React from "react";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "60px",
        backgroundColor: "#ffe2e2",
        color: "#f67280",
        fontSize: "28px",
        fontFamily: "Geoform, sans-serif",
        fontWeight: "bold",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      Цветочная лавка
    </div>
  );
};

export default Header;
