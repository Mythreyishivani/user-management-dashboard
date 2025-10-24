import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    extension: "",
    company: "",
    title: "",
    department: "",
    address: { street: "", city: "", zip: "", geo: { lat: "", lng: "" } },
  });

  // Fetch user data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        const user = res.data;
        const address = user.address || { street: "", city: "", zip: "", geo: { lat: "", lng: "" } };
        const geo = address.geo || { lat: "", lng: "" };

        setForm({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          extension: user.extension || "",
          company: user.company || "",
          title: user.title || "",
          department: user.department || "",
          address: { ...address, geo }
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  // Top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, address: { ...form.address, [name]: value } });
  };

  // Geo fields
  const handleGeoChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, address: { ...form.address, geo: { ...form.address.geo, [name]: value } } });
  };

  // Submit updated user
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/users/edit/${id}`, form)
      .then(() => {
        alert("User updated successfully!");
        navigate("/");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to update user. Check console for details.");
      });
  };

  return (
    <div className="card shadow p-4 mx-auto mt-5" style={{ maxWidth: "700px", backgroundColor: "white" }}>
      <h3 className="text-center text-warning mb-4">Edit User</h3>
      <form onSubmit={handleSubmit}>
        {/* Basic fields */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Extension</label>
          <input type="text" name="extension" className="form-control" value={form.extension} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Company</label>
          <input type="text" name="company" className="form-control" value={form.company} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input type="text" name="department" className="form-control" value={form.department} onChange={handleChange} />
        </div>

        <h5>Address</h5>
        <div className="mb-3">
          <label className="form-label">Street</label>
          <input type="text" name="street" className="form-control" value={form.address.street} onChange={handleAddressChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input type="text" name="city" className="form-control" value={form.address.city} onChange={handleAddressChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Zip</label>
          <input type="text" name="zip" className="form-control" value={form.address.zip} onChange={handleAddressChange} />
        </div>

        <h6>Geo Coordinates</h6>
        <div className="mb-3">
          <label className="form-label">Latitude</label>
          <input type="text" name="lat" className="form-control" value={form.address.geo.lat} onChange={handleGeoChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Longitude</label>
          <input type="text" name="lng" className="form-control" value={form.address.geo.lng} onChange={handleGeoChange} />
        </div>

        <button type="submit" className="btn btn-warning w-100">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
