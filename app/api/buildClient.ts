import { type NextPageContext } from "next";
import axios from "axios";

const buildClient = (ctx?: NextPageContext) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "http://eticket.local",
      headers: { Cookie: ctx?.req?.headers.cookie || "" },
    });
  }

  return axios.create({
    baseURL: "http://eticket.local",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default buildClient;
