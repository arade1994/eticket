import { useCallback } from "react";
import Router from "next/router";

import { useRequest } from "./useRequest";

export const useAuth = () => {
  const { sendRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      Router.push("/auth/signin");
    },
  });

  const signOut = useCallback(async () => {
    await sendRequest();
  }, [sendRequest]);

  return { signOut };
};
