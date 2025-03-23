import { validateField } from "@/utils";
import { UseFormRegister } from "react-hook-form";

type InputView = {
  id: string;
  required?: boolean;
  type: string;
  isAuthForm?: boolean;
  placeholder?: string;
  defaultValue?: string;
  customClass?: string;
  register?: UseFormRegister<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type InputViewProps = Readonly<InputView>;

const getDefaultInputData = (
  defaultValue: string | undefined,
  type: string
) => {
  if (type === "date") {
    return new Date().toISOString().split("T")[0];
  }
  if (type === "time") {
    return new Date().toISOString().split("T")[1].slice(0, 5);
  }
  return defaultValue;
};

const InputView = ({
  id,
  register,
  required = false,
  type = "text",
  isAuthForm = false,
  placeholder = "",
  defaultValue,
  onChange,
  customClass,
}: InputViewProps) => {
  const defaultValueData = getDefaultInputData(defaultValue, type);

  return (
    <input
      className={`w-full text-black p-2 border border-gray-300 rounded-md ${customClass}`}
      data-testid={id}
      type={type}
      id={id}
      placeholder={placeholder}
      onChange={onChange || undefined}
      {...(!!register &&
        register(id, {
          required: required ? `The ${id} field is required` : false,
          validate: validateField({ id, isAuthForm }),
        }))}
      {...(defaultValueData && {
        defaultValue: defaultValueData,
      })}
    />
  );
};

export default InputView;
