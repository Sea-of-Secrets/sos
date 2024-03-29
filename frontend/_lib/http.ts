import axios from "axios";

const { CLIENT_API_END_POINT, SERVER_API_END_POINT } = process.env;

const _SERVER_API_END_POINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : SERVER_API_END_POINT;
const _CLIENT_API_END_POINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : CLIENT_API_END_POINT;

export const http = axios.create({
  baseURL: _SERVER_API_END_POINT,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const client = axios.create({
  baseURL: _CLIENT_API_END_POINT,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
