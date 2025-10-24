import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: { street: "", city: "", zip: "", geo: { lat: "", lng: "" } },
  });

  // Handle top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, address: { ...form.address, [name]: value } });
  };

  // Handle geo fields
  const handleGeoChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      address: {
        ...form.address,
        geo: { ...form.address.geo, [name]: value },
      },
    });
  };

  // Submit form
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
    <div className="card shadow p-4 mx-auto mt-5" style={{ maxWidth: "800px" }}>
      <h3 className="text-center text-success mb-4">Add New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left column */}
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

          {/* Right column */}
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

        <button type="submit" className="btn btn-success w-100 mt-3">
          Add User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
