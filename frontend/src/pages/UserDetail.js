import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Dashboard.css";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  const safeValue = (value) => (value ? value : "NA");

  return (
    <div>
      {/* Dashboard header on top */}
      <div className="dashboard-header">
        <h2 className="text-center" style={{ color: "white", fontWeight: "normal" }}>
          User Management Dashboard
        </h2>
      </div>

      {/* User detail card below header */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh", padding: "20px", backgroundColor: "#f8f9fa" }}
      >
        <div className="card shadow p-4 w-100" style={{ maxWidth: "900px", backgroundColor: "white" }}>
          <h3 className="text-center mb-4" style={{ color: "#0d6efd" }}>User Details</h3>
          <div className="row">
            {/* Left column */}
            <div className="col-md-6">
              <p><strong>Name:</strong> {safeValue(user.name)}</p>
              <p><strong>Email:</strong> {safeValue(user.email)}</p>
              <p><strong>Phone:</strong> {safeValue(user.phone)}</p>
              <p><strong>Company:</strong> {safeValue(user.company)}</p>
              <p><strong>Job Title:</strong> {safeValue(user.title)}</p>
              <p><strong>Department:</strong> {safeValue(user.department)}</p>
            </div>

            {/* Right column */}
            <div className="col-md-6">
              <h5>Address:</h5>
              <p><strong>Street:</strong> {safeValue(user.address?.street)}</p>
              <p><strong>City:</strong> {safeValue(user.address?.city)}</p>
              <p><strong>Zip:</strong> {safeValue(user.address?.zip)}</p>
              <p><strong>Latitude:</strong> {safeValue(user.address?.geo?.lat)}</p>
              <p><strong>Longitude:</strong> {safeValue(user.address?.geo?.lng)}</p>
            </div>
          </div>

          <div className="text-center mt-3">
            <Link
              className="btn"
              style={{ backgroundColor: "#0d6efd", color: "white", width: "200px", padding: "10px 0" }}
              to="/"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
