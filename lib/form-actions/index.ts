"use server";

import { registerUser } from "@/lib/auth-actions";
import { validateFormField } from "@/utils";
import { signIn } from "next-auth/react";

type Data = {
  [key: string]: string;
};

export type StateStatus = {
  message: string;
  type: string;
};

const MESSAGE = {
  CONFIRM: "confirm",
  LOGIN: "login",
  PASSWORD: "password",
} as const;

const getMessage = (type?: string): StateStatus => {
  switch (type) {
    case MESSAGE.CONFIRM:
      return {
        type: "error",
        message: "Passwords are not the same. Please enter correct password.",
      };
    case MESSAGE.LOGIN:
      return {
        type: "error",
        message: "No valid e-mail. Please enter correct email.",
      };
    case MESSAGE.PASSWORD:
      return {
        type: "error",
        message:
          "No valid password. Please enter correct password. Password should include 5 signs, one big letter and one special sign",
      };
    default:
      return {
        type: "success",
        message: "",
      };
  }
};

export const handleFormAction = async <T extends FormData>(
  prevState: any,
  formData: T
): Promise<StateStatus> => {
  let data: Data = {};

  data = Object.assign(data, {
    login: formData.get("login"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  const isAuthForm = data?.login !== undefined;

  if (isAuthForm) {
    //email & password validation
    const isSignUpForm = typeof data.confirm === "string";

    if (
      isSignUpForm &&
      data.password?.length > 0 &&
      data.confirm !== data.password
    ) {
      return getMessage("confirm");
    }

    const isLoginValid = validateFormField({
      field: "email",
      value: data.login,
    });
    const isPasswordValid = validateFormField({
      field: "password",
      value: data.password,
    });

    if (!isLoginValid || !isPasswordValid) {
      const type = isLoginValid ? "password" : "login";

      return getMessage(type);
    }

    await registerUser(data);
  }

  return getMessage();
};
