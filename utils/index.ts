import transcriptions from "../shares/transcriptions/index.json";
import _get from "lodash/get";

type Validate = {
  field: string;
  value: string;
};

export const getDescription = (page: string) => {
  const lang = "en";
  const transcription = _get(transcriptions, `${page}.${lang}`, {});

  return transcription;
};

const VALIDATORS = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
};

export const validateFormField = ({ field, value }: Validate): boolean => {
  const reg = VALIDATORS[field as keyof typeof VALIDATORS];

  return reg?.test(value);
};
