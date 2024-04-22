"use client";

import { elements } from "./constants";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../input";
import SubmitButton from "./form-button";

export type FormValues = {
  login: string;
  password: string;
  confirm?: string;
};

const FormView = ({ type = "login" }: { type: string }): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const inputs = [...elements[type as keyof typeof elements]];

  return (
    <form
      className="p-3 min-h-60 flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
      name={type}
    >
      {inputs?.map(({ id, label, required, type }) => {
        const errorMessage = (errors && errors[id]?.message) || "";

        return (
          <Input
            error={errorMessage}
            key={id}
            id={id}
            label={label}
            type={type}
            register={register}
            required={required}
          />
        );
      })}
      <SubmitButton />
    </form>
  );
};

export default FormView;
