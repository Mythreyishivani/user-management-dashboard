import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers(); // refresh
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <Link to="/create">Create New User</Link>
<table className="table table-striped">
  <thead>
    <tr>
      <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>
          <Link className="btn btn-primary btn-sm m-1" to={`/user/${user.id}`}>View</Link>
          <Link className="btn btn-warning btn-sm m-1" to={`/edit/${user.id}`}>Edit</Link>
          <button className="btn btn-danger btn-sm m-1" onClick={() => handleDelete(user.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Dashboard;
