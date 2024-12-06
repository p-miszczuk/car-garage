"use client";

import InputView, { InputViewProps } from "./input-view";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../../auth-form/form-view";
import Message from "../../auth-form/form-message";

interface Props {
  error: string;
  label?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  id: string;
  isAuthForm?: boolean;
  type: string;
  defaultValue?: string;
  placeholder?: string;
}

type InputContainerProps = InputViewProps & Readonly<Props>;

const InputContainer = ({
  error = "",
  id,
  label,
  ...rest
}: InputContainerProps) => {
  return (
    <div className="flex flex-col w-full" aria-label={label}>
      <label htmlFor={id}>{label}</label>
      <InputView {...rest} id={id} />
      {error && <Message message={error} />}
    </div>
  );
};

export default InputContainer;
