import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function AdminNavbar() {
    const navigate = useNavigate();

    return (
        <div className="user-navbar">
            <h3>Cafe User</h3>
            <nav>

                <button onClick={() => navigate("/")}>Logout</button>
            </nav>
        </div>
    );
}
