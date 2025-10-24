import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
    
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
      <h3 className="text-center text-primary mb-3">User Details</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <Link className="btn btn-dark w-100" to="/">Back to Dashboard</Link>
    </div>
  );
}

export default UserDetail;
