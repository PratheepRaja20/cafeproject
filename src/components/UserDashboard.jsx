import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/users/menu/all")
      .then((res) => res.json())
      .then(setMenuItems)
      .catch((err) => console.error("Error fetching menu items:", err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="user-dashboard">
      <div className="user-header">
        <h2>👋 Welcome, User!</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="user-content">
        <h3 className="section-title">📋 Menu Items</h3>
        <div className="cards">
          {menuItems.map((item) => (
            <div key={item.id} className="card">
              <h4>{item.name}</h4>
              <p>Category: {item.category}</p>
              <p>₹{item.price}</p>
            </div>
          ))}
          {menuItems.length === 0 && <p>No menu items available.</p>}
        </div>
      </div>
    </div>
  );
}
