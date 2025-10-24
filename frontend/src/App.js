import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UserDetail from "./pages/UserDetail"; // <- match exact filename
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";


function App() {
  return (
    <Router>
      
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserDetail />} /> 
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
