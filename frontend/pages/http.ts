import axios from "axios";

const SERVER_API_END_POINT = "http://localhost:8080";
const CLIENT_API_END_POINT = "http://localhost:3000/api";

export const http = axios.create({
  baseURL: SERVER_API_END_POINT,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const client = axios.create({
  baseURL: CLIENT_API_END_POINT,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
