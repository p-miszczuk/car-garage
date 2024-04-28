import { validateField } from "@/utils";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../form/form-view";

type Field = "login" | "password" | "confirm";

type InputView = {
  id: Field;
  register: UseFormRegister<FormValues>;
  required: boolean;
  type: string;
};

export type InputViewProps = Readonly<InputView>;

const InputView = ({
  id,
  register,
  required = false,
  type = "text",
}: InputViewProps) => {
  return (
    <div className="border shadow rounded">
      <input
        className="w-full text-black p-1"
        type={type}
        {...register(id, {
          required: required ? `The ${id} field is required` : false,
          validate: validateField(id),
        })}
      />
    </div>
  );
};

export default InputView;
