import axios from "axios";

const http = axios.create({
  baseURL: "http://45.249.8.201:5000/",
  headers: {
    "Content-type": "application/json",
  }
});

export { http }