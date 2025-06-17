import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./Dashboard.css";



export default function AdminMenuManagement() {
    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "",
        price: "",
    });
    const [editing, setEditing] = useState(false);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = () => {
        fetch("http://localhost:8080/api/menu")
            .then((res) => res.json())
            .then(setMenuItems)
            .catch((err) => console.error("Fetch error", err));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editing ? "PUT" : "POST";
        const url = editing
            ? `http://localhost:8080/api/menu/${formData.id}`
            : "http://localhost:8080/api/menu";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(() => {
                fetchMenuItems();
                setFormData({ id: "", name: "", category: "", price: "" });
                setEditing(false);
            })
            .catch(() => alert("Failed to save item"));
    };

    const handleEdit = (item) => {
        setFormData({ ...item });//edit click it fill in forms
        setEditing(true);
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure?")) return;
        fetch(`http://localhost:8080/api/menu/${id}`, { method: "DELETE" })
            .then(() => {
                fetchMenuItems();
                alert("Item deleted");
            })
            .catch(() => alert("Delete failed"));
    };

    const filteredItems =
        filter === "All"
            ? menuItems
            : menuItems.filter((item) => item.category.toLowerCase() === filter.toLowerCase());

    return (
        <div className="admin-dashboard">
            <AdminNavbar />
            <div className="admin-content">
                <h2>{editing ? "✏️ Edit Menu Item" : "➕ Add Menu Item"}</h2>
                <form onSubmit={handleSubmit} className="user-form">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" required />
                    <input name="category" value={formData.category} onChange={handleChange} placeholder="Category (e.g., Drinks)" required />
                    <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                    <button type="submit">{editing ? "Update" : "Create"}</button>
                </form>

                <h2>🍽️ Menu Items</h2>
                <div style={{ marginBottom: "10px" }}>
                    <label>Filter by Category: </label>
                    <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value="All">All</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Meals">Meals</option>
                    </select>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr><th>#</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, i) => (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>₹{item.price}</td>
                                <td>
                                    <button onClick={() => handleEdit(item)}>✏️</button>
                                    <button onClick={() => handleDelete(item.id)}>❌</button>
                                </td>
                            </tr>
                        ))}
                        {filteredItems.length === 0 && <tr><td colSpan="5">No items found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
