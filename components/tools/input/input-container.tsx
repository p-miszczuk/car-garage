"use client";

import InputView, { InputViewProps } from "./input-view";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../../form/form-view";
import Message from "../../form/form-message";

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
  register,
  required = false,
  type,
  isAuthForm,
  placeholder,
}: InputContainerProps) => {
  return (
    <div className="flex flex-col w-full" aria-label={label}>
      <label htmlFor={id}>{label}</label>
      <InputView
        id={id}
        type={type}
        register={register}
        required={required}
        isAuthForm={isAuthForm}
        placeholder={placeholder}
      />
      {error && <Message message={error} />}
    </div>
  );
};

export default InputContainer;
