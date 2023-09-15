import axios from "axios";
import { useLocation } from "react-router-dom";

export const BASE_URL = axios.create({
  // baseURL: "https://employeeportalbk.largstone.com/",
  // baseURL: 'https://backendsm.largstone.com/',
  baseURL: "http://localhost:3002/",
  headers: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
    userid: localStorage.getItem("userid") ? localStorage.getItem("userid") : "",
    role: localStorage.getItem("role") ? localStorage.getItem("role") : ""
  },
});
BASE_URL.interceptors.response.use(
  (res) => {
    if (
      (res.data.Message == "Token Not Found" ||
        res.data.Message.message == "jwt expired") &&
      !window.location.pathname.startsWith("/ecp/IRN")
    ) {
      localStorage.clear();
      window.location.reload();
    } else {
      return res;
    }
    return res;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);