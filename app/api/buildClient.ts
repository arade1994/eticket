import axios from "axios";

const buildClient = () => {
  return axios.create({
    baseURL: "http://eticket.dev",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
};

export default buildClient;
