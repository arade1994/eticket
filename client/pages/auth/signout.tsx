import { useEffect } from "react";
import Router from "next/router";
import { toast } from "react-toastify";

import { useRequest } from "../../hooks/useRequest";

const SignOut = () => {
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
  }, [sendRequest]);

  return <div>You are signing out...</div>;
};

export default SignOut;
