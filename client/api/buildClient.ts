import axios from "axios";
import { type IncomingMessage } from "http";

export default ({ req }: { req?: IncomingMessage }) => {
  const isDemoMode = !!process.env.NEXT_PUBLIC_DEMO_MODE;

  if (isDemoMode) {
    return axios.create({ baseURL: "http://localhost:3000/" });
  }

  if (typeof window === "undefined") {
    //We are on the server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers,
    });
  } else {
    //We are on the client
    return axios.create({ baseURL: "/" });
  }
};
