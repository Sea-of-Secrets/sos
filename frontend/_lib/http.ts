import axios from "axios";

export const getBaseServerUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8080";
  }
  return process.env.NEXT_PUBLIC_SERVER_API_END_POINT;
};

export const getBaseClientUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/api";
  }
  return process.env.NEXT_PUBLIC_CLIENT_API_END_POINT;
};

export const request = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
