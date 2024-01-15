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
      await updateToken(false, null);
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
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

export default api;
