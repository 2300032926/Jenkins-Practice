// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/events", // your Spring Boot backend
});

export default api;
