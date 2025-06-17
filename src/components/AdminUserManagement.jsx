import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./Adminusermanagement.css";

export default function AdminUserManagement() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({ id: "", username: "", email: "", phone: "", password: "" });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch("http://localhost:8080/api/users/all")
            .then((res) => res.json())
            .then(setUsers)
            .catch((err) => console.error("Fetch error", err));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
//add /update user
    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editing ? "PUT" : "POST";
        const url = editing
            ? `http://localhost:8080/api/users/${formData.id}`
            : "http://localhost:8080/api/users/register";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(() => {
                fetchUsers();//refresh list
                setFormData({ id: "", username: "", email: "", phone: "", password: "" });//form la ulla data clear panro after success
                setEditing(false);//reset editing mode
            })
            .catch((err) => alert("Failed to save user"));
    };

    const handleEdit = (user) => {
        setFormData({ ...user, password: "" });//user detail formdatala set panro
        setEditing(true);//edit click pana ithu true agum
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure?")) return;//confirmation popup varum  ok kudutha dlete cancel  fun stop agib return agum

        fetch(`http://localhost:8080/api/users/${id}`, { method: "DELETE" })// user id use panni backend ku delete req anupuro
            .then(() => {
                fetchUsers();//success ana fetch user() call panro so updated list varum
                alert("User deleted");//alert la varum
            })
            .catch(() => alert("Delete failed"));//error na deleted fail varum
    };

    return (
        <div className="admin-dashboard">
            <AdminNavbar />
            <div className="admin-content">
                <h2>{editing ? "✏️ Update User" : "➕ Add User"}</h2>
                <form onSubmit={handleSubmit} className="user-form">
                    <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
                    <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required={!editing} />
                    <button type="submit">{editing ? "Update" : "Create"}</button>
                </form>

                <h2>👥 User List</h2>
                <input
                    type="text"
                    placeholder="Search by username"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                />

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter(user => user.role === "USER")
                            .filter(user =>
                                !searchTerm ||
                                user.username.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .sort((a, b) => a.username.localeCompare(b.username))
                            .map((user, i) => (
                                <tr key={user.id}>
                                    <td>{i + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user)}>✏️ Edit</button>
                                        <button onClick={() => handleDelete(user.id)}>❌ Delete</button>
                                    </td>
                                </tr>
                            ))}
                        {users.length === 0 && <tr><td colSpan="5">No users found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
