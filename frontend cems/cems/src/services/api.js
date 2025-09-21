import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/events", // ✅ updated to port 8080
});

export default api;
