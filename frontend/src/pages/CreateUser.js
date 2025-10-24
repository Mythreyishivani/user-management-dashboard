import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    // extension: "",
    company: "",
    title: "",
    department: "",
    address: { street: "", city: "", zip: "", geo: { lat: "", lng: "" } },
  });

  const navigate = useNavigate();

  // Top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, address: { ...user.address, [name]: value } });
  };

  // Geo fields
  const handleGeoChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, address: { ...user.address, geo: { ...user.address.geo, [name]: value } } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/create", user);
      alert("User created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to create user. Please check the backend connection.");
    }
  };

  return (
    <div className="card shadow p-4 mt-5" style={{ maxWidth: "700px", margin: "auto" }}>
      <h3 className="text-center mb-4">Add New User</h3>
      <form onSubmit={handleSubmit}>
        {/* Basic fields */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={user.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" className="form-control" value={user.phone} onChange={handleChange} required />
        </div>

        {/* <div className="mb-3">
          <label className="form-label">Extension</label>
          <input type="text" name="extension" className="form-control" value={user.extension} onChange={handleChange} />
        </div> */}

        <div className="mb-3">
          <label className="form-label">Company</label>
          <input type="text" name="company" className="form-control" value={user.company} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input type="text" name="title" className="form-control" value={user.title} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input type="text" name="department" className="form-control" value={user.department} onChange={handleChange} />
        </div>

        <h5>Address</h5>
        <div className="mb-3">
          <label className="form-label">Street</label>
          <input type="text" name="street" className="form-control" value={user.address.street} onChange={handleAddressChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input type="text" name="city" className="form-control" value={user.address.city} onChange={handleAddressChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Zip</label>
          <input type="text" name="zip" className="form-control" value={user.address.zip} onChange={handleAddressChange} />
        </div>

        <h6>Geo Coordinates</h6>
        <div className="mb-3">
          <label className="form-label">Latitude</label>
          <input type="text" name="lat" className="form-control" value={user.address.geo.lat} onChange={handleGeoChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Longitude</label>
          <input type="text" name="lng" className="form-control" value={user.address.geo.lng} onChange={handleGeoChange} />
        </div>

        <button type="submit" className="btn btn-success w-100">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;
