import axios from "axios";
import updateToken from "./updateToken";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    if (!localStorage.getItem("jordanToken")) return config;
    const { exp } = jwtDecode(localStorage.getItem("jordanToken"));
    if (Date.now() >= exp * 1000) {
      await updateToken();
    }
    Object.assign(config.headers, {
      Authorization: "Bearer " + localStorage.getItem("jordanToken"),
    });
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  function (response) {
    return response;
  },
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  async function (error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await updateToken();
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
