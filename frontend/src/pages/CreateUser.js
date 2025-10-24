import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Ensure this is imported for the header styling

function CreateUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: { street: "", city: "", zip: "", geo: { lat: "", lng: "" } },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, address: { ...form.address, [name]: value } });
  };

  const handleGeoChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      address: { ...form.address, geo: { ...form.address.geo, [name]: value } },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/create", form)
      .then(() => {
        alert("User added successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add user. Check console for details.");
      });
  };

  return (
    <div>
      {/* Dashboard header on top of the page */}
      <div className="dashboard-header">
        <h2 className="text-center" style={{ color: "white", fontWeight: "normal" }}>
          User Management Dashboard
        </h2>
      </div>

      {/* Form card below the header */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh", padding: "20px", backgroundColor: "#f8f9fa" }}
      >
        <div className="card shadow p-4 w-100" style={{ maxWidth: "800px" }}>
          <h3 className="text-center mb-4" style={{ color: "#0d6efd" }}>
            Add New User
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <h5>Address</h5>
                <div className="mb-3">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    name="street"
                    className="form-control"
                    value={form.address.street}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={form.address.city}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Zip</label>
                  <input
                    type="text"
                    name="zip"
                    className="form-control"
                    value={form.address.zip}
                    onChange={handleAddressChange}
                  />
                </div>
                <h6>Geo Coordinates</h6>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Latitude</label>
                    <input
                      type="text"
                      name="lat"
                      className="form-control"
                      value={form.address.geo.lat}
                      onChange={handleGeoChange}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Longitude</label>
                    <input
                      type="text"
                      name="lng"
                      className="form-control"
                      value={form.address.geo.lng}
                      onChange={handleGeoChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#0d6efd",
                  color: "white",
                  width: "200px",
                  padding: "10px 0",
                }}
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
