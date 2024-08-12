import transcriptions from "../shares/transcriptions/index.json";
import _get from "lodash/get";

interface Validate {
  readonly field: string;
  readonly value: string;
}

interface ValidateField {
  readonly id: string;
  readonly isAuthForm: boolean;
}

const MESSAGE = {
  CONFIRM: "confirm",
  LOGIN: "login",
  PASSWORD: "password",
} as const;

export const getMessage = (type: string): string => {
  switch (type) {
    case MESSAGE.CONFIRM:
      return "Passwords are not the same. Please enter correct password.";
    case MESSAGE.LOGIN:
      return "No valid e-mail. Please enter correct email.";
    case MESSAGE.PASSWORD:
      return "No valid password. Please enter correct password. Password should include 5 signs, one big letter and one special sign";
    default:
      return "";
  }
};

export const getDescription = (page: string) => {
  const lang = "en";
  const transcription = _get(transcriptions, `${page}.${lang}`, {});

  return transcription;
};

const VALIDATORS = {
  login: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
  password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
};

export const validateField =
  ({ id, isAuthForm }: ValidateField) =>
  (value: string = ""): string | boolean => {
    if (!isAuthForm) return true;
    const field = id === "confirm" ? "password" : id;

    const isValid = validateFormField({
      field,
      value,
    });

    if (isValid) return true;

    return getMessage(id);
  };

export const validateFormField = ({ field, value }: Validate): boolean => {
  const reg = VALIDATORS[field as keyof typeof VALIDATORS];

  return reg?.test(value);
};
