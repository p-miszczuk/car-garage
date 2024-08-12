import newVehicle from "../../shares/new-vehicles/index.json";
import Input from "../tools/input";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "./form-new-car-container";
import Select from "../tools/selects/select";

interface FormNewCarViewProps {
  errors: Array<{}>;
  register: UseFormRegister<any>;
}

const { options } = newVehicle;

const FormNewCarView = ({ register, errors }: FormNewCarViewProps) => {
  return options.map(
    ({ field, label, options = [], required = false, type }) => {
      const fieldError =
        errors &&
        (errors[field as keyof typeof errors] as { message?: string });
      const errorMessage = fieldError?.message || "";

      switch (type) {
        case "text":
        case "number":
          return (
            <Input
              label={label}
              id={field}
              required={required}
              register={register}
              type={type}
              error={errorMessage}
              key={field}
            />
          );
        case "select":
          return (
            <Select
              register={register}
              label={label}
              options={options}
              key={field}
            />
          );

        default:
          return null;
      }
    }
  );
};

export default FormNewCarView;
