"use server";

import { validateFormField } from "@/utils";

type Data = {
  [key: string]: string;
};

export type StateStatus = {
  readonly message: string;
  readonly type: string;
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

  const isLoginForm = data?.login !== undefined;

  if (isLoginForm) {
    //email & password validation
    const isSignUpForm = typeof data.confirm === "string";
    console.log("🚀 ~ isSignUpForm:", isSignUpForm, data.confirm);

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
    //TODO auth
  }

  return getMessage();
};
