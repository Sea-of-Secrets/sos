import axios from "axios";

const { NEXT_PUBLIC_CLIENT_API_END_POINT, NEXT_PUBLIC_SERVER_API_END_POINT } =
  process.env;

const _SERVER_API_END_POINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://j10a710.p.ssafy.io:8081/api";

const _CLIENT_API_END_POINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "http://j10a710.p.ssafy.io:3000/api";

export const http = axios.create({
  baseURL: _SERVER_API_END_POINT,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const client = axios.create({
  baseURL: _CLIENT_API_END_POINT,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
