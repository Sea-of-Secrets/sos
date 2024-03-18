import axios from "axios";

const API_END_POINT = "http://localhost:8080";

export const http = axios.create({
  baseURL: API_END_POINT,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
