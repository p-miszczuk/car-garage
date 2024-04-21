"use client";

import { elements, FORM_TYPES } from "./constants";
import { handleFormAction, StateStatus } from "@/lib/form-actions";
import { useFormState } from "react-dom";
import FormView from "./form-view";
import SubmitButton from "./form-button";
import classnames from "classnames";
import Message from "./form-message";

type FormProps = {
  readonly title: string;
  readonly type: string;
};

const INITIAL_STATE = {
  type: "",
  message: "",
} as const;

const FormContainer = ({ title, type = "" }: FormProps) => {
  const [state, formAction] = useFormState<Promise<StateStatus>, FormData>(
    handleFormAction,
    { ...INITIAL_STATE }
  );

  const inputs = [...elements[type as keyof typeof elements]];

  return inputs ? (
    <div
      className={classnames("w-4/5 sm:w-96 border border-gray-100 rounded-md", {
        "translate-y-[-3rem]": FORM_TYPES.some((value) => value === type),
      })}
    >
      <h3 className="text-center py-2">{title}</h3>
      <form
        className="p-3 min-h-60 flex flex-col items-center"
        action={formAction}
        name={type}
      >
        <FormView inputs={inputs} />
        {state?.message && <Message message={state.message} />}
        <SubmitButton />
      </form>
    </div>
  ) : null;
};

export default FormContainer;
