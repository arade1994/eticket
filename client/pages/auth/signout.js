import { useEffect } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";

export default () => {
  const { sendRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    sendRequest();
  }, []);

  return <div>You are signing out...</div>;
};
