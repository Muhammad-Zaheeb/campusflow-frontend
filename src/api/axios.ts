import axios from "axios";

const api = axios.create({
  baseURL: "https://campusflow-uoi7.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;