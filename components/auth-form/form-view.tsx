"use client";

import { elements } from "./constants";
import { getMessage } from "@/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { userRegister } from "@/actions/auth";
import Input from "../tools/input";
import SubmitButton from "./form-button";
import { toast } from "react-toastify";

export type FormValues = {
  login: string;
  password: string;
  confirm?: string;
};

const FormView = ({ type = "login" }: { type: string }): JSX.Element => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data): Promise<void> => {
    if (data.confirm) {
      const { message, status, confirm } = await userRegister(
        data.login,
        data.password,
        data.confirm
      );
      const isError = status === "error";
      const isConfirmError = confirm === false;

      if (isError) {
        setError("confirm", {
          type: "validation",
          message: isConfirmError ? getMessage("confirm") : message,
        });
        return;
      }

      toast.success(message);
      router.push("/auth");
      return;
    }

    const resp: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      username: data.login,
      password: data.password,
    });

    if (resp?.ok) return router.push("/");

    setError("confirm", {
      type: "validation",
      message: resp?.error || "Please try again",
    });
  };

  const inputs = [...elements[type as keyof typeof elements]];
  const isAuthForm = ["signup", "login"].includes(type);

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
            isAuthForm={isAuthForm}
          />
        );
      })}
      <SubmitButton />
    </form>
  );
};

export default FormView;
