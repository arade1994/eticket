import { useCallback } from "react";
import Router from "next/router";
import { toast } from "react-toastify";

import buildClient from "../api/buildClient";
import FormErrors from "../components/FormErrors/FormErrors";

const client = buildClient();

interface SignUpData {
  firstName: string;
  lastName: string;
  dayOfBirth: number;
  monthOfBirth: number;
  yearOfBirth: number;
  street: string;
  houseNumber: number;
  postalCode: number;
  city: string;
  country: string;
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

interface SignInData {
  email: string;
  password: string;
}

export const useAuth = () => {
  const register = useCallback(async (signUpData: SignUpData) => {
    try {
      await client.post(
        "/api/users/signup",
        {
          ...signUpData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("You are signed up!");
      Router.push("/");
    } catch (error: any) {
      toast.error(<FormErrors errors={error.response.data.errors} />);
    }
  }, []);

  const login = useCallback(async (signInData: SignInData) => {
    try {
      await client.post("/api/users/signin", { ...signInData });
      Router.push("/");
    } catch (error: any) {
      toast.error(<FormErrors errors={error.response.data.errors} />);
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await client.post("/api/users/signout");
      toast.success("You are signed out!");
      Router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  return { register, login, logOut };
};
