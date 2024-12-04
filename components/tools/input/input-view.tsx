import { validateField } from "@/utils";
import { UseFormRegister } from "react-hook-form";

type InputView = {
  id: string;
  register: UseFormRegister<any>;
  required?: boolean;
  type: string;
  isAuthForm?: boolean;
  placeholder?: string;
};

export type InputViewProps = Readonly<InputView>;

const InputView = ({
  id,
  register,
  required = false,
  type = "text",
  isAuthForm = false,
  placeholder = "",
}: InputViewProps) => {
  return (
    <div className="border shadow rounded">
      <input
        className="w-full text-black p-1"
        data-testid={id}
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id, {
          required: required ? `The ${id} field is required` : false,
          validate: validateField({ id, isAuthForm }),
        })}
        {...(type === "date" && {
          defaultValue: new Date().toISOString().split("T")[0],
        })}
        {...(type === "time" && {
          defaultValue: new Date().toISOString().split("T")[1].slice(0, 5),
        })}
      />
    </div>
  );
};

export default InputView;
