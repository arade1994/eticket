import axios from "axios";

const buildClient = (ctx?: any) => {
  const isDemoMode = !!process.env.NEXT_PUBLIC_DEMO_MODE;

  if (isDemoMode) {
    return axios.create({
      baseURL: "http://localhost:3000",
      headers: ctx?.req?.headers,
    });
  }

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
