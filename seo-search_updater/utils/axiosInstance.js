const axios = require("axios");

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = axiosInstance;
