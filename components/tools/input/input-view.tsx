import { validateField } from "@/utils";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../../form/form-view";

type InputView = {
  id: string;
  register: UseFormRegister<any>;
  required: boolean;
  type: string;
  isAuthForm?: boolean;
};

export type InputViewProps = Readonly<InputView>;

const InputView = ({
  id,
  register,
  required = false,
  type = "text",
  isAuthForm = false,
}: InputViewProps) => {
  return (
    <div className="border shadow rounded">
      <input
        className="w-full text-black p-1"
        type={type}
        {...register(id, {
          required: required ? `The ${id} field is required` : false,
          validate: validateField({ id, isAuthForm }),
        })}
      />
    </div>
  );
};

export default InputView;
