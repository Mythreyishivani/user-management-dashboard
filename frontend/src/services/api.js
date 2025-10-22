import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // your backend URL

export const getUsers = () => axios.get(API_URL);
export const getUserById = (id) => axios.get(`${API_URL}/${id}`);
export const createUser = (userData) => axios.post(API_URL, userData);
export const updateUser = (id, userData) => axios.put(`${API_URL}/${id}`, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
