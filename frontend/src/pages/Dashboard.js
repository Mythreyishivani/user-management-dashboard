import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/users/delete/${id}`)
        .then(() => setUsers(users.filter((user) => user.id !== id)))
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  const handleView = (id) => navigate(`/user/${id}`);
  const handleEdit = (id) => navigate(`/edit/${id}`);

  return (
    <div className="dashboard-container">
      
      {/* White strip heading */}
      <div className="dashboard-header-strip">
        User Management Dashboard
      </div>

      <div className="dashboard-card">
        <div className="mb-3 text-end">
          <Link className="btn btn-success" to="/create">
            ➕ Add New User
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.company}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => handleView(user.id)}
                        title="View User"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => handleEdit(user.id)}
                        title="Edit User"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
