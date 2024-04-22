"use client";

import InputView, { InputViewProps } from "./InputView";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../form/form-view";

type InputContainerProps = InputViewProps & {
  readonly error: string;
  readonly label: string;
  readonly register: UseFormRegister<FormValues>;
  readonly required: boolean;
};

const InputContainer = ({
  error = "",
  id,
  label,
  register,
  required,
  type,
}: InputContainerProps) => {
  return (
    <div className="flex flex-col mb-5 w-full">
      <label htmlFor={id}>{label}</label>
      <InputView id={id} type={type} register={register} required={required} />
      {error && <p className="p-1 text-red-600 text-[13px]">{error}</p>}
    </div>
  );
};

export default InputContainer;
