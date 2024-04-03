import axios from "axios";

export const getBaseServerUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8080";
  }
  return process.env.NEXT_PUBLIC_SERVER_API_END_POINT;
};

export const getBaseSocketServerUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "ws://localhost:8080/sos";
  }
  return `${process.env.NEXT_PUBLIC_SERVER_SOCKET_API_END_POINT}/sos`;
};

export const request = axios.create({
  baseURL: "",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
