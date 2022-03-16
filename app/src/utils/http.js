import axios from "axios";

const http = axios.create({
  baseURL: "http://175.107.200.16:5000/",
  headers: {
    "Content-type": "application/json",
  }
});

export { http }