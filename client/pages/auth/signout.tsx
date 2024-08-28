import { useEffect } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";

export default () => {
  const { sendRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      toast.success("You are signed out!");
      Router.push("/");
    },
  });

  useEffect(() => {
    sendRequest();
  }, []);

  return <div>You are signing out...</div>;
};
