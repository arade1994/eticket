import axios from "axios";
import { type IncomingMessage } from "http";

export default ({ req }: { req?: IncomingMessage }) => {
  if (typeof window === "undefined") {
    //We are on the server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers,
    });
  } else {
    //We are on the clientž
    return axios.create({ baseURL: "/" });
  }
};
